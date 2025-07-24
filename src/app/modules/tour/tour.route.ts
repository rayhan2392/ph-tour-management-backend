import { Router } from "express";
import { tourControllers } from "./tour.controller";

const router = Router();

//tour types routes
router.post('/create-tour-type', tourControllers.createTourType)
router.get('/tour-types', tourControllers.getAllTourTypes)
router.patch('/tour-types/:id', tourControllers.updateTourType)
router.delete('/tour-types/:id', tourControllers.deleteTourType)





export const TourRoutes = router