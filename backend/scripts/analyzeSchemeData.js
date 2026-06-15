import mongoose from "mongoose";
import dotenv from "dotenv";

import { Scheme } from "../src/modules/scheme/scheme.model.js";

dotenv.config();

async function analyze() {
  try {

    await mongoose.connect(
        process.env.DB_URL
        );

    const total =
      await Scheme.countDocuments();

    console.log("\n===============================");
    console.log("SCHEME AUDIT REPORT");
    console.log("===============================\n");

    console.log("Total Schemes:", total);

    const stats = {
      ministry: 0,
      department: 0,
      benefits: 0,
      eligibility: 0,
      categories: 0,
      beneficiaries: 0,
      tags: 0,
      documents_required: 0,
      applicationUrl: 0,
      officialWebsite: 0,
    };

    const schemes =
      await Scheme.find({}).lean();

    schemes.forEach((scheme) => {

      if (scheme.ministry?.trim())
        stats.ministry++;

      if (scheme.department?.trim())
        stats.department++;

      if (scheme.benefits?.trim())
        stats.benefits++;

      if (scheme.eligibility?.trim())
        stats.eligibility++;

      if (scheme.categories?.length)
        stats.categories++;

      if (scheme.beneficiaries?.length)
        stats.beneficiaries++;

      if (scheme.tags?.length)
        stats.tags++;

      if (scheme.documents_required?.length)
        stats.documents_required++;

      if (scheme.applicationUrl?.trim())
        stats.applicationUrl++;

      if (scheme.officialWebsite?.trim())
        stats.officialWebsite++;
    });

    console.table(stats);

    process.exit(0);

  } catch (error) {

    console.error(error);
    process.exit(1);
  }
}

analyze();