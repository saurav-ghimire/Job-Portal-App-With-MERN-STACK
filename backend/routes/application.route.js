import express from 'express'
import isAuthenticated from '../midllewares/isAuthenticated.js';
import { applyJob, getAllAppliedJobs, getApplicant, updateStatus } from '../controller/application.controller.js';

const applicationRouter = express.Router();


applicationRouter.post('/:id', isAuthenticated, applyJob);
applicationRouter.get('/appliedjobs', isAuthenticated, getAllAppliedJobs);
applicationRouter.get('/applicants/:id', isAuthenticated, getApplicant);
applicationRouter.post('/update/:id', isAuthenticated, updateStatus);



export default applicationRouter;