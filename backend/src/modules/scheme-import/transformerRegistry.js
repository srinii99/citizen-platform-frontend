import {
  transformApiSetu,
} from "./transformers/apisetu.transformer.js";

import {
  transformMySchemeRecord,
} from "./transformers/myscheme.transformer.js";

export const transformerRegistry = {
  MYSCHEME: transformMySchemeRecord,
  APISETU: transformApiSetu,
};