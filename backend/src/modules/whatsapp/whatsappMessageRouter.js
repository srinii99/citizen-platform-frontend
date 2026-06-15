import {
  WHATSAPP_STEPS,
} from "./whatsappConstants.js";

import {
  getLanguageSelectionMessage,
} from "./templates/welcomeTemplates.js";

import {
  getConsentMessage,
} from "./templates/consentTemplates.js";

import {
  getGenderSelectionMessage,
} from "./templates/profileTemplates.js";

import WhatsAppSession
from "./WhatsAppSession.js";

import { Scheme }
from "../scheme/scheme.model.js";

export const getMessageForStep = (
  step
) => {

  switch (step) {

    case WHATSAPP_STEPS.LANGUAGE_SELECTION:
      return getLanguageSelectionMessage();

    case WHATSAPP_STEPS.CONSENT:
      return getConsentMessage();

    case WHATSAPP_STEPS.PROFILE_NAME:
      return {
        type: "text",
        text: {
          body:
            "Please enter your full name.",
        },
      };

    case WHATSAPP_STEPS.PROFILE_GENDER:
      return getGenderSelectionMessage();




    case WHATSAPP_STEPS.PROFILE_DOB:
      return {
        type: "text",
        text: {
          body:
            "Please enter your Date of Birth (DD/MM/YYYY).",
        },
      };

    case WHATSAPP_STEPS.PROFILE_STATE:
      return {
        type: "text",
        text: {
          body:
            "Please enter your State.",
        },
      };

    case WHATSAPP_STEPS.PROFILE_DISTRICT:
      return {
        type: "text",
        text: {
          body:
            "Please enter your District.",
        },
      };

    case WHATSAPP_STEPS.PROFILE_OCCUPATION:
      return {
        type: "text",
        text: {
          body:
            "Please enter your occupation (Farmer, Student, Salaried, Self Employed, Unemployed).",
        },
      };

    case WHATSAPP_STEPS.PROFILE_INCOME:
      return {
        type: "text",
        text: {
          body:
            "Please enter your annual family income.",
        },
      };

    case WHATSAPP_STEPS.ELIGIBILITY_CHECK:
      return {
        type: "text",
        text: {
          body:
            "Checking your eligibility for government schemes..."
        },
      };


    case WHATSAPP_STEPS.SCHEME_SELECTION:
      return {
        type: "text",
        text: {
          body:
            "We found eligible schemes for you. Please select a scheme to continue.",
        },
      };

   

    default:
      return null;
  }
};