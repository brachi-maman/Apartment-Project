
import jwt from "jsonwebtoken"
import Category from "./models/category.js"
import City from "./models/city.js"
import multer from 'multer'
import path from 'path';
//שלווום

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/') // תיקיית Uploads שמה תישמר התמונה
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) // שמו של הקובץ
    }
})

export const checkToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader || !tokenHeader.includes(' ')) {
        return res.status(401).send({ error: 'Authorization failed1!🔌⚡🔌⚡' });
    }

    const token = tokenHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: 'Authorization failed2!🔌🪫⚡' });
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            return res.status(401).send({ error: 'Authentication failed3!🪫🪫🪫' });
        }
        // שמירת המידע המפוענח בבקשה
        req.user = decoded;
        next();
    });
};

export const categoryExists = (req, res, next) => {
    const { codeCategory } = req.body
    if (!codeCategory && req.method == 'PATCH') {
        return next()
    }
    Category.findById(codeCategory)
        .then(category => {
            next()
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}

export const cityExists = (req, res, next) => {
    const { codeCity } = req.body
    if (!codeCity && req.method == 'PATCH') {
        return next()
    }
    City.findById(codeCity)
        .then(city => {
            next()
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}


const upload = multer({
    // dest: 'uploads/',
    storage,
    //הגדרות לגבי הקובץ המועלה
    limits: {
        //2MB הקובץ יכול להיות עד גודל של 
        fileSize: 1024 * 1024 * 2
    }
})

export default upload


