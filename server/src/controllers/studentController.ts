import db from "../db";
import { NextFunction, Request, Response } from "express";

const studentController = {
  getAllAppointments: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const getAllAppointmentsQuery = `SELECT schedule.id, schedule.coach_id AS coachId, schedule.student_id AS studentId, schedule.start_time AS startTime, schedule.booking_status AS bookingStatus, coaches.name AS coachName, students.name AS studentName FROM schedule
      INNER JOIN coaches
      ON coaches.id = schedule.coach_id
      LEFT JOIN students ON students.id = schedule.student_id;`;
      const queryResp: any = await db.query(getAllAppointmentsQuery, []);
      return res.status(200).json({ data: queryResp?.rows });
    } catch (err) {
      console.log("err");
      next({
        log: "Error in studentController middleware",
        message: { err: `Get all appointments error: ${err.message}` },
      });
    }
  },
  bookAppointment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      const studentId = + req.params.studentid;
      const bookAppointmentQuery = `UPDATE schedule SET booking_status = 'booked', student_id = $1 WHERE id = $2;`;
      const params: Array<number> = [studentId, id];
      const queryResp: any = await db.query(bookAppointmentQuery, params);
      return res.status(200).json({ data: queryResp?.rows });
    } catch (err) {
      console.log("err");
      next({
        log: "Error in studentController middleware",
        message: { err: `Book appointment error: ${err.message}` },
      });
    }
  },
  getAllCoaches: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllCoachesQuery = `SELECT id, name FROM coaches;`;
      const queryResp: any = await db.query(getAllCoachesQuery, []);
      return res.status(200).json({ data: queryResp?.rows });
    } catch (err) {
      console.log("err");
      next({
        log: "Error in studentController middleware",
        message: { err: `Get all coaches error: ${err.message}` },
      });
    }
  },
};

export default studentController;
