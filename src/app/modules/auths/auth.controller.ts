/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { authServices } from './auth.service';
import { setAuthCookie } from '../../utils/setCookie';
import AppError from '../../errorHelpers/AppError';
import { JwtPayload } from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const loginIngo = await authServices.credentialLogin(req.body)

  setAuthCookie(res, loginIngo)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successfull!!',
    data: loginIngo
  })

})



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "No refresh token recieved from cookies")
  }
   
  const tokenInfo = await authServices.getNewAccessToken(refreshToken as string)
  

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'New access token retrived successfully!!',
    data: tokenInfo
  })

})

const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  res.clearCookie('accessToken',{
    httpOnly:true,
    secure:false,
    sameSite:'lax'
  })

  res.clearCookie('refreshToken',{
    httpOnly:true,
    secure:false,
    sameSite:'lax'
  })

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User loged out successfully!!',
    data: null
  })

})

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const newPassword = req.body.newPassword
  const oldPassword = req.body.oldPassword
  const decodedToken = req.user

  await authServices.resetPassword(oldPassword,newPassword,decodedToken as JwtPayload)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password changed successfully!!',
    data: null
  })

})

export const authControllers = {
  credentialLogin,
  getNewAccessToken,
  logout,
  resetPassword
}