import Category from "../models/category.js"
import Apartment from "../models/apartment.js"
//עובד
export const getAll = (req, res) => {
    Category.find()
        .then(category => {
            res.status(200).send(category)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const Create = (req, res) => {
    const { name } = req.body;

    // בודקים אם הקטגוריה כבר קיימת
    Category.find()
        .where({ name: { $eq: name } })
        .then(categories => {
            if (categories.length > 0) {
                return res.status(400).send({ error: `Category ${name} already exists!` });
            }

            // אם הקטגוריה לא קיימת, יוצרים קטגוריה חדשה
            const newCategory = new Category({
                name,
                apartments: []  // או כל מאפיינים נוספים שברצונך להוסיף
            });

            // שומרים את הקטגוריה החדשה בבסיס הנתונים
            newCategory.save()
                .then(savedCategory => {
                    // מחזירים את הקטגוריה החדשה עם כל המאפיינים שלה
                    return res.status(200).send(savedCategory);
                })
                .catch(err => {
                    console.log("Error saving category:", err);
                    return res.status(500).send({ error: "There was an error saving the category" });
                });
        })
        .catch(err => {
            console.log("Error checking if category exists:", err);
            return res.status(500).send({ error: "There was an error checking if the category exists" });
        });
};