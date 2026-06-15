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

export const getAgencyDashboard =
  async (req, res) => {
    try {

      const dashboard =
        await agencyService.getAgencyDashboard(
          req.params.id
        );

      return res.json({
        success: true,
        data: dashboard,
      });

    } catch (error) {

      console.error(
        "Agency Dashboard Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch agency dashboard",
      });
    }
  };

export const getAgencyAgents =
  async (req, res) => {

    try {

      const agents =
        await agencyService.getAgencyAgents(
          req.params.id
        );

      return res.json({
        success: true,
        data: agents,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch agents",
      });
    }
  };

export const getAgencyApplications =
  async (req, res) => {

    try {

      const applications =
        await agencyService.getAgencyApplications(
          req.params.id
        );

      return res.json({
        success: true,
        data: applications,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch applications",
      });
    }
  };

export const assignAgent =
  async (req, res) => {

    try {

      const {
        applicationId,
        agentId,
      } = req.body;

      const application =
        await agencyService.assignAgent(
          applicationId,
          agentId
        );

      return res.json({
        success: true,
        data: application,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

export const assignApplicationToAgency =
  async (req, res) => {

    try {

      const {
        applicationId,
        agencyId,
      } = req.body;

      const application =
        await agencyService.assignApplicationToAgency(
          applicationId,
          agencyId
        );

      return res.json({
        success: true,
        data: application,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };