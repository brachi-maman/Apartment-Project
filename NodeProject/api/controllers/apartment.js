import Apartment from "../models/apartment.js"
import Category from "../models/category.js"
import City from "../models/city.js"
import Advertist from "../models/advertiser.js"
// עובד
// פונקציה ליצירת דירה
export const create = async (req, res) => {
    try {
        const { name, category, city, advertist, address, countbed, price, add } = req.body

        // שמירת נתיב התמונה אם קיים
        const image = req.file ? `/uploads/${req.file.filename}` : null
        const newApartment = new Apartment({
            name,
            category,
            city,
            advertist,
            address,
            countbed,
            price,
            add,
            imge: image, // עדכון שדה התמונה
        });

        const savedApartment = await newApartment.save();

        // עדכון קטגוריה, עיר, ומפרסם עם הדירה החדשה
        const categoryUpdate = await Category.findByIdAndUpdate(
            savedApartment.category,
            { $push: { apartments: savedApartment._id } }
        );

        const cityUpdate = await City.findByIdAndUpdate(
            savedApartment.city,
            { $push: { apartments: savedApartment._id } }
        );

        const advertistUpdate = await Advertist.findByIdAndUpdate(
            savedApartment.advertist,
            { $push: { apartments: savedApartment._id } }
        );

        if (!categoryUpdate || !cityUpdate || !advertistUpdate) {
            return res
                .status(500)
                .send({ message: `Apartment created but failed to update related documents` });
        }

        return res.status(200).send({ message: "Apartment created successfully", savedApartment });
    } catch (err) {
        console.error("Error in creating apartment:", err);
        res.status(500).send({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params; // מזהה הדירה שצריך לעדכן
        const { advertistId } = req.params; // מזהה המפרסם

        // בדיקת אם המפרסם הוא זה שהגיש את הבקשה
        const previousApartment = await Apartment.findById(id);
        if (!previousApartment) {
            return res.status(404).send({ message: "Apartment not found" });
        }

        // בדיקת אם המפרסם שמבצע את העדכון הוא המפרסם של הדירה
        if (!previousApartment.advertist.equals(advertistId)) {
            return res.status(403).send({ message: "You cannot update an apartment that is not yours" });
        }


        const { name, category, city, advertist, address, countbed, price, add } = req.body;

        // שמירת נתיב התמונה אם קיים
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        // עדכון הדירה
        const updatedApartment = await Apartment.findByIdAndUpdate(
            id,
            {
                name,
                category,
                city,
                advertist,
                address,
                countbed,
                price,
                add,
                ...(image && { imge: image }), // עדכון שדה התמונה אם קיים
            },
            { new: true } // החזרת הדירה המעודכנת
        );

        if (!updatedApartment) {
            return res.status(500).send({ message: "Failed to update apartment" });
        }

        // הסרת הדירה מהקטגוריה, העיר והמפרסם הישנים
        await Category.findByIdAndUpdate(previousApartment.category, {
            $pull: { apartments: id },
        });
        await City.findByIdAndUpdate(previousApartment.city, {
            $pull: { apartments: id },
        });
        await Advertist.findByIdAndUpdate(previousApartment.advertist, {
            $pull: { apartments: id },
        });

        // הוספת הדירה לקטגוריה, העיר והמפרסם החדשים
        const categoryUpdate = await Category.findByIdAndUpdate(category, {
            $push: { apartments: updatedApartment._id },
        });

        const cityUpdate = await City.findByIdAndUpdate(city, {
            $push: { apartments: updatedApartment._id },
        });

        const advertistUpdate = await Advertist.findByIdAndUpdate(advertist, {
            $push: { apartments: updatedApartment._id },
        });

        // בדיקת הצלחה של עדכון המסמכים הקשורים
        if (!categoryUpdate || !cityUpdate || !advertistUpdate) {
            return res.status(500).send({
                message: "Apartment updated but failed to update related documents",
            });
        }

        // הצלחה
        return res.status(200).send({
            message: "Apartment updated successfully",
            updatedApartment,
        });
    } catch (err) {
        console.error("Error in updating apartment:", err);
        res.status(500).send({ error: err.message });
    }
};




// מחיקה
export const remove = (req, res) => {
    Apartment.findById(req.params.id).then(
        data => {
            if (data?.advertist == req.params.idAdvertist) {
                Apartment.findByIdAndDelete(req.params.id).where({ advertist: req.params.idAdvertist })
                    .then(async apartment => {
                        if (!apartment) {
                            return res.status(404).send({ error: `apartment not found!` })
                        }
                        let category = await Category.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } })
                        let city = await City.findByIdAndUpdate(apartment.city, { $pull: { apartments: apartment._id } })
                        let advertist = await Advertist.findByIdAndUpdate(apartment.advertist, { $pull: { apartments: apartment._id } })
                        if (!category || !city || !advertist) {
                            return res.status(200).send({ message: `delete apartment ${apartment._id} succeed! update category failed!` })
                        }
                        res.status(200).send({ message: `delete apartmente ${apartment._id} succeed!` })
                    })
                    .catch(err => {
                        res.status(500).send({ error: err.message })
                    })
            }
            else
                res.status(500).send({ error: "🙅🏼‍♂️🚫❌🏡🏠 אתה לא יכול למחוק דירה שלא שייכת לך" })
        }
    )

}
// שליפת כל הדירות-עובד
export const getAll = (req, res) => {
    Apartment.find()
        // בחר אילו שדות להציג
        .populate('category') // טעינת הקטגוריה
        .populate('city') // טעינת שם העיר בלבד
        .populate('advertist') // טעינת מפרסם
        .then(apartments => {
            res.status(200).send(apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// שליפת דירה לפי קוד-עובד
export const getById = (req, res) => {
    Apartment.findById(req.params.id).populate('category').populate('city')
        .populate('advertist')
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// שליפת דירות לפי קוד קטגוריה-עובד
export const getByCatgeory = (req, res) => {
    Apartment.find().where({ category: { $eq: req.params.id } }).populate('category').populate('city')
        .populate('advertist')
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// שליפת דירות לפי קוד עיר-עובד

export const getByCity = (req, res) => {
    Apartment.find().where({ city: { $eq: req.params.id } })
        .populate('category')
        .populate('city')
        .populate('advertist')
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//	שליפת דירות לפי כמות מיטות -עובד
export const getBybigbed = (req, res) => {
    Apartment.find()
        .where({
            countbed: { $gt: req.params.count }
        })
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//עובד-	שליפת דירות לפי כמות מיטות 
export const getBySmallbed = (req, res) => {
    Apartment.find()
        .where({
            countbed: { $lte: req.params.count }
        }).populate('category').populate('city')
        .populate('advertist')
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//	עובד-שליפת דירות לפי מחיר 
export const getByBigprice = (req, res) => {
    Apartment.find()
        .where({
            price: { $gt: req.params.count }
        }).populate('category').populate('city')
        .populate('advertist')
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//	עובד-שליפת דירות לפי מחיר 
export const getBySmallprice = (req, res) => {
    Apartment.find()
        .where({
            price: { $lte: req.params.count }
        }).populate('category').populate('city')
        .populate('advertist')
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// שליפת דירות לפי קוד מפרסם-עובד
export const getByAdvertiser = (req, res) => {
    Apartment.find().where({ advertist: { $eq: req.params.id } }).populate('category').populate('city')
        .populate('advertist')
        .then(apartment => {
            res.status(200).send(apartment)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}