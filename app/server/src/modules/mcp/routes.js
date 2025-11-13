import express from "express";
import mcpController from './controller.js';

const router = express.Router();

router.post('/', mcpController.createMcpServer);

export default router;
