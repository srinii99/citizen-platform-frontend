import {
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  uploadDocument,
} from "../../api/applicationApi";


const DocumentUpload = ({
  applicationId,
  documentName,
  onUploadSuccess,
}) => {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  const handleUpload =
    async () => {

      if (!file) {

        return toast.error(
          "Select a file"
        );
      }

      try {

        setLoading(true);

        const res =
          await uploadDocument(

            applicationId,

            file,

            documentName
          );

        toast.success(
          "Document uploaded"
        );

        setFile(null);

        if (
          onUploadSuccess
        ) {

          onUploadSuccess(
            res.data
          );
        }

      } catch (err) {

        console.error(err);

        toast.error(
          "Upload failed"
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <div className="border rounded-xl p-4 bg-white mt-4">

      <h3 className="font-semibold mb-3">

        {documentName}

      </h3>

      <input

        type="file"

        onChange={(e) =>

          setFile(
            e.target.files[0]
          )
        }

        className="mb-4"
      />

      <button

        onClick={handleUpload}

        disabled={loading}

        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >

        {

          loading
            ? "Uploading..."
            : "Upload"
        }

      </button>

    </div>
  );
};

export default DocumentUpload;