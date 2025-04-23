import City from "../models/city.js"

export const getAll = (req, res) => {
    City.find()
        .then(city => {
            res.status(200).send(city)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })}
    export const create = async (req, res) => {
        const { name } = req.body;
    
        try {
            // בודקים אם העיר כבר קיימת
            const existingCity = await City.findOne({ name});
            if (existingCity) {
                return res.status(400).send({ error: `The city ${name} already exists!` });
            }
                const newCity = new City({
                name,
                apartments: [] // או כל מאפיינים נוספים שברצונך להוסיף
            });
    
            // שומרים את העיר החדשה בבסיס הנתונים
            const savedCity = await newCity.save();
            return res.status(200).send(savedCity);
        } 
            catch (err) {
            console.error("Error creating city:", err);
            return res.status(500).send({ error: "There was an error creating the city" });
        }}