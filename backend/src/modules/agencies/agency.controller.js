import * as agencyService from "./agency.service.js";

export const createAgency = async (
  req,
  res
) => {
  try {
    const agency =
      await agencyService.createAgency(
        req.body
      );

    return res.status(201).json({
      success: true,
      data: agency,
    });
  } catch (error) {
    console.error(
        "Create Agency Error:",
        error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAgencies = async (
  req,
  res
) => {
  try {
    const agencies =
      await agencyService.getAgencies();

    return res.json({
      success: true,
      data: agencies,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch agencies",
    });
  }
};

export const getAgencyById = async (
  req,
  res
) => {
  try {
    const agency =
      await agencyService.getAgencyById(
        req.params.id
      );

    return res.json({
      success: true,
      data: agency,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch agency",
    });
  }
};

export const updateAgency = async (
  req,
  res
) => {
  try {
    const agency =
      await agencyService.updateAgency(
        req.params.id,
        req.body
      );

    return res.json({
      success: true,
      data: agency,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to update agency",
    });
  }
};

export const deactivateAgency =
  async (req, res) => {
    try {
      const agency =
        await agencyService.deactivateAgency(
          req.params.id
        );

      return res.json({
        success: true,
        data: agency,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to deactivate agency",
      });
    }
  };