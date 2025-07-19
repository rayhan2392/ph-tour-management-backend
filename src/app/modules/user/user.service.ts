import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcrypt from 'bcrypt'

const createUser = async (payload: Partial<IUser>) => {
  const { email,password, ...rest } = payload

  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already Exist')
  }

  const hashedPasword = await bcrypt.hash(password as string,10)

  const authProvider: IAuthProvider = {
    provider: 'credential',
    providerId: email as string
  }

  const user = await User.create({
    email,
    password:hashedPasword,
    auths:[authProvider],
    ...rest
  })
  return user;
}


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

export const userServices = {
  createUser,
  getAllUsers
}