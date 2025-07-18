import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const user = await userServices.createUser(req.body)
        res.status(httpStatus.CREATED).json({
            user,
            message: 'User created successfully'
        })
    } catch (err) {

        next(err)
    }
}

export const UserControllers = {
    createUser
}