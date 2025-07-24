import { Router } from "express";
import { divisionControllers } from "./division.controller";

const router = Router()

router.post("/create",divisionControllers.createDivision)
router.get("/",divisionControllers.getAllDivisions)
router.get("/:slug",divisionControllers.getSingleDivision)
router.patch("/:id",divisionControllers.updateDivision)
router.delete("/:id",divisionControllers.deleteDivision)

export const divisionRoutes = router;