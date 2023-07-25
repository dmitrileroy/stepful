import express, { Router } from "express";
import studentController from "../controllers/studentController";
const router: Router = express.Router();

router.get("/getAllAppointments", studentController.getAllAppointments);
router.patch("/:studentid/appointments/:id/bookAppointment", studentController.bookAppointment);
router.get("/getAllCoaches", studentController.getAllCoaches);

export default router;
