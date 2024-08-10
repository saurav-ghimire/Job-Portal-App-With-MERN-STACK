import express from "express"
import { postJob } from "../controller/jobs.controller.js";
import isAuthenticated from "../midllewares/isAuthenticated.js";

const jobsRouter = express.Router();

jobsRouter.post('/add', isAuthenticated, postJob)

export default jobsRouter;