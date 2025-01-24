import mongoose from "mongoose"

//Mongoose will, by default, "minimize" schemas by removing empty objects.
//This behavior can be overridden by setting minimize option to false. It will then store empty objects.

const userSchema=new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    cartData: {type:Object, default:{}}
},{minimize:false})

const userModel= mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;