import mongoose from "mongoose";

const advertistSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
         match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/
    },
    password: {
        type: String,
        required: true
    },
    phon:{
      type:String,
      required: true,
      //-ביטוי נכון?
      match:/[0-9]{1,10}$/
     } ,
     anotherPhon:{
        type:String,
        required: false,
        //-ביטוי נכון?
        match:/[0-9]{1,10}$/
     },
     //מערך דירות
    apartments: [{
        required: false,
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
    
})

export default mongoose.model('Advertist',advertistSchema ) 