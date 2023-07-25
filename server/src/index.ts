import express, { Express, Request, Response, NextFunction } from "express";
import authController from "./controllers/authController";
import coachRouter from "./routes/coach";
import studentRouter from "./routes/student";


const app: Express = express();
const port = 8080; // default port to listen

interface newError extends Error {
  status?: number;
}

app.use(express.json());
app.use("/coach", coachRouter);
app.use("/student", studentRouter);

app.post("/login", authController.login);
app.post("/signup", authController.signup);

app.use((err: newError, req: Request, res: Response, next: NextFunction) => {
  let status = err.status ?? 500;
  return res.status(status).json(err.message);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
