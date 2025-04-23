import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        // חובה - not null
        required: true,
        maxLength: 50
    },
  //מערך דירות
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})

export default mongoose.model('Category', categorySchema)