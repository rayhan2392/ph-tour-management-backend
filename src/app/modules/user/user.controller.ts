import { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes"

const createUser = async(req:Request,res:Response)=>{
    
try {
   const {name,email}= req.body
   const user = await User.create({
    name,
    email
   })
   res.status(httpStatus.CREATED).json({
    user,
    message:'User created successfully'
   })
} catch (error) {
    console.log(error)
    res.status(httpStatus.BAD_REQUEST).json({
        message:`something went wrong ${error}`,
        error
    })
}
}

export const UserControllers= {
   createUser
}