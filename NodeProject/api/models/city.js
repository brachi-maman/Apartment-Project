import mongoose from "mongoose";

const citySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

  //מערך דירות
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})

export default mongoose.model('City', citySchema)