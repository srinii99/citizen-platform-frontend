export const translations = {

  en: {

    APPLICATION_NOT_FOUND:
      "Application not found.",

    INVALID_SCHEME:
      "Invalid scheme selection. Please reply with a valid scheme number.",

    PLEASE_UPLOAD:
      "Please upload the requested document.",

    RESET_SUCCESS:
      "Journey restarted successfully.",

  },

  kn: {

    APPLICATION_NOT_FOUND:
      "ಅರ್ಜಿಯನ್ನು ಕಂಡುಹಿಡಿಯಲಾಗಲಿಲ್ಲ.",

    INVALID_SCHEME:
      "ಅಮಾನ್ಯ ಯೋಜನೆ ಆಯ್ಕೆ.",

    PLEASE_UPLOAD:
      "ದಯವಿಟ್ಟು ಅಗತ್ಯ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",

    RESET_SUCCESS:
      "ಪ್ರಕ್ರಿಯೆಯನ್ನು ಮರುಪ್ರಾರಂಭಿಸಲಾಗಿದೆ.",

  },

  hi: {

    APPLICATION_NOT_FOUND:
      "आवेदन नहीं मिला।",

    INVALID_SCHEME:
      "अमान्य योजना चयन।",

    PLEASE_UPLOAD:
      "कृपया आवश्यक दस्तावेज़ अपलोड करें।",

    RESET_SUCCESS:
      "यात्रा पुनः प्रारंभ की गई है।",

  },
};

export const t = (
  language,
  key
) => {

  return (
    translations?.[language]?.[key] ||
    translations.en[key] ||
    key
  );
};