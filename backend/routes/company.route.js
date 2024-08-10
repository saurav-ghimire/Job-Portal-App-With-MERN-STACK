import express from 'express'
import { deleteCompany, getCompany, getCompanyById, registerCompany, updateCompany } from '../controller/company.controller.js';
import isAuthenticated from '../midllewares/isAuthenticated.js';

const companyRouter = express.Router();

companyRouter.post('/register',isAuthenticated, registerCompany);
companyRouter.get('/companies',isAuthenticated, getCompany);
companyRouter.get('/company/:id',isAuthenticated, getCompanyById);
companyRouter.post('/company/:id',isAuthenticated, updateCompany);
companyRouter.delete('/company/:id',isAuthenticated, deleteCompany);

export default companyRouter;