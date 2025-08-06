/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { authServices } from './auth.service';
import { setAuthCookie } from '../../utils/setCookie';
import AppError from '../../errorHelpers/AppError';
import { JwtPayload } from 'jsonwebtoken';
import { createUserTokens } from '../../utils/userTokens';
import { envVars } from '../../config/env';
import passport from 'passport';


//credential authentication, mannual process
// const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

//   const loginIngo = await authServices.credentialLogin(req.body)

//   setAuthCookie(res, loginIngo)

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Login successfull!!',
//     data: loginIngo
//   })

// })

//credential authentication with passport.js
const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

 
  passport.authenticate('local', async (err: any, user: any, info: any) => {
    if (err) {
      return next(new AppError(401, err))
    }


    if (!user) {
      return next(new AppError(401, info.message))
    }

    const userTokens = await createUserTokens(user)
    const { password: pass, ...rest } = user.toObject()

    setAuthCookie(res, userTokens)

    sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Login successfull!!',
    data: {
      accessToken: userTokens.accessToken,
      refreshToken: userTokens.refreshToken,
      user: rest

    }
  })

  })(req,res,next)



  

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

  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  })

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  })

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User loged out successfully!!',
    data: null
  })

})

const changePassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const newPassword = req.body.newPassword
  const oldPassword = req.body.oldPassword
  const decodedToken = req.user

  await authServices.changePassword(oldPassword, newPassword, decodedToken as JwtPayload)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password changed successfully!!',
    data: null
  })

})


const setPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const decodedToken = req.user as JwtPayload
  const {password}= req.body

  await authServices.setPassword(decodedToken.userId,password)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password changed successfully!!',
    data: null
  })

})

const forgotPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const {email} = req.body
  await authServices.forgotPassword(email)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Email sent successfully!!',
    data: null
  })

})

const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  let redirectTo = req.query.state ? req.query.state as string : ""

  if (redirectTo.startsWith("/")) {
    redirectTo = redirectTo.slice(1)
  }

  // /booking => booking , => "/" => ""
  const user = req.user;

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
  }

  const tokenInfo = createUserTokens(user)

  setAuthCookie(res, tokenInfo)



  res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})

export const authControllers = {
  credentialLogin,
  getNewAccessToken,
  logout,
  setPassword,
  googleCallbackController,
  changePassword,
  forgotPassword
}