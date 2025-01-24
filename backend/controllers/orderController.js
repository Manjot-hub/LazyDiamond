import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing orders using COD method
const placeOrder = async (req,res) => {
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order placed"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//all orders data for admin panel
const allOrders = async (req,res) => {

}

//user order data for frontend
const userOrders = async (req,res) => {
    try {
        const {userId} = req.body

        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//update order status from admin panel
const updateStatus = async (req,res) => {

}

export {
    placeOrder,allOrders,userOrders,updateStatus
}