import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface"
import httpStatus from "http-status-codes"
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";

const getTransactionId = ()=>{
    return `tran_${Date.now()}_${Math.floor(Math.random()*1000)}`
}

const createBooking = async(payload:Partial<IBooking>,userId:string)=>{
    const transactionId = getTransactionId();
    const user = await User.findById(userId);

    if(!user?.phone || !user?.address){
        throw new AppError(httpStatus.BAD_REQUEST,'Please update your profile to book a tour')
    }

    const tour = await Tour.findById(payload.tour).select("costFrom")

    if(!tour?.costFrom){
        throw new AppError(httpStatus.BAD_REQUEST,'Not tour found')
    }
    const amount = Number(tour.costFrom)* Number(payload.guestCount) 
    
    //create the booking
    const booking = await Booking.create({
        user:userId,
        status:BOOKING_STATUS.PENDING,
        ...payload,
    })
    //create payment for respective booking
    const payment = await Payment.create({
        booking:booking._id,
        status:PAYMENT_STATUS.UNPAID,
        transactionId:transactionId,
        amount:amount

    })
    //update the booking wiht payment information
    const updatedBooking = await Booking
    .findByIdAndUpdate(
        booking._id,
        {payment:payment._id},
        {new:true,runValidators:true}
    )
    .populate("user","name email")
    .populate("tour", "title costFrom")
    .populate("payment", "amount status")

    return updatedBooking;
}


export const bookingServices = {
    createBooking
 }