import express from "express";
import flightController from './controller.js';

const router = express.Router();

router.post('/', flightController.flightSearch);

export default router;
