/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { otpServices } from "./otp.service";

const sendOtp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const { email, name } = req.body

    await otpServices.sendOtp(email, name)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Otp sent successfully!!',
        data: null
    })

})

const verifyOtp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp } = req.body
    await otpServices.verifyOtp(email, otp)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Otp verified successfully!!',
        data: null
    })

})
export const otpControllers = {
    sendOtp,
    verifyOtp
}