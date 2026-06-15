import * as agentService
from "./agent.service.js";

export const createAgent =
  async (req, res) => {

    try {

      const agent =
        await agentService.createAgent(
          req.body
        );

      return res.status(201).json({
        success: true,
        data: agent,
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

export const getAgents =
  async (req, res) => {

    try {

      const agents =
        await agentService.getAgents();

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

export const getAgentById =
  async (req, res) => {

    try {

      const agent =
        await agentService.getAgentById(
          req.params.id
        );

      return res.json({
        success: true,
        data: agent,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch agent",
      });
    }
  };

export const updateAgent =
  async (req, res) => {

    try {

      const agent =
        await agentService.updateAgent(
          req.params.id,
          req.body
        );

      return res.json({
        success: true,
        data: agent,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to update agent",
      });
    }
  };

export const deactivateAgent =
  async (req, res) => {

    try {

      const agent =
        await agentService.deactivateAgent(
          req.params.id
        );

      return res.json({
        success: true,
        data: agent,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to deactivate agent",
      });
    }
  };

export const getAgentDashboard =
  async (req, res) => {

    try {

      const dashboard =
        await agentService.getAgentDashboard(
          req.params.id
        );

      return res.json({
        success: true,
        data: dashboard,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch dashboard",
      });
    }
  };

export const getAgentApplications =
  async (req, res) => {

    try {

      const applications =
        await agentService.getAgentApplications(
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

export const addAgentRemark =
  async (req, res) => {

    try {

      const {
        agentId,
        remark,
      } = req.body;

      const application =
        await agentService.addAgentRemark(
          req.params.id,
          agentId,
          remark
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

export const updateApplicationStatus =
  async (req, res) => {

    try {

      const {
        status,
        remarks,
      } = req.body;

      const application =
        await agentService.updateApplicationStatus(
          req.params.id,
          status,
          remarks
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