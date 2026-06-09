import mongoose
from "mongoose";

const familyMemberSchema =
  new mongoose.Schema({

    user_id: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    relation_type: {

      type: String,

      enum: [

        "SPOUSE",

        "CHILD",

        "PARENT",
      ],

      required: true,
    },

    name: {

      type: String,

      required: true,
    },

    age: {

      type: Number,
    },

    gender: {

      type: String,

      enum: [

        "MALE",

        "FEMALE",

        "OTHER",
      ],
    },

    occupation: {

      type: String,

      default: "",
    },

    income: {

      type: Number,

      default: 0,
    },

    is_disabled: {

      type: Boolean,

      default: false,
    },

    aadhaar_linked: {

      type: Boolean,

      default: false,
    },

  }, {

    timestamps: true,
  });

export const FamilyMember =
  mongoose.model(

    "FamilyMember",

    familyMemberSchema
  );