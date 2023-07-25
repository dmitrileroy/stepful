import db from "../db";
import { NextFunction, Request, Response } from "express";

const authController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
      const [username, password] = Buffer.from(b64auth, "base64")
        .toString()
        .split(":");
      let table = req.body.role === "student" ? "students" : "coaches";
      const loginQuery = `SELECT id, name FROM ${table} 
      WHERE email = $1 AND password = $2 AND role = $3;`;
      const params: Array<string> = [username, password, req.body.role];
      const queryResp: any = await db.query(loginQuery, params);
      if (queryResp?.rows[0]?.id) {
        return res.status(200).json({
          status: "ok",
          id: queryResp.rows[0].id,
          name: queryResp.rows[0].name,
        });
      } else {
        return res.status(401).json({ status: "unathorized" });
      }
    } catch (err) {
      console.log("err", err);
      next({
        log: "Error in login middleware",
        message: { err: `Login error: ${err.message}` },
      });
    }
  },
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let table = req.body.role === "student" ? "students" : "coaches";
      const signupQuery = `INSERT INTO ${table} (role, email, password, name, created_at) 
    VALUES ($1, $2, $3, $4, NOW())
    RETURNING id;`;
      const params: Array<string> = [
        req.body.role,
        req.body.email,
        req.body.password,
        req.body.name,
      ];

      const queryResp: any = await db.query(signupQuery, params);
      return res.status(200).json({ status: "ok", id: queryResp.rows[0].id });
    } catch (err) {
      console.log("err", err);
      next({
        log: "Error in signup middleware",
        message: { err: `Signup error: ${err.message}` },
      });
    }
  },
};

export default authController;
