import validator from "validator";
//import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// A JSON web token(JWT) is JSON Object which is used to securely transfer information over the web(between two parties).
// It can be used for an authentication system and can also be used for information exchange.
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);//header+payload,secret
}

//route for user login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user=await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"user doesn't exists"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(isMatch){
            const token=createToken(user._id);
            res.json({success:true,token});
        }else{
            res.json({success:false,message:'Invalid credentials'});
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//route for user register
const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        //checking user already exists or not
        
        const exists= await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"});
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter a valid email"});
        }

        if(password.length < 8){
            return res.json({success:false,message:"please enter a strong password"});
        }

        //hashing user password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user=await newUser.save();

        const token=createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

//route for admin login
const adminLogin = async (req,res) => {
    try {
        const {email,password} = req.body;
        console.log('Input Email:', email);
        console.log('Input Password:', password);

        console.log('Env Email:', process.env.ADMIN_EMAIL);
        console.log('Env Password:', process.env.ADMIN_PASSWORD);

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            console.log()
            res.json({success:false,message:"invalid credentials"});
        }

    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export {loginUser,registerUser,adminLogin}