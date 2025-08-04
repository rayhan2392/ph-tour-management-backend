import { Router } from "express";
import { tourControllers } from "./tour.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createTourTypeZodSchema, createTourZodSchema, updateTourTypeZodSchema, updateTourZodSchema } from "./tour.validate";
import { multerUpload } from "../../config/multer.config";

const router = Router();

//tour types routes
router.post('/create-tour-type',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(createTourTypeZodSchema),
    tourControllers.createTourType)

router.get('/tour-types', tourControllers.getAllTourTypes)

router.patch('/tour-types/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(updateTourTypeZodSchema),
    tourControllers.updateTourType)

router.delete('/tour-types/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    tourControllers.deleteTourType)

//tour routes

router.get('/',tourControllers.getAllTours)

router.post('/create',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.array("files"),
    validateRequest(createTourZodSchema),
    tourControllers.createTour)
router.patch('/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(updateTourZodSchema),
    tourControllers.updateTour)
router.delete('/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    tourControllers.deleteTour)





export const TourRoutes = router