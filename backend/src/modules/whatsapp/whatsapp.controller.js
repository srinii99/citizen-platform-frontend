
import { User }
from "../user/user.model.js";



import WhatsAppMessage
from "./whatsappMessage.model.js";

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


import {
  getConversationHistory,
} from "./whatsappConversation.service.js";

import { whatsappConfig }
from "./whatsapp.config.js";

import {
  extractWhatsAppMessage,
} from "./whatsappValidator.js";

import {
  getOrCreateSession,
  updateStep,
} from "./whatsappSessionService.js";

import {
  processIncomingMessage,
} from "./whatsappFlowService.js";

import {
  getMessageForStep,
} from "./whatsappMessageRouter.js";


import {
  sendWhatsAppResponse,
} from "./whatsappResponseService.js";

import {
  buildViewSchemesButton,
} from "./helpers/interactiveMessages.js";




const USE_SPRINT10_FLOW = true;


// -------------------------
// VERIFY WEBHOOK
// -------------------------

export const verifyWebhook =
  async (req, res) => {

    


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
      token === whatsappConfig.verifyToken
    ) {

      whatsappLog(
        "Webhook verified"
      );

      return res.status(200)
        .send(challenge);
    }

    return res.sendStatus(403);
  };





export const getConversation = async (
  req,
  res
) => {

  try {

    const { phoneNumber } =
      req.params;

    const conversation =
      await getConversationHistory(
        phoneNumber
      );

    return res.status(200).json({
      success: true,
      data: conversation,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch conversation",
    });
  }
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


     
      const {
        entry,
        change,
        value,
        message,
      } = extractWhatsAppMessage(
        req.body
      );
    


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

      if (
        !message.text &&
        !message.image &&
        !message.document
      ) {

        console.log(
          "[WHATSAPP] Unsupported message type"
        );

        return res.sendStatus(200);
      }
      
      const image =
        message.image;

      const document =
        message.document;

      console.log(
        "IMAGE:",
        JSON.stringify(image, null, 2)
      );

      console.log(
        "DOCUMENT:",
        JSON.stringify(document, null, 2)
      );


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

        phoneNumber:
          mobile,

        direction:
          "inbound",

        message:
          text,

        status:
          "received",
      });


// -------------------------
// SPRINT 10 FEATURE FLAG
// -------------------------

    if (USE_SPRINT10_FLOW) {

      console.log(
        "[SPRINT10 FLOW ENABLED]"
      );

      const session =
        await getOrCreateSession(
          mobile
        );

      const THIRTY_DAYS =
        30 * 24 * 60 * 60 * 1000;

      if (
        session.lastMessageAt &&
        (
          Date.now() -
          new Date(session.lastMessageAt).getTime()
        ) > THIRTY_DAYS
      ) {

        session.currentStep =
          WHATSAPP_STEPS.WELCOME;

        session.selectedSchemeId =
          null;

        session.applicationId =
          null;

        session.currentDocumentIndex =
          0;

        session.eligibleSchemes = [];

        await session.save();
      }

      const result =
        await processIncomingMessage({
          session,
          phoneNumber: mobile,
          message:text,
        });

      if (result?.nextStep) {

        await updateStep(
          mobile,
          result.nextStep
        );

       
        let nextMessage;

          if (result.schemeMessage) {

            nextMessage = {
              type: "text",
              text: {
                body: result.schemeMessage,
              },
            };

          } else {

            nextMessage =
              getMessageForStep(
                result.nextStep
              );
          }

          console.log(
            "SPRINT10 RESULT:",
            result
          );

          await sendWhatsAppResponse(
            mobile,
            nextMessage
          );
     
      }

      return res.sendStatus(200);
    }


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
          
          const age = Number(text);

          if (isNaN(age)) {

       

            await sendWhatsAppMessage(
              mobile,
              "Please enter a valid age."
            );

       

            return res.sendStatus(200);
          }

          user.age = age;


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

            import {
              sendApplicationNotification,
            }
            from "../whatsapp/whatsappNotificationService.js";


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

export const testFlow = async (
  req,
  res
) => {

  console.log(
    "REQUEST BODY:",
    req.body
  );

  try {

    const {
      phoneNumber,
      message,
    } = req.body;

    console.log("PHONE NUMBER :", phoneNumber);

    const session =
      await getOrCreateSession(
        phoneNumber
      );

   
    const result =
      await processIncomingMessage({
        session,
        phoneNumber,
        message,
      });

    if (result?.type) {

      await sendWhatsAppResponse(
        phoneNumber,
        result
      );

      return res.json({
        success: true,
        result,
        messageSent: true,
      });
    }

    if (result?.nextStep) {

      await updateStep(
        phoneNumber,
        result.nextStep
      );

      let nextMessage;

      if (
        result.nextStep ===
        "SCHEME_SELECTION"
      ) {

        const updatedSession =
          await getOrCreateSession(
            phoneNumber
          );

        nextMessage =
          buildViewSchemesButton(
            updatedSession.eligibleSchemes.length
          );

      } else if (
        result.schemeMessage
      ) {

        nextMessage = {
          type: "text",
          text: {
            body:
              result.schemeMessage,
          },
        };

      } else {

        nextMessage =
          getMessageForStep(
            result.nextStep
          );
      }

      await sendWhatsAppResponse(
        phoneNumber,
        nextMessage
      );

      return res.json({
        success: true,
        session,
        result,
        nextMessage,
        messageSent: true,
      });
    }

    return res.json({
      success: true,
      result,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};




