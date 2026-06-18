import { extractAge } from "./extractAge.js";
import { extractIncome } from "./extractIncome.js";
import { extractState } from "./extractState.js";
import { extractGender } from "./extractGender.js";
import { extractCaste } from "./extractCaste.js";
import { extractOccupation } from "./extractOccupation.js";
import { extractDisability } from "./extractDisability.js";
import { extractStudent } from "./extractStudent.js";
import { extractFarmer } from "./extractFarmer.js";
import { extractMaritalStatus } from "./extractMaritalStatus.js";
import { extractResidenceDuration } from "./extractResidenceDuration.js";
import { extractDocument } from "./extractDocument.js";



export const extractors = [

    extractAge,

    extractIncome,

    extractState,
    extractGender,
    extractCaste,
    extractOccupation,
    extractDisability,
    extractStudent,
    extractFarmer,
    extractMaritalStatus,
    extractResidenceDuration,
    extractDocument,

];