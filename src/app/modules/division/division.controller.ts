import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes'
import { divisionServices } from "./division.service"
import { IDivision } from "./division.interface"


const createDivision = catchAsync(async (req: Request, res: Response) => {
         const payload:IDivision = {
            ...req.body,
            thumbnail:req.file?.path
         }
    const result = await divisionServices.createDivision(payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Division created successfully',
        data: result
    })

})


const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
       const query = req.query
    const result = await divisionServices.getAllDivisions(query as Record<string, string>)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Divisions retrived successfully',
        data: result
    })

})



const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug
    const result = await divisionServices.getSingleDivision(slug)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Division retrived successfully',
        data: result
    })

})


const updateDivision = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const payload:IDivision = {
        ...req.body,
        thumbnail:req.file?.path
    }
    const result = await divisionServices.updateDivision(id,payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Division updated successfully',
        data: result
    })

})

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await divisionServices.deleteDivision(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted",
        data: result,
    });
});

export const divisionControllers = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision
}