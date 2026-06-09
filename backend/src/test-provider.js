import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import {
  testMySchemeProvider,
} from "./modules/scheme-import/schemeImport.service.js";

import {
  Scheme,
} from "./modules/scheme/scheme.model.js";

const run = async () => {

  try {

    await mongoose.connect(
      process.env.DB_URL
    );

    console.log(
      "Mongo Connected"
    );

    const schemes =
      await testMySchemeProvider();

    const firstScheme =
        schemes[0];

    const saved =
        await Scheme.findOneAndUpdate(
         {
            externalSchemeId:
                firstScheme.externalSchemeId,
         },
         firstScheme,
            {
            upsert: true,
         new: true,
         }
        );

 

    console.log(
      "Saved ID:",
      saved._id
    );

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

run();