import {  Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes'
import { divisionServices } from "./division.service"


const createDivision = catchAsync(async (req: Request, res: Response) => {

    const result = await divisionServices.createDivision(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Division created successfully',
        data: result
    })

})


export const divisionControllers = {
    createDivision
}