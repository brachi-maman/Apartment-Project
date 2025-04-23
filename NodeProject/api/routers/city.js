import express from 'express'
import { create, getAll } from '../controllers/city.js';
import {  checkToken, cityExists } from '../middlewares.js';

const router = express.Router()
router.get('/getAll', getAll)
router.post('/create',checkToken,create)
export default router;


