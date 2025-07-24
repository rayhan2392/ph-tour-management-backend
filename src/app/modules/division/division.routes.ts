import { Router } from "express";
import { divisionControllers } from "./division.controller";

const router = Router()

router.post("/create",divisionControllers.createDivision)

export const divisionRoutes = router;