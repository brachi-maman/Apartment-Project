import express from 'express'
import { create, remove, update, getAll, getById, getByCatgeory,getByCity, getBybigbed,
    getBySmallbed,
    getBySmallprice,
    getByBigprice,
    getByAdvertiser
} from '../controllers/apartment.js';
import upload, {  checkToken } from '../middlewares.js';

const router = express.Router()
router.delete('/remove/:idAdvertist/:id',checkToken,remove)
router.post('/create' ,upload.single('img'),checkToken, create)
router.put('/update/:advertistId/:id', upload.single('img'),checkToken, update)
router.get('/getAll',getAll)
router.get('/getbyid/:id',getById)
router.get('/getByCatgeory/:id', getByCatgeory)
router.get('/getByCity/:id', getByCity)
router.get('/getByAdvertiser/:id', getByAdvertiser)
router.get('/getBybigbed/:count', getBybigbed)
router.get('/getBySmallbed/:count', getBySmallbed)
router.get('/getBybigprice/:count', getByBigprice)
router.get('/getBySmallprice/:count', getBySmallprice)
export default router;