import {
  fetchMySchemeData,
} from "./providers/myscheme.provider.js";

import {
  fetchApiSetuData,
} from "./providers/apisetu.provider.js";

export const PROVIDERS = {

  MYSCHEME:
    fetchMySchemeData,

  APISETU:
    fetchApiSetuData,

};