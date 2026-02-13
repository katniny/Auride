import { Upload } from "tus-js-client";

declare global {
  var tus: { Upload: typeof Upload };
}
