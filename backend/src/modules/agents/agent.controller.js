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