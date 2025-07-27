import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingServices } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../../utils/sendResponse";

const createBooking = catchAsync(async(req:Request,res:Response)=>{
    const decodedToken = req.user as JwtPayload
    const booking = await bookingServices.createBooking(req.body,decodedToken.userId)

   sendResponse(res,{
    statusCode:201,
    success:true,
     data:booking,
     message:'booking created successfully'
   })


})


export const bookingControllers = {
    createBooking
}