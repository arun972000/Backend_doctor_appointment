import mongoose from "mongoose"

const appointmentSchema =new mongoose.Schema({
    
    id:{
        type:String,
        required:true  
    },
    fullName:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    appointmentDate:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    consultingType:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:true
    },
    state:{
        type:String
    }

})

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },

});

export const User = mongoose.model('user', userSchema);

export const appoinment = mongoose.model("appoinment", appointmentSchema)



