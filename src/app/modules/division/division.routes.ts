import { Router } from "express";
import { divisionControllers } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDivisionZodSchema, updateDivisionZodSchema } from "./division.validation";
import { multerUpload } from "../../config/multer.config";

const router = Router()

router.post("/create",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    multerUpload.single("file"),
    validateRequest(createDivisionZodSchema),
    divisionControllers.createDivision)


router.get("/", divisionControllers.getAllDivisions)
router.get("/:slug", divisionControllers.getSingleDivision)
router.patch("/update/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
     multerUpload.single("file"),
    validateRequest(updateDivisionZodSchema),
    divisionControllers.updateDivision)
router.delete("/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    divisionControllers.deleteDivision)

export const DivisionRoutes = router;