import express from "express"
import { getAllJobs, postJob } from "../controller/jobs.controller.js";
import isAuthenticated from "../midllewares/isAuthenticated.js";

const jobsRouter = express.Router();

jobsRouter.post('/add', isAuthenticated, postJob)
jobsRouter.get('/all', getAllJobs)
export default jobsRouter;