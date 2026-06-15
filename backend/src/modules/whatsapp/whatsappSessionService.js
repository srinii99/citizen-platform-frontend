import WhatsAppSession from "./WhatsAppSession.js";
import {
  WHATSAPP_STEPS,
} from "./whatsappConstants.js";


export const getSession = async (phoneNumber) => {
  return await WhatsAppSession.findOne({
    phoneNumber,
  });
};

export const createSession = async (
  phoneNumber
) => {
  return await WhatsAppSession.create({
    phoneNumber,
    currentStep: WHATSAPP_STEPS.WELCOME,
  });
};

export const getOrCreateSession = async (
  phoneNumber
) => {
  let session =
    await WhatsAppSession.findOne({
      phoneNumber,
    });

  if (!session) {
    session =
      await WhatsAppSession.create({
        phoneNumber,
        currentStep: WHATSAPP_STEPS.WELCOME,
      });
  }

  return session;
};

export const updateStep = async (
  phoneNumber,
  step
) => {
  return await WhatsAppSession.findOneAndUpdate(
    { phoneNumber },
    {
      currentStep: step,
      lastMessageAt: new Date(),
    },
   
    { returnDocument: "after" }
  );
};

export const updateLanguage = async (
  phoneNumber,
  language
) => {
  return await WhatsAppSession.findOneAndUpdate(
    { phoneNumber },
    {
      language,
      lastMessageAt: new Date(),
    },
   
    { returnDocument: "after" }
  );
};

export const acceptConsent = async (
  phoneNumber
) => {
  return await WhatsAppSession.findOneAndUpdate(
    { phoneNumber },
    {
      consentAccepted: true,
      lastMessageAt: new Date(),
    },
  
    { returnDocument: "after" }
    
  );
};

export const updateProfileField = async (
  phoneNumber,
  field,
  value
) => {
  return await WhatsAppSession.findOneAndUpdate(
    { phoneNumber },
    {
      [`profileData.${field}`]: value,
      lastMessageAt: new Date(),
    },
    
    { returnDocument: "after" }
  );
};


export const saveProfileName = async (
  phoneNumber,
  fullName
) => {
  return await WhatsAppSession.findOneAndUpdate(
    { phoneNumber },
    {
      "profileData.fullName": fullName,
      lastMessageAt: new Date(),
    },
    
    { returnDocument: "after" }
  );
};