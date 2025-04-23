import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelpers.js";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//user register
export const registerController = async(req,res) => {
    try {
        const { name,email,password,address, lat, lng, role} = req.body 
        //validation
        if(!name){
            return res.status(400).send({message: 'Name is Required'})
        }
        if(!email){
            return res.status(400).send({message:'email is required'})
        }
        if(!address){
            return res.status(400).send({message: 'Address is required'})
        }
        if(role == 2){
            if(!lat){
                return res.status(400).send({message: 'Currency type is required'})
            }
            if(!lng){
                return res.status(400).send({message: 'Currency type is required'})
            }
        }

        //check user
        const existingUser = await userModel.findOne({email})
        //exisiting user
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Register please login',
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({name,email,address,password:hashedPassword, lat, lng, role}).save()
        res.status(201).send({
            success: true,
            message:'User Register successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
}