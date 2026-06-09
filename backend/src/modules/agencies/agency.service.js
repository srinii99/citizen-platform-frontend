import Agency from "./agency.model.js";

export const createAgency = async (
  payload
) => {

  const count =
    await Agency.countDocuments();

  const agencyCode =
    `AGN${String(
      count + 1
    ).padStart(3, "0")}`;

  return Agency.create({
    ...payload,
    agency_code: agencyCode,
  });
};

export const getAgencies = async () => {
  return Agency.find();
};

export const getAgencyById = async (
  id
) => {
  return Agency.findById(id);
};

export const updateAgency = async (
  id,
  payload
) => {
  return Agency.findByIdAndUpdate(
    id,
    payload,
    {
      returnDocument: "after",
    }
  );
};

export const deactivateAgency =
  async (id) => {
    return Agency.findByIdAndUpdate(
      id,
      {
        active: false,
      },
      {
        returnDocument: "after",
      }
    );
  };