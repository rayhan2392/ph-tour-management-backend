import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { tourServices } from './tour.service';
import { sendResponse } from '../../utils/sendResponse';
import { ITour } from './tour.interface';

//tour functions

const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await tourServices.getAllTours(
    query as Record<string, string>
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tours retrived successfully',
    data: result.data,
    meta: result.meta,
  });
});

const createTour = catchAsync(async (req: Request, res: Response) => {
  const payload: ITour = {
    ...req.body,
    images: (req.files as Express.Multer.File[]).map(file => file.path),
  };

  const result = await tourServices.createTour(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Tour created successfully',
    data: result,
  });
});

const updateTour = catchAsync(async (req: Request, res: Response) => {
  const payload: ITour = {
    ...req.body,
    images: (req.files as Express.Multer.File[]).map(file => file.path),
  };

  const result = await tourServices.updateTour(req.params.id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tour updated successfully',
    data: result,
  });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await tourServices.deleteTour(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tour deleted successfully',
    data: result,
  });
});

//tour type functions
const createTourType = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await tourServices.createTourType(payload);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Tour type created successfully',
    data: result,
  });
});

const getAllTourTypes = catchAsync(async (req: Request, res: Response) => {
  const result = await tourServices.getAllTourTypes();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tour types retrieved successfully',
    data: result,
  });
});

const updateTourType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await tourServices.updateTourType(id, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tour type updated successfully',
    data: result,
  });
});

const deleteTourType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await tourServices.deleteTourType(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tour type deleted successfully',
    data: result,
  });
});

export const tourControllers = {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
};
