import express from "express"
import { getAdminJobs, getAllJobs, getJobsById, postJob } from "../controller/jobs.controller.js";
import isAuthenticated from "../midllewares/isAuthenticated.js";

const jobsRouter = express.Router();

jobsRouter.post('/add', isAuthenticated, postJob)
jobsRouter.get('/all', getAllJobs)
jobsRouter.get('/:id', getJobsById)
jobsRouter.get('/admin/jobs', isAuthenticated, getAdminJobs)
export default jobsRouter;