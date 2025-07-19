import  httpStatus  from 'http-status-codes';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { authServices } from './auth.service';

 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginIngo = await authServices.credentialLogin(req.body)
   
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Login successfull!!',
        data: loginIngo
    })

})


export const authControllers= {
  credentialLogin
}