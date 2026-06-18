import axios
from "axios";

import fs
from "fs";

import path
from "path";


const TOKEN =
  process.env
    .WHATSAPP_ACCESS_TOKEN;


// -------------------------
// GET MEDIA URL
// -------------------------

export const getWhatsAppMediaUrl =
  async (mediaId) => {

    try {

      const response =
        await axios.get(

          `https://graph.facebook.com/v22.0/${mediaId}`,

          {

            headers: {

              Authorization:
                `Bearer ${TOKEN}`,
            },
          }
        );

      return response.data.url;

    } catch (err) {

      console.error(err);

      return null;
    }
  };


// -------------------------
// DOWNLOAD MEDIA
// -------------------------

export const downloadWhatsAppMedia =
  async (

    mediaUrl,

    fileName
  ) => {

    try {

      const response =
        await axios({

          url:
            mediaUrl,

          method:
            "GET",

          responseType:
            "stream",

          headers: {

            Authorization:
              `Bearer ${TOKEN}`,
          },
        });

      if (!fs.existsSync("uploads")) {
        fs.mkdirSync("uploads", {
          recursive: true,
        });
      }


      const uploadPath =
        path.join(

          "uploads",

          fileName
        );


      const writer =
        fs.createWriteStream(
          uploadPath
        );


      response.data.pipe(
        writer
      );


      return new Promise(

        (resolve, reject) => {

          writer.on(

            "finish",

            () =>
              resolve(
                uploadPath
              )
          );

          writer.on(

            "error",

            reject
          );
        }
      );

    } catch (err) {

      console.error(err);

      return null;
    }
  };