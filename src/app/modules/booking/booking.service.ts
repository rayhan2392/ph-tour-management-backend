/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface"
import httpStatus from "http-status-codes"
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sssCommerz.service";

const getTransactionId = () => {
    return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`
}

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    const transactionId = getTransactionId();

    const session = await Booking.startSession();
    session.startTransaction()

    try {
        const user = await User.findById(userId);

        if (!user?.phone || !user?.address) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Please update your profile to book a tour')
        }

        const tour = await Tour.findById(payload.tour).select("costFrom")

        if (!tour?.costFrom) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Not tour found')
        }
        const amount = Number(tour.costFrom) * Number(payload.guestCount)

        //create the booking
        const booking = await Booking.create([{
            user: userId,
            status: BOOKING_STATUS.PENDING,
            ...payload,
        }], { session })
        //create payment for respective booking
        const payment = await Payment.create([{
            booking: booking[0]._id,
            status: PAYMENT_STATUS.UNPAID,
            transactionId: transactionId,
            amount: amount

        }], { session })
        //update the booking wiht payment information
        const updatedBooking = await Booking
            .findByIdAndUpdate(
                booking[0]._id,
                { payment: payment[0]._id },
                { new: true, runValidators: true, session }
            )
            .populate("user", "name email address phone")
            .populate("tour", "title costFrom")
            .populate("payment", "amount status")

        //initiate payment with ssl commerz

        const userAddress = (updatedBooking?.user as any).address
        const userEmail = (updatedBooking?.user as any).email
        const userPhone = (updatedBooking?.user as any).phone
        const userName = (updatedBooking?.user as any).name

        const sslPayload: ISSLCommerz = {
            address: userAddress,
            email: userEmail,
            phoneNumber: userPhone,
            transactionId: transactionId,
            amount: amount,
            name: userName

        }

        const sslPayment = await SSLService.sslPaymentInit(sslPayload)
        console.log(sslPayment)

        await session.commitTransaction()
        session.endSession()

        return {
            paymentURL: sslPayment.GatewayPageURL,
            booking: updatedBooking

        }

    } catch (error) {
        await session.abortTransaction() //rollback
        session.endSession();
        throw error
    }
}


export const bookingServices = {
    createBooking
}