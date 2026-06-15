import { updateLanguage } from "../whatsappSessionService.js";
import { updateStep } from "../whatsappSessionService.js";

import {
  WHATSAPP_STEPS,
} from "../whatsappConstants.js";

export const handleLanguageSelection =
  async ({
    phoneNumber,
    buttonId,
  }) => {

    let language = "en";

    if (buttonId === "LANG_HI") {
      language = "hi";
    }

    if (buttonId === "LANG_KN") {
      language = "kn";
    }

    await updateLanguage(
      phoneNumber,
      language
    );

    await updateStep(
      phoneNumber,
      WHATSAPP_STEPS.CONSENT
    );

    return {
      success: true,
      language,
      nextStep:
        WHATSAPP_STEPS.CONSENT,
    };


  };

