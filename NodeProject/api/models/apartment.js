import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    advertist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advertist',
        required: true
    },
    address:String,
    countbed:Number,
    price:Number,
    add:String,//תוספים
    imge:String
})
export default mongoose.model('Apartment', apartmentSchema)