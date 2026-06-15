import {
  acceptConsent,
  updateStep,
} from "../whatsappSessionService.js";

import {
  WHATSAPP_STEPS,
} from "../whatsappConstants.js";

export const handleConsent = async ({
  phoneNumber,
  buttonId,
}) => {

  if (buttonId === "CONSENT_DECLINE") {

    return {
      success: false,
      message:
        "Consent required to continue.",
    };
  }

  await acceptConsent(phoneNumber);

  await updateStep(
    phoneNumber,
    WHATSAPP_STEPS.PROFILE_NAME
  );

  return {
    success: true,
    nextStep:
      WHATSAPP_STEPS.PROFILE_NAME,
  };
};