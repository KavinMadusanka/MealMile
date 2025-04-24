import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
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

/** ======================================================================================== */

//user Loging part
export const loginController = async (req,res) => {
    try {
        const{email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        if(email==='' || password===''){
            return res.status(404).send({
                success:false,
                message:'You are not fill Username or Password'
            })
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Emails is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }

        //create token
        const token = JWT.sign({ id: user._id}, process.env.JWT_SECRET , {expiresIn: '1d',});
        res.status(200).cookie('access_token',token,{
            httpOnly: true,
        }).send({
            success:true, 
            message:'Login successfully',
            user:{
                name:user.name,
                email:user.email,
                address: user.address,
            },
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
};

/** ======================================================================================== */

export const Signout = (req, res) => {
    try {
        res.clearCookie('access_token').status(200).send({
            success:true,
            message: 'Signout Successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error occure in signout function'
        })
    }
}

/** ======================================================================================== */

export const userDelete = async (req,res) => {
    if( req.user.id !== req.params.userId){
        return res.status(403).send({success: false, message: 'You are not allowed to delete this account'});
    }
    try {
        await userModel.findByIdAndDelete(req.params.userId);
        res.status(200).send({
            success:true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'User delete Faild'
        })
    }
}

/** ======================================================================================== */

//get all controller
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find();

        res.status(200).send({
            success: true,
            message: 'All users getting successfully',
            allUsers,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching all users',
            error
        })
    }
}