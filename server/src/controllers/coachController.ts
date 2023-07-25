import db from "../db";
import { NextFunction, Request, Response } from "express";

const coachController = {
  getAllAppointments: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = +req.params.id;
      const getAllAppointmentsQuery = `SELECT schedule.coach_id AS coachId, schedule.student_id AS studentId, schedule.start_time AS startTime, schedule.booking_status AS bookingStatus, coaches.name AS coachName, students.name AS studentName FROM schedule
      INNER JOIN coaches
      ON coaches.id = schedule.coach_id
      LEFT JOIN students ON students.id = schedule.student_id
      WHERE schedule.coach_id = $1;`;
      const params: Array<number> = [id];
      const queryResp: any = await db.query(getAllAppointmentsQuery, params);
      return res.status(200).json({ data: queryResp?.rows });
    } catch (err) {
      console.log("err", err);
      next({
        log: "Error in coachController middleware",
        message: { err: `Get all appointments error: ${err.message}` },
      });
    }
  },
  addAppointment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      const date = req.body.date;
      const addAppointmentQuery = `INSERT INTO schedule (coach_id, start_time, booking_status) VALUES ($1, $2, $3) RETURNING id;`;
      const params: Array<number | string | Date> = [id, date, "available"];
      const queryResp: any = await db.query(addAppointmentQuery, params);
      return res.status(200).json({ id: queryResp?.rows[0].id });
    } catch (err) {
      console.log("err", err);
      next({
        log: "Error in coachController middleware",
        message: { err: `Add appointment error: ${err.message}` },
      });
    }
  },
};

export default coachController;
