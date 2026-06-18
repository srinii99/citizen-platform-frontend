import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getAdminUserById,
} from "../../api/adminUserApi";

import {
  verifyDocument,
} from "../../api/adminDocumentApi";

const AdminUserDetailPage =
  () => {

    const { id } =
      useParams();

    const [
      data,
      setData,
    ] = useState(null);

    const [
      loading,
      setLoading,
    ] = useState(true);

    useEffect(() => {

      fetchUser();

    }, [id]);

    const fetchUser =
      async () => {

        try {

          const response =
            await getAdminUserById(id);

          setData(response);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }
      };

       const handleVerifyDocument =
        async (
            applicationId,
            documentId
        ) => {

            try {

            await verifyDocument(

                applicationId,

                documentId,

                {
                verification_status:
                    "VERIFIED",

                verification_remarks:
                    "Verified by admin",
                }
            );

            alert(
                "Document verified successfully"
            );

            fetchUser();

            } catch (error) {

            console.error(error);

            alert(
                "Verification failed"
            );
            }
        };

    if (loading) {

      return (
        <div>
          Loading...
        </div>
      );
    }

    const handleRejectDocument =
        async (
            applicationId,
            documentId
        ) => {

            try {

            const remarks =
                prompt(
                "Enter rejection reason"
                );

            if (!remarks) {
                return;
            }

            await verifyDocument(

                applicationId,

                documentId,

                {
                verification_status:
                    "REJECTED",

                verification_remarks:
                    remarks,
                }
            );

            alert(
                "Document rejected"
            );

            fetchUser();

            } catch (error) {

            console.error(error);

            alert(
                "Rejection failed"
            );
            }
        };

 

    const {
      user,
      applications,
    } = data;

    return (

      <div className="p-6 space-y-6">
          

        <h1 className="text-2xl font-bold">
          Citizen Profile
        </h1>

        <div className="bg-white rounded-lg shadow p-6">

            <div className="flex justify-between items-start">

                <div>

                <h2 className="text-2xl font-bold">
                    {user.name || "Unnamed Citizen"}
                </h2>

                <p className="text-gray-600">
                    {user.mobile}
                </p>

                </div>

                <div>

                <span
                    className={
                    user.profile_completed
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                        : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                    }
                >
                    {user.profile_completed
                    ? "Profile Complete"
                    : "Profile Incomplete"}
                </span>

                </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                <div>

                <p className="text-gray-500 text-sm">
                    State
                </p>

                <p className="font-semibold">
                    {user.state || "-"}
                </p>

                </div>

                <div>

                <p className="text-gray-500 text-sm">
                    District
                </p>

                <p className="font-semibold">
                    {user.district || "-"}
                </p>

                </div>

                <div>

                <p className="text-gray-500 text-sm">
                    Occupation
                </p>

                <p className="font-semibold">
                    {user.occupation || "-"}
                </p>

                </div>

                <div>

                <p className="text-gray-500 text-sm">
                    Income
                </p>

                <p className="font-semibold">
                    ₹{user.income?.toLocaleString() || 0}
                </p>

                </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">

                <p className="text-gray-500 text-sm">
                    Applications
                </p>

                <p className="text-xl font-bold">
                    {applications.length}
                </p>

                </div>

                
                <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">

                <p className="text-gray-500 text-sm">
                    Language
                </p>

                <p className="text-xl font-bold">
                    {user.preferred_language}
                </p>

                </div>

                
                 <div className="bg-green-50 border border-green-100 p-4 rounded-xl">

                <p className="text-gray-500 text-sm">
                    WhatsApp
                </p>

                <p className="text-xl font-bold">
                    {user.whatsapp_opt_in
                    ? "Yes"
                    : "No"}
                </p>

                </div>

            </div>

        </div>

        {/* PROFILE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


      
                 <div
                className="
                bg-white
                rounded-xl
                shadow-sm
                border
                border-slate-200
                p-6
                ">

            <h2 className="text-lg font-semibold mb-5">
                Personal Information
            </h2>

            <div className="grid grid-cols-2 gap-5">

              
                <div>
                    <p className="text-xs text-gray-500">
                        Name
                    </p>

                    <p className="font-semibold">
                        {user.name}
                    </p>
                </div>

                 <div>
                    <p className="text-xs text-gray-500">
                        Mobile
                    </p>

                    <p className="font-semibold">
                        {user.mobile}
                    </p>
                </div>

                  <div>
                    <p className="text-xs text-gray-500">
                        Age
                    </p>

                    <p className="font-semibold">
                        {user.age}
                    </p>
                </div>

                  <div>
                    <p className="text-xs text-gray-500">
                        Gender
                    </p>

                    <p className="font-semibold">
                        {user.gender}
                    </p>
                </div>

                 <div>
                    <p className="text-xs text-gray-500">
                        State
                    </p>

                    <p className="font-semibold">
                        {user.state}
                    </p>
                </div>

                  <div>
                    <p className="text-xs text-gray-500">
                        District
                    </p>

                    <p className="font-semibold">
                        {user.district}
                    </p>
                </div>

                 <div>
                    <p className="text-xs text-gray-500">
                        Income
                    </p>

                    <p className="font-semibold">
                        ₹{user.income?.toLocaleString() || 0}
                    </p>
                </div>

                  <div>
                    <p className="text-xs text-gray-500">
                        Occupation
                    </p>

                    <p className="font-semibold">
                        {user.occupation}
                    </p>
                </div>


          

            </div>

            </div>

            {/* ELIGIBILITY */}

            <div className="bg-white p-4 rounded shadow">

            <h2 className="font-bold mb-5">
                Eligibility Profile
            </h2>

            <div className="grid grid-cols-2 gap-5">

        

                <div>
                    <p className="text-xs text-gray-500">
                        Farmer
                    </p>

                    <p className="font-semibold">
                        {user.is_farmer ? "Yes" : "No"}
                    </p>
                </div>

                 <div>
                    <p className="text-xs text-gray-500">
                        Student
                    </p>

                    <p className="font-semibold">
                        {user.is_student ? "Yes" : "No"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">
                        Disabled
                    </p>

                    <p className="font-semibold">
                        {user.is_disabled ? "Yes" : "No"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">
                        Marital Status
                    </p>

                    <p className="font-semibold">
                        {user.marital_status || "-"}
                    </p>
                </div>


                <div>
                    <p className="text-xs text-gray-500">
                        Caste
                    </p>

                    <p className="font-semibold">
                        {user.caste || "-"}
                    </p>
                </div>

               


            </div>

            </div>

            <div
                className="
                bg-white
                rounded-xl
                shadow-sm
                border
                border-slate-200
                p-6
                ">

                <h2 className="font-bold mb-5">
                    WhatsApp Information
                </h2>

                
                <div className="grid grid-cols-2 gap-5">

                    <div>
                        <p className="text-xs text-gray-500">
                        Preferred Language
                        </p>

                        <p className="font-semibold">
                        {user.preferred_language || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                        WhatsApp Opt-In
                        </p>

                        <p className="font-semibold">
                        {user.whatsapp_opt_in
                            ? "Yes"
                            : "No"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                        Current Flow State
                        </p>

                        <p className="font-semibold">
                        {user.whatsapp_flow_state || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                        Consent Accepted
                        </p>

                        <p className="font-semibold">
                        {user.consent?.accepted
                            ? "Yes"
                            : "No"}
                        </p>
                    </div>

                </div>


            </div>

            {/* APPLICATIONS */}

            
            <div
                className="
                bg-white
                rounded-xl
                shadow-sm
                border
                border-slate-200
                p-6
                ">

            <h2 className="text-lg font-semibold mb-5">
                Applications
            </h2>

            
            <table className="w-full border-collapse border">

                <thead>

                    <tr className="bg-gray-100">

                    <th className="border p-3 text-left">
                        Scheme
                    </th>

                    <th className="border p-3 text-left">
                        Status
                    </th>

                    <th className="border p-3 text-center">
                        Documents
                    </th>

                    </tr>

                </thead>

                <tbody>

                    {applications.map(
                    (application) => (

                        <tr
                        key={application._id}
                        >

                        <td className="border p-3">
                          <div className = "font-medium">
                            {application.scheme_id?.title}
                            
                          </div>
                        </td>

                        <td className="border p-3 text-center">

                            {application.status === "STARTED" && (
                                <span className="
                                bg-gray-100
                                text-gray-700
                                px-2
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                ">
                                STARTED
                                </span>
                            )}

                            {application.status === "SUBMITTED" && (
                                <span className="
                                bg-blue-100
                                text-blue-700
                                px-2
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                ">
                                SUBMITTED
                                </span>
                            )}

                            {application.status === "UNDER_REVIEW" && (
                                <span className="
                                bg-yellow-100
                                text-yellow-700
                                px-2
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                ">
                                UNDER REVIEW
                                </span>
                            )}

                            {application.status === "DOCUMENT_VERIFIED" && (
                                <span className="
                                bg-green-100
                                text-green-700
                                px-2
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                ">
                                DOCUMENT VERIFIED
                                </span>
                            )}

                            {application.status === "APPROVED" && (
                                <span className="
                                bg-green-100
                                text-green-700
                                px-2
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                ">
                                APPROVED
                                </span>
                            )}

                            {application.status === "REJECTED" && (
                                <span className="
                                bg-red-100
                                text-red-700
                                px-2
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                ">
                                REJECTED
                                </span>
                            )}

                        </td>

                        

                        <td className="border p-3 text-center">
                            <span
                                className="
                                    bg-slate-100
                                    text-slate-700
                                    px-2
                                    py-1
                                    rounded-full
                                    text-xs
                                    font-medium
                                    "
                                >
                                       {application.documents?.length || 0} Docs
                                </span>

                         
                        </td>

                        </tr>

                    )
                    )}

                </tbody>

                </table>


            </div>
        </div>

       
             <div
                className="
                bg-white
                rounded-xl
                shadow-sm
                border
                border-slate-200
                p-6
                ">

         
            <h2 className="text-lg font-semibold mb-5">
                Uploaded Documents
            </h2>

            {applications.map((application) => (

                <div
                key={application._id}
                className="mb-6"
                >

                <h3 className="font-semibold mb-2">
                    {application.scheme_id?.title}
                </h3>

                {application.documents?.length === 0 ? (

                    <p className="text-gray-500">
                    No documents uploaded
                    </p>

                ) : (

                    <table className="w-full border-collapse border mb-4">

                    <thead>

                        <tr className="bg-gray-100">

                        <th className="border p-2 text-left">
                            Document
                        </th>

                        <th className="border p-2 text-left">
                            Status
                        </th>

                        <th className="border p-2 text-center">
                            Action
                        </th>

                        </tr>

                    </thead>

                    <tbody>

                        {application.documents.map(
                        (doc) => (

                            <tr key={doc._id}
                                className="hover:bg-slate-50 transition">
                            

                            <td className="border p-2">
                                {doc.document_name}
                            </td>

                            <td className="border p-2">

                                {doc.verification_status === "PENDING" && (
                                    <span className="
                                    bg-yellow-100
                                    text-yellow-700
                                    px-2
                                    py-1
                                    rounded-full
                                    text-sm
                                    ">
                                    PENDING
                                    </span>
                                )}

                                {doc.verification_status === "VERIFIED" && (
                                    <span className="
                                    bg-green-100
                                    text-green-700
                                    px-2
                                    py-1
                                    rounded-full
                                    text-sm
                                    ">
                                    VERIFIED
                                    </span>
                                )}

                                {doc.verification_status === "REJECTED" && (
                                    <span className="
                                    bg-red-100
                                    text-red-700
                                    px-2
                                    py-1
                                    rounded-full
                                    text-sm
                                    ">
                                    REJECTED
                                    </span>
                                )}

                                {doc.verification_remarks && (

                                    <div className="
                                    text-xs
                                    text-gray-500
                                    mt-2
                                    ">
                                    {doc.verification_remarks}
                                    </div>

                                )}

                                </td>

                     

                          

                           <td className="border p-2 text-center">

                                <div className="flex justify-center gap-2">

                                    <a
                                    href={doc.file_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                        text-blue-600
                                        hover:underline
                                    "
                                    >
                                    View
                                    </a>

                                    {doc.verification_status === "PENDING" && (
                                    <button
                                        onClick={() =>
                                        handleVerifyDocument(
                                            application._id,
                                            doc._id
                                        )
                                        }
                                        className="
                                        bg-green-600
                                        text-white
                                        px-2
                                        py-1
                                        rounded
                                        text-sm
                                        "
                                    >
                                        Approve
                                    </button>
                                    )}

                                    {doc.verification_status ===
                                        "PENDING" && (

                                        <button
                                            onClick={() =>
                                            handleRejectDocument(
                                                application._id,
                                                doc._id
                                            )
                                            }
                                            className="
                                            bg-red-600
                                            text-white
                                            px-2
                                            py-1
                                            rounded
                                            text-sm
                                            "
                                        >
                                            Reject
                                        </button>

                                        )}

                                </div>

                            </td>
     

                          

                            </tr>

                        )
                        )}

                    </tbody>

                    </table>

                )}

                </div>

            ))}

            </div>
        
                 <div
                className="
                bg-white
                rounded-xl
                shadow-sm
                border
                border-slate-200
                p-6
                ">

                <h2 className="text-lg font-semibold mb-5">
                    Application Timeline
                </h2>

                {applications.map((application) => (

                    <div
                    key={application._id}
                    className="mb-6"
                    >

                    <h3 className="font-semibold mb-3">
                        {application.scheme_id?.title}
                    </h3>

                    <div className="space-y-3">

                        {application.status_history?.map(
                        (item, index) => (

                            <div
                            key={index}
                            className="
                                border-l-4
                                border-blue-500
                                pl-4
                            "
                            >

                            <div>

                                {item.status === "STARTED" && (
                                    <span className="
                                    bg-gray-100
                                    text-gray-700
                                    px-2 py-1
                                    rounded-full
                                    text-xs
                                    font-medium
                                    ">
                                    STARTED
                                    </span>
                                )}

                                {item.status === "SUBMITTED" && (
                                    <span className="
                                    bg-blue-100
                                    text-blue-700
                                    px-2 py-1
                                    rounded-full
                                    text-xs
                                    font-medium
                                    ">
                                    SUBMITTED
                                    </span>
                                )}

                                {item.status === "UNDER_REVIEW" && (
                                    <span className="
                                    bg-yellow-100
                                    text-yellow-700
                                    px-2 py-1
                                    rounded-full
                                    text-xs
                                    font-medium
                                    ">
                                    UNDER REVIEW
                                    </span>
                                )}

                                {item.status === "DOCUMENT_VERIFIED" && (
                                    <span className="
                                    bg-green-100
                                    text-green-700
                                    px-2 py-1
                                    rounded-full
                                    text-xs
                                    font-medium
                                    ">
                                    DOCUMENT VERIFIED
                                    </span>
                                )}

                                </div>

                        

                            <div className="text-sm text-gray-500">
                                {new Date(
                                item.updated_at
                                ).toLocaleDateString()}
                            </div>

                            {item.admin_remarks && (
                                <div className="text-sm">
                                {item.admin_remarks}
                                </div>
                            )}

                            </div>

                        )
                        )}

                    </div>

                    </div>

                ))}

                </div>

      </div>
    );
  };

export default
  AdminUserDetailPage;