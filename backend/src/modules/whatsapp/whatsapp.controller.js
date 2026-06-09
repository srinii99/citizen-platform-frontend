
import { User }
from "../user/user.model.js";

import {
  WhatsAppMessage,
} from "./whatsappMessage.model.js";

import {
  sendWhatsAppMessage,
} from "./whatsapp.service.js";

import {
  FLOW_STATES,
} from "./flowStates.js";

import { Scheme }
from "../scheme/scheme.model.js";

import {
  getEligibleSchemesForUser,
} from "./whatsappEligibility.js";

import { Application }
from "../application/application.model.js";

import {

  getWhatsAppMediaUrl,

  downloadWhatsAppMedia,

} from "./whatsappMedia.service.js";


// -------------------------
// VERIFY WEBHOOK
// -------------------------

export const verifyWebhook =
  async (req, res) => {

    const VERIFY_TOKEN =
      "setunxt_verify_token";


    const mode =
      req.query[
        "hub.mode"
      ];

    const token =
      req.query[
        "hub.verify_token"
      ];

    const challenge =
      req.query[
        "hub.challenge"
      ];


    if (
      mode === "subscribe" &&
      token === VERIFY_TOKEN
    ) {

      console.log(
        "WhatsApp webhook verified"
      );

      return res.status(200)
        .send(challenge);
    }

    return res.sendStatus(403);
  };


// -------------------------
// RECEIVE MESSAGES
// -------------------------

export const receiveMessage =
  async (req, res) => {

    try {

      console.log(
        "WHATSAPP EVENT:",
        JSON.stringify(
          req.body,
          null,
          2
        )
      );


      const entry =
        req.body.entry?.[0];

      const changes =
        entry?.changes?.[0];

      const value =
        changes?.value;

      const message =
        value?.messages?.[0];


      // -------------------------
      // NO MESSAGE
      // -------------------------

      if (!message) {
        return res.sendStatus(200);
      }


      const mobile =
        message.from;

      const text =
        message.text?.body || "";
      
      const image =
        message.image;

      const document =
        message.document;


      // -------------------------
      // FIND OR CREATE USER
      // -------------------------

      let user =
        await User.findOne({
          mobile,
        });


      if (!user) {

        user =
          await User.create({

            mobile,

            preferred_language:
              "EN",

            whatsapp_flow_state:
              FLOW_STATES.WELCOME,
          });
      }


      // -------------------------
      // SAVE MESSAGE
      // -------------------------

      await WhatsAppMessage.create({

        mobile,

        incoming_message:
          text,

        whatsapp_message_id:
          message.id,

        raw_payload:
          req.body,
      });


      // -------------------------
      // CURRENT STATE
      // -------------------------

      const currentState =
        user.whatsapp_flow_state;


      // -------------------------
      // STATE MACHINE
      // -------------------------

      switch (currentState) {


        // -------------------------
        // WELCOME
        // -------------------------

        case FLOW_STATES.WELCOME: {

          await sendWhatsAppMessage(
            mobile,
            `Welcome to SetuNxt 🇮🇳\n\nReply:\n\n1 for English\n2 हिंदी`
          );


          user.whatsapp_flow_state =
            FLOW_STATES.LANGUAGE_SELECTION;

          await user.save();

          break;
        }


        // -------------------------
        // LANGUAGE SELECTION
        // -------------------------

        case FLOW_STATES.LANGUAGE_SELECTION: {

          if (text === "1") {
            user.preferred_language =
              "EN";
          }

          if (text === "2") {
            user.preferred_language =
              "HI";
          }


          await sendWhatsAppMessage(
            mobile,
            `Please enter your full name as per Aadhaar`
          );


          user.whatsapp_flow_state =
            FLOW_STATES.NAME_CAPTURE;

          await user.save();

          break;
        }


        // -------------------------
        // NAME CAPTURE
        // -------------------------

        case FLOW_STATES.NAME_CAPTURE: {

          user.name = text;

          await user.save();


          await sendWhatsAppMessage(
            mobile,
            `Please enter your age`
          );


          user.whatsapp_flow_state =
            FLOW_STATES.AGE_CAPTURE;

          await user.save();

          break;
        }


        // -------------------------
        // AGE CAPTURE
        // -------------------------

        case FLOW_STATES.AGE_CAPTURE: {

          user.age = Number(text);

          await user.save();


          // -------------------------
          // FIND ELIGIBLE SCHEMES
          // -------------------------

          const allSchemes =
            await Scheme.find({
              status: "ACTIVE",
            });


          const eligibleSchemesForUser =
            getEligibleSchemesForUser(
              user,
              allSchemes
            );


          // -------------------------
          // NO SCHEMES
          // -------------------------

          if (
            eligibleSchemesForUser.length === 0
          ) {

            await sendWhatsAppMessage(
              mobile,
              `Currently no schemes found based on your profile.`
            );

          } else {

            let schemeMessage =
              `🎉 You may be eligible for:\n\n`;


            eligibleSchemesForUser.forEach(
              (scheme, index) => {

                schemeMessage +=
                  `${index + 1}. ${scheme.title}\n`;

                schemeMessage +=
                  `${scheme.benefits}\n\n`;
              }
            );


            schemeMessage +=
              `Reply with scheme number to apply.`;


            await sendWhatsAppMessage(
              mobile,
              schemeMessage
            );
          }


          user.whatsapp_flow_state =
            FLOW_STATES.ELIGIBILITY_RESULTS;

          await user.save();

          break;
        }


        // -------------------------
        // ELIGIBILITY RESULTS
        // -------------------------

        case FLOW_STATES.ELIGIBILITY_RESULTS: {

          const allSchemes =
            await Scheme.find({
              status: "ACTIVE",
            });


          const eligibleSchemesForUser =
            getEligibleSchemesForUser(
              user,
              allSchemes
            );


          const selectedIndex =
            Number(text) - 1;


          const selectedScheme =
            eligibleSchemesForUser[
              selectedIndex
            ];


          // -------------------------
          // INVALID SELECTION
          // -------------------------

          if (!selectedScheme) {

            await sendWhatsAppMessage(
              mobile,
              `Invalid scheme selection. Please reply with valid number.`
            );

            break;
          }


          // -------------------------
          // SAVE SELECTED SCHEME
          // -------------------------

          user.selected_scheme_id =
            selectedScheme._id;

          await user.save();


          // -------------------------
          // CREATE APPLICATION
          // -------------------------

          await Application.create({

            user_id:
              user._id,

            scheme_id:
              selectedScheme._id,

            status:
              "STARTED",
          });


          // -------------------------
          // DOCUMENT MESSAGE
          // -------------------------

          let docsMessage =
            `📄 Application started for:\n\n`;


          docsMessage +=
            `${selectedScheme.title}\n\n`;


          docsMessage +=
            `Please upload these documents:\n\n`;


          selectedScheme.documents_required
            ?.forEach((doc) => {

              docsMessage +=
                `• ${doc}\n`;
            });


          docsMessage +=
            `\nSend first document now.`;


          await sendWhatsAppMessage(
            mobile,
            docsMessage
          );


          user.whatsapp_flow_state =
            FLOW_STATES.DOCUMENT_UPLOAD;

          await user.save();

          break;
        }


        // -------------------------
        // DOCUMENT UPLOAD
        // -------------------------

        case FLOW_STATES.DOCUMENT_UPLOAD: {

          // -------------------------
          // VALIDATE MEDIA
          // -------------------------

          if (

            !image &&

            !document
          ) {

            await sendWhatsAppMessage(

              mobile,

              `Please upload document as image or PDF.`
            );

            break;
          }

          const mediaId =

            image?.id ||

            document?.id;

          // -------------------------
            // GET MEDIA URL
          // -------------------------

          const mediaUrl =

            await getWhatsAppMediaUrl(
              mediaId
            );


          // -------------------------
          // DOWNLOAD FILE
          // -------------------------

          const localFilePath =

            await downloadWhatsAppMedia(

              mediaUrl,

              `${Date.now()}`
            );


          console.log({

            mediaUrl,

            localFilePath,
          });


          // -------------------------
          // FIND APPLICATION
          // -------------------------

          const application =
            await Application.findOne({

              user_id:
                user._id,

              scheme_id:
                user.selected_scheme_id,
            }).populate("scheme_id");


          if (!application) {

            await sendWhatsAppMessage(

              mobile,

              `Application not found.`
            );

            break;
          }


          // -------------------------
          // REQUIRED DOCS
          // -------------------------

          const requiredDocs =

            application.scheme_id
              .documents_required;


          const currentDocName =

            requiredDocs[
              user.current_document_index
            ];


          // -------------------------
          // SAVE DOCUMENT
          // -------------------------

          application.documents.push({

            document_name:
              currentDocName,

            document_type:
              image
                ? "IMAGE"
                : "PDF",

            whatsapp_media_id:
              image?.id ||

              document?.id,
          });


          await application.save();


          // -------------------------
          // NEXT DOC
          // -------------------------

          user.current_document_index += 1;

          await user.save();


          // -------------------------
          // ALL DOCS COMPLETED
          // -------------------------

          if (

            user.current_document_index >=
            requiredDocs.length
          ) {

            await sendWhatsAppMessage(

              mobile,

              `✅ All documents uploaded successfully.

        Your application is now under review.`
            );


            application.status =
              "SUBMITTED";

            await application.save();


            user.whatsapp_flow_state =
              FLOW_STATES.COMPLETED;

            await user.save();

            break;
          }


          // -------------------------
          // ASK NEXT DOCUMENT
          // -------------------------

          const nextDoc =

            requiredDocs[
              user.current_document_index
            ];


          await sendWhatsAppMessage(

            mobile,

            `✅ Document received.

        Please upload:

        ${nextDoc}`
          );

          break;
        }


        // -------------------------
        // COMPLETED
        // -------------------------

        case FLOW_STATES.COMPLETED: {

          await sendWhatsAppMessage(
            mobile,
            `Your onboarding is already completed ✅`
          );

          break;
        }


        // -------------------------
        // DEFAULT
        // -------------------------

        default: {

          await sendWhatsAppMessage(
            mobile,
            `Something went wrong. Please try again.`
          );
        }
      }


      return res.sendStatus(200);

    } catch (err) {

      console.error(err);

      return res.sendStatus(500);
    }
  };
