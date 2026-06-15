import {
  updateProfileField,
  updateStep,
} from "../whatsappSessionService.js";

import {
  WHATSAPP_STEPS,
} from "../whatsappConstants.js";

export const handleProfileName =
  async ({
    phoneNumber,
    message,
  }) => {

    await updateProfileField(
      phoneNumber,
      "fullName",
      message
    );

    await updateStep(
      phoneNumber,
      WHATSAPP_STEPS.PROFILE_GENDER
    );

    return {
      success: true,
      nextStep:
        WHATSAPP_STEPS.PROFILE_GENDER,
    };
  };

export const handleGenderSelection =
  async ({
    phoneNumber,
    buttonId,
  }) => {

    let gender = "OTHER";

    if (buttonId === "GENDER_MALE") {
      gender = "MALE";
    }

    if (
      buttonId === "GENDER_FEMALE"
    ) {
      gender = "FEMALE";
    }

    await updateProfileField(
      phoneNumber,
      "gender",
      gender
    );

    await updateStep(
      phoneNumber,
      WHATSAPP_STEPS.PROFILE_DOB
    );

    return {
      success: true,
      nextStep:
        WHATSAPP_STEPS.PROFILE_DOB,
    };
  };

  
export const handleDateOfBirth =
  async ({
    phoneNumber,
    message,
  }) => {

    await updateProfileField(
      phoneNumber,
      "dateOfBirth",
      message
    );

    await updateStep(
      phoneNumber,
      WHATSAPP_STEPS.PROFILE_STATE
    );

    return {
      success: true,
      nextStep:
        WHATSAPP_STEPS.PROFILE_STATE,
    };
  };

export const handleStateSelection =
  async ({
    phoneNumber,
    message,
  }) => {

    await updateProfileField(
      phoneNumber,
      "state",
      message
    );

    await updateStep(
      phoneNumber,
      WHATSAPP_STEPS.PROFILE_DISTRICT
    );

    return {
      success: true,
      nextStep:
        WHATSAPP_STEPS.PROFILE_DISTRICT,
    };
  };

export const handleDistrictSelection =
  async ({
    phoneNumber,
    message,
  }) => {

    await updateProfileField(
      phoneNumber,
      "district",
      message
    );

    await updateStep(
      phoneNumber,
      WHATSAPP_STEPS.PROFILE_OCCUPATION
    );

    return {
      success: true,
      nextStep:
        WHATSAPP_STEPS.PROFILE_OCCUPATION,
    };
  };

export const handleIncomeCapture =
  async ({
    phoneNumber,
    message,
  }) => {

    const income =
      Number(message);

    if (
      Number.isNaN(income)
    ) {

      return {
        success: false,
        nextStep:
          WHATSAPP_STEPS.PROFILE_INCOME,
      };
    }

    await updateProfileField(
      phoneNumber,
      "annualIncome",
      income
    );

    await updateStep(
      phoneNumber,
      WHATSAPP_STEPS.ELIGIBILITY_CHECK
    );

    return {
      success: true,
      nextStep:
        WHATSAPP_STEPS.ELIGIBILITY_CHECK,
    };
  };

export const handleOccupationCapture =
  async ({
    phoneNumber,
    message,
  }) => {

    await updateProfileField(
      phoneNumber,
      "occupation",
      message.toUpperCase()
    );

    await updateStep(
      phoneNumber,
      WHATSAPP_STEPS.PROFILE_INCOME
    );

    return {
      success: true,
      nextStep:
        WHATSAPP_STEPS.PROFILE_INCOME,
    };
  };