import express, { Router } from "express";
import coachController from "../controllers/coachController";
const router: Router = express.Router();

router.get("/:id/getAllAppointments", coachController.getAllAppointments)
router.post("/:id/addAppointment", coachController.addAppointment)


export default router;