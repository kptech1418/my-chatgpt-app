import express from "express";
import tasksController from './controller.js';

const router = express.Router();

router.get('/', tasksController.getTasks);
router.post('/', tasksController.createTask);
router.post('/:id/complete', tasksController.completeTask);

export default router;
