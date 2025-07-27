import { Router } from "express";
import { divisionControllers } from "./division.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createDivisionZodSchema } from "./division.validation";

const router = Router()

router.post("/create",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(createDivisionZodSchema),
    divisionControllers.createDivision)


router.get("/", divisionControllers.getAllDivisions)
router.get("/:slug", divisionControllers.getSingleDivision)
router.patch("/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(createDivisionZodSchema),
    divisionControllers.updateDivision)
router.delete("/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    divisionControllers.deleteDivision)

export const DivisionRoutes = router;