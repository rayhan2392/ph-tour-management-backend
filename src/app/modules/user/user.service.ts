import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcrypt from 'bcrypt'
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";


//create a user
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload

  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already Exist')
  }

  const hashedPasword = await bcrypt.hash(password as string, 10)

  const authProvider: IAuthProvider = {
    provider: 'credential',
    providerId: email as string
  }

  const user = await User.create({
    email,
    password: hashedPasword,
    auths: [authProvider],
    ...rest
  })
  return user;
}

//get all users
const getAllUsers = async () => {
  const users = await User.find({})
  const totalUser = await User.countDocuments()
  return {
    data: users,
    meta: {
      total: totalUser
    }
  }
}

//update a user
const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  //prevent user and guide to update their role
  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized')
    }
    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN)
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized')
  }
  //prevent user and guide to update their status
  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, envVars.BCRYPT_SALT_ROUND)
  }

  const updatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

  return updatedUser;
}

export const userServices = {
  createUser,
  getAllUsers,
  updateUser
}