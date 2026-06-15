
import {
  handleLanguageSelection,
} from "./flowHandlers/languageHandler.js";

import {
  handleConsent,
} from "./flowHandlers/consentHandler.js";



import {
  handleProfileName,
  handleGenderSelection,
  handleDateOfBirth,
  handleStateSelection,
  handleDistrictSelection,
  handleIncomeCapture,
   handleOccupationCapture,
} from "./flowHandlers/profileHandler.js";

import {
  getEligibleSchemesForWhatsAppUser,
} from "./whatsappEligibilityService.js";

import WhatsAppSession
from "./WhatsAppSession.js";

import { Scheme }
from "../scheme/scheme.model.js";

import { Application }
from "../application/application.model.js";

import { User }
from "../user/user.model.js";

import {
  PAGE_SIZE,
  WHATSAPP_STEPS,
} from "./whatsappConstants.js";

import { t }
from "./translations.js";






export const processIncomingMessage = async ({
  session,
  phoneNumber,
  message,
}) => {

  const lang =
    session?.language || "en";

  if (message === "1") {

    message = "VIEW_SCHEMES";
  }

  if (message === "2") {

    message = "TRACK";
  }

  if (message === "5") {

    message = "RESET";
  }

  if (message === "1") {

    message = "VIEW_SCHEMES";
  }

  if (message === "2") {

    message = "TRACK";
  }

  if (message === "5") {

    message = "RESET";
  }

  // Handle language button clicks
  if (
    message === "LANG_EN" ||
    message === "LANG_HI" ||
    message === "LANG_KN"
  ) {
    return await handleLanguageSelection({
      phoneNumber,
      buttonId: message,
    });
  }

  // Consent buttons
  if (
    message === "CONSENT_ACCEPT" ||
    message === "CONSENT_DECLINE"
  ) {
    return await handleConsent({
      phoneNumber,
      buttonId: message,
    });
  }

  if (
    message === "GENDER_MALE" ||
    message === "GENDER_FEMALE" ||
    message === "GENDER_OTHER"
  ) {
    return await handleGenderSelection({
      phoneNumber,
      buttonId: message,
    });
  }

  // NEW BUTTON HANDLER

  if (
    message === "VIEW_SCHEMES"
  ) {

    console.log("VIEW_SCHEMES CLICKED");


    const maxPages =
      Math.ceil(
        currentSession.eligibleSchemes.length /
        PAGE_SIZE
      );

    await WhatsAppSession.updateOne(
      { phoneNumber },
      {
        $set: {
          currentPage: Math.min(
            currentSession.currentPage + 1,
            maxPages
          ),
        },
      }
    );

  

     console.log( "PAGE RESET DONE" );

    const updatedSession =
      await WhatsAppSession
        .findOne({ phoneNumber })
        .populate("eligibleSchemes");

     

     console.log("SCHEME COUNT:", updatedSession?.eligibleSchemes?.length);

    const page = 1;

    const totalPages =
      Math.ceil(
        updatedSession.eligibleSchemes.length /
        PAGE_SIZE
      );

    const schemes =
      updatedSession.eligibleSchemes.slice(
        0,
        PAGE_SIZE
      );

    let schemeList =
      `🎯 Eligible Schemes\n`;

    schemeList +=
      `Page ${page}/${totalPages}\n\n`;

    schemes.forEach(
      (scheme, index) => {
        schemeList +=
          `${index + 1}. ${scheme.title}\n`;
      }
    );

    schemeList +=
      `\nReply:\n`;
    schemeList +=
      `1-5 = View Scheme\n`;
    schemeList +=
      `NEXT = Next Page\n`;
    schemeList +=
      `PREV = Previous Page`;

    return {
      type: "text",
      text: {
        body: schemeList,
      },
    };
  }


  console.log(
    "CURRENT STEP:",
    session.currentStep,
    "MESSAGE:",
    message
  );

  if (message?.toUpperCase() === "TRACK") {

      const user =
        await User.findOne({
          mobile: phoneNumber,
        });

      if (!user) {
        return {
          type: "text",
          text: {
            body:
              "No applications found."
          }
        };
      }

      const applications =
        await Application
          .find({
            user_id: user._id,
          })
          .populate("scheme_id");

      if (!applications.length) {
        return {
          type: "text",
          text: {
            body:
              "No applications found."
          }
        };
      }

      let response =
        "📋 My Applications\n\n";

      applications.forEach(
        (app, index) => {

          response +=
            `${index + 1}. ${app.scheme_id?.title}\n`;

          response +=
            `Status: ${app.status}\n\n`;
        }
      );

      response +=
        "Reply TRACK 1, TRACK 2 etc. for details.";

      return {
        type: "text",
        text: {
          body: response,
        },
      };
    }

    if (
      message?.toUpperCase()?.startsWith("TRACK ")
    ) {

      const index =
        parseInt(
          message.split(" ")[1]
        );

      if (isNaN(index)) {
        return {
          type: "text",
          text: {
            body:
              "Invalid format. Use TRACK 1, TRACK 2 etc."
          }
        };
      }

      const user =
        await User.findOne({
          mobile: phoneNumber,
        });

      const applications =
        await Application
          .find({
            user_id: user._id,
          })
          .populate("scheme_id");

      const application =
        applications[index - 1];

      if (!application) {
        return {
          type: "text",
          text: {
            body:
              t(lang,
              "APPLICATION_NOT_FOUND")
          }
        };
      }

      return {
        type: "text",
        text: {
          body:
    `📋 Application Details

    Scheme:
    ${application.scheme_id?.title}

    Status:
    ${application.status}

    Documents Uploaded:
    ${application.documents?.length || 0}

    Application ID:
    ${application._id}

    Reply TIMELINE ${index}
    to view status history.`
        }
      };
    }

    if (
      message?.toUpperCase()?.startsWith("TIMELINE ")
    ) {

      const index =
        parseInt(
          message.split(" ")[1]
        );

      if (isNaN(index)) {
        return {
          type: "text",
          text: {
            body:
              "Invalid format. Use TIMELINE 1, TIMELINE 2 etc."
          }
        };
      }

      const user =
        await User.findOne({
          mobile: phoneNumber,
        });

      const applications =
        await Application
          .find({
            user_id: user._id,
          })
          .populate("scheme_id");

      const application =
        applications[index - 1];

      if (!application) {
        return {
          type: "text",
          text: {
            body:
              t(lang,
              "APPLICATION_NOT_FOUND")
          }
        };
      }

      let timeline =
        `📋 Application Timeline\n\n`;

      application.status_history.forEach(
        (item) => {

          timeline +=
            `✅ ${item.status}\n`;

          timeline +=
            `${new Date(
              item.updated_at
            ).toLocaleDateString()}\n`;

          if (item.admin_remarks) {

            timeline +=
              `${item.admin_remarks}\n`;
          }

          timeline += "\n";
        }
      );

      return {
        type: "text",
        text: {
          body: timeline,
        },
      };
    }
    if (
      message?.toUpperCase()?.startsWith("STATUS ")
    ) {

      const applicationId =
        message.substring(7).trim();

      const application =
        await Application
          .findById(applicationId)
          .populate("scheme_id");

      if (!application) {

        return {
          type: "text",
          text: {
            body:
              t(lang,
              "APPLICATION_NOT_FOUND")
      
          }
        };
      }

      return {
        type: "text",
        text: {
          body:
    `📋 Application Status

    Scheme:
    ${application.scheme_id?.title}

    Status:
    ${application.status}

    Application ID:
    ${application._id}`
        }
      };
    }

    if (
      ["RESET", "RESTART", "START OVER"]
        .includes(
          message?.toUpperCase()
        )
    ) {

      await WhatsAppSession.updateOne(
        { phoneNumber },
        {
          $set: {

            currentStep:
              WHATSAPP_STEPS.WELCOME,

            selectedSchemeId:
              null,

            applicationId:
              null,

            currentDocumentIndex:
              0,

            eligibleSchemes: [],
          },
        }
      );

      return {
        nextStep:
          WHATSAPP_STEPS.WELCOME,
      };
    }

    if (
      message?.toUpperCase() === "MENU"
    ) {

      return {
        type: "text",
        text: {
          body:
    `🏠 SetuNxt Main Menu

    1️⃣ Eligible Schemes

    2️⃣ My Applications

    3️⃣ Track Application

    4️⃣ Help

    5️⃣ Restart Journey

    Reply with 1-5`
        }
      };
    }

    if (message === "3") {

      return {
        type: "text",
        text: {
          body:
    `📋 Track Application

    Please enter:

    STATUS <Application ID>

    Example:

    STATUS 685ABCD123`
        }
      };
    }

    if (message === "4") {

      return {
        type: "text",
        text: {
          body:
    `ℹ️ Help

    MENU
    Show menu

    TRACK
    Show my applications

    STATUS <Application ID>
    Track specific application

    RESET
    Restart journey`
        }
      };
    }




  switch (session.currentStep) {

    case WHATSAPP_STEPS.WELCOME:
      return {
        nextStep:
          WHATSAPP_STEPS.LANGUAGE_SELECTION,
      };

    case WHATSAPP_STEPS.LANGUAGE_SELECTION:
      return {
        nextStep:
          WHATSAPP_STEPS.CONSENT,
      };

    case WHATSAPP_STEPS.CONSENT:
      return {
        nextStep:
          WHATSAPP_STEPS.PROFILE_NAME,
      };

    case WHATSAPP_STEPS.PROFILE_NAME:
      return await handleProfileName({
        phoneNumber,
        message,
      });

    case WHATSAPP_STEPS.PROFILE_DOB:
      return await handleDateOfBirth({
        phoneNumber,
        message,
      });

    case WHATSAPP_STEPS.PROFILE_STATE:
      return await handleStateSelection({
        phoneNumber,
        message,
      });

    case WHATSAPP_STEPS.PROFILE_DISTRICT:
      return await handleDistrictSelection({
        phoneNumber,
        message,
      });

    case WHATSAPP_STEPS.PROFILE_OCCUPATION:
      return await handleOccupationCapture({
        phoneNumber,
        message,
      });

    case WHATSAPP_STEPS.PROFILE_INCOME:
      return await handleIncomeCapture({
        phoneNumber,
        message,
      });



    case WHATSAPP_STEPS.ELIGIBILITY_CHECK: {

      const eligibleSchemes =
        await getEligibleSchemesForWhatsAppUser(
          session
        );

      const updatedSession =
        await WhatsAppSession.findOneAndUpdate(
          {
            phoneNumber,
          },
          {
            eligibleSchemes:
              eligibleSchemes.map(
                (scheme) => scheme._id
              ),
          },
          {
            returnDocument: "after",
          }
        );

   

    

      console.log(
        "UPDATED SESSION SCHEMES:",
        updatedSession?.eligibleSchemes?.length
      );

      console.log(
        "ELIGIBLE SCHEMES:",
        eligibleSchemes.length
      );

      if (eligibleSchemes.length > 0) {

        console.log(
          "FIRST SCHEME:",
          eligibleSchemes[0].title
        );
      }

      return {
        success: true,
        nextStep:
          WHATSAPP_STEPS.SCHEME_SELECTION,

        eligibleSchemes,
      };
    }

   
    case WHATSAPP_STEPS.SCHEME_SELECTION: {

      console.log(
        "SCHEME_SELECTION HIT"
      );

      const currentSession =
        await WhatsAppSession.findOne({
          phoneNumber,
        });

      if (
        message?.toUpperCase() === "NEXT" ||
        message?.toUpperCase() === "PREV"
      ) {

     
        if (message?.toUpperCase() === "NEXT") {

          const maxPages =
            Math.ceil(
              currentSession.eligibleSchemes.length /
              PAGE_SIZE
            );

          await WhatsAppSession.updateOne(
            { phoneNumber },
            {
              $set: {
                currentPage: Math.min(
                  currentSession.currentPage + 1,
                  maxPages
                ),
              },
            }
          );
        }

        if (message?.toUpperCase() === "PREV") {

          await WhatsAppSession.updateOne(
            { phoneNumber },
            {
              $set: {
                currentPage: Math.max(
                  currentSession.currentPage - 1,
                  1
                ),
              },
            }
          );
        }
 

        const updatedSession =
          await WhatsAppSession
            .findOne({ phoneNumber })
            .populate("eligibleSchemes");

        const page =
          updatedSession.currentPage || 1;

        const totalPages =
          Math.ceil(
            updatedSession.eligibleSchemes.length /
            PAGE_SIZE
          );

        const schemes =
          updatedSession.eligibleSchemes.slice(
            (page - 1) * PAGE_SIZE,
            page * PAGE_SIZE
          );

        let schemeList =
          `🎯 Eligible Schemes\n`;

        schemeList +=
          `Page ${page}/${totalPages}\n\n`;

        schemes.forEach(
          (scheme, index) => {
            schemeList +=
              `${index + 1}. ${scheme.title}\n`;
          }
        );

        schemeList +=
          `\nReply:\n`;
        schemeList +=
          `1-5 = View Scheme\n`;
        schemeList +=
          `NEXT = Next Page\n`;
        schemeList +=
          `PREV = Previous Page`;

        return {
          type: "text",
          text: {
            body: schemeList,
          },
        };
      }


      const page =
        currentSession.currentPage || 1;


      const selectedIndex =
        ((page - 1) * PAGE_SIZE) +
        (Number(message) - 1);

      const populatedSession =
        await WhatsAppSession
          .findOne({ phoneNumber })
          .populate("eligibleSchemes");

      const selectedScheme =
        populatedSession?.eligibleSchemes?.[
          selectedIndex
        ];

      console.log(
        "PAGE:",
        page
      );

      console.log(
        "SELECTED INDEX:",
        selectedIndex
      );

      console.log(
        "SCHEME:",
        selectedScheme?.title
      );

      console.log(
        "SELECTED SCHEME ID:",
        selectedScheme?._id
      );

      await WhatsAppSession.findOneAndUpdate(
        { phoneNumber },
        {
          selectedSchemeId:
            selectedScheme._id,
        }
      );

      if (!selectedScheme) {

        return {
          type: "text",
          text: {
              body:
              t(lang,
              "INVALID_SCHEME")
          },
        };
      }

      return {
        success: true,
        selectedScheme,
        schemeMessage: `
    📋 ${selectedScheme.title}

    ${selectedScheme.description}

    🎁 Benefits:
    ${selectedScheme.benefits?.substring(0, 500)}

    Reply APPLY to start application.
    `,
        nextStep:
          WHATSAPP_STEPS.SCHEME_VIEW,
      };
    }


    case WHATSAPP_STEPS.SCHEME_VIEW: {

    console.log(
      "SCHEME_VIEW HIT:",
      JSON.stringify(message)
    );

    console.log(
      "UPPER:",
      message?.toUpperCase?.()
    );

        const currentSession =
          await WhatsAppSession.findOne({
            phoneNumber,
          });

      
        if (
          message?.toUpperCase() === "APPLY"
        ) {

 

        const user =
          await User.findOne({
            mobile: phoneNumber,
          });

        let application =
          await Application.findOne({

            _id:
              applicationId,

            user_id:
              user._id,

            submitted_via:
              "WHATSAPP",
          })
          .populate("scheme_id");

        if (!application) {

          const scheme =
            await Scheme.findById(
              currentSession.selectedSchemeId
            );

          application =
            await Application.create({

              user_id:
                user._id,

              scheme_id:
                currentSession.selectedSchemeId,

              submitted_via:
                "WHATSAPP",

              status:
                "STARTED",

               required_documents:
                (scheme?.documents_required || [])
                  .map(doc => ({

                    document_name: doc,

                    document_type:
                      doc
                        .toUpperCase()
                        .replace(/\s+/g, "_"),

                    mandatory: true,
                  })),
            });

          console.log(
            "NEW APPLICATION CREATED:",
            application._id
          );

        } else {

          console.log(
            "EXISTING APPLICATION FOUND:",
            application._id
          );
        }

      

        await WhatsAppSession.updateOne(
          { phoneNumber },
          {
            $set: {
              applicationId:
                application._id,

              currentDocumentIndex:
                0,
            },
          }
        );

        console.log(
          "APPLICATION ID SAVED:",
          application._id
        );

        console.log(
          "WHATSAPP APPLICATION CREATED"
        );

       
        return {
          nextStep:
            WHATSAPP_STEPS.DOCUMENT_UPLOAD,

          type: "text",

          text: {
        
            body:
              `📄 Document 1 of ${application.required_documents.length}

            Please upload:

            ${application.required_documents[0]?.document_name}`
          }
        };
      }
  

      return {
        type: "text",
        text: {
          body:
            "Reply APPLY to start application.",
        },
      };
    }
    case WHATSAPP_STEPS.DOCUMENT_UPLOAD: {

      const currentSession =
        await WhatsAppSession.findOne({
          phoneNumber,
        });

      console.log("DOCUMENT_UPLOAD HIT");

      if (message !== "UPLOAD") {
        return {
          type: "text",
          text: {
            body:
              t(lang,
              "PLEASE_UPLOAD")
          }
        };
      }

  

      console.log("SESSION :",currentSession?._id);

    
      const application =
        await Application.findById(
          currentSession.applicationId
        );

      const docs =
        application?.required_documents || [];

      const currentIndex =
        currentSession.currentDocumentIndex || 0;

      console.log(
        "CURRENT INDEX:",
        currentSession.currentDocumentIndex
      );

      console.log(
        "DOC LENGTH:",
        docs.length
      );

      // All docs uploaded
      if (currentIndex >= docs.length) {

        return {
          type: "text",
          text: {
            body:
              "✅ All documents received.\n\nYour application has been submitted for review."
          }
        };
      }

  


      console.log(
        "APPLICATION:",
        application?._id
      );
   


      application.documents.push({

        document_name:
          docs[currentIndex].document_name,

        document_type:
          docs[currentIndex].document_type,

        whatsapp_media_id:
          `TEST-${Date.now()}`,
      });


      console.log(
        "BEFORE DOCUMENT PUSH"
      );

      await application.save();

      console.log(
        "DOCUMENT SAVED:",
        docs[currentIndex].document_name
      );

      // Simulate upload received

      const maxPages = Math.ceil(
        currentSession.eligibleSchemes.length /
        PAGE_SIZE
      );

      await WhatsAppSession.updateOne(
        { phoneNumber },
        {
          $inc: {currentDocumentIndex : 1,},
        }
      );
  

      const nextIndex =
        currentIndex + 1;

      // Last document completed
  
      if (nextIndex >= docs.length) {

        application.status =
          "SUBMITTED";

        application.status_history.push({

          status:
            "SUBMITTED",

          admin_remarks:
            "All required documents uploaded via WhatsApp.",

          updated_at:
            new Date(),
        });

        await application.save();

        console.log(
          `UPLOAD PROGRESS: ${currentIndex + 1}/${docs.length}`
        );
        await WhatsAppSession.updateOne(
          { phoneNumber },
          {
            $set: {
              awaitingDocumentUpload: false,
            },
          }
        );

        return {
          type: "text",
          text: {
            body:
              `✅ Final document received.

      🎉 Application Submitted Successfully

      Application ID:
      ${application._id}

      Our team will review your documents and process the application.

      You can track status later using:
      TRACK ${application._id}`
          }
        };
      }


      return {
        type: "text",
        text: {
       
          body:
            `✅ Document received

          📄 Document ${nextIndex + 1} of ${docs.length}

          Please upload:

          ${docs[nextIndex].document_name}`
        }
      };
    }




      

      
 
    default:
      return {
        nextStep: session.currentStep,
      };
  }
};