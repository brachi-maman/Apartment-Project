import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import advertiserRouter from './api/routers/advertiser.js'
import cityRouter from './api/routers/city.js'
import apartmentRouter from './api/routers/apartment.js'
import categoryRouter from './api/routers/category.js'


const app = express()
const port = 3000

// המנגנון שמכיר את משתני הסביבה לכל הפרויקט
dotenv.config();

app.use(bodyParser.json())
app.use(cors())

// mongoose.connect - פונקצית חיבור למסד הנתונים 
// uri - מחרוזת חיבור למסד הנתונים
// mongodb://localhost:27017/Articles_DB

// גישה למשתני סביבה
// process.env.PARAMETER_NAME
mongoose.connect(process.env.LOCAL_URI)
    .then(() => {
        console.log('connect to mongoDB! 👍😁');
    })
    .catch(err => {
        console.log({ error: err.message });
    })
app.use('/uploads', express.static('uploads'))
app.use('/advertiser', advertiserRouter)
app.use('/category', categoryRouter)
app.use('/city', cityRouter)
app.use('/apartment',apartmentRouter)
app.listen(port, () => {  
    console.log(`my application is listening on http://localhost:${port}`);
})