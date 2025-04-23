import express from 'express'
import { getAll, Create } from '../controllers/category.js';
// import { categoryExists } from '../middlewares.js';
import { checkToken } from '../middlewares.js';

const router = express.Router()
router.get('/getAll', getAll)
router.post('/create', checkToken, Create)
//router.post('/categorycrate',create)
export default router;
