import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";

const router = Router()

router.post("/register",validateRequest(createUserZodSchema)  ,UserControllers.createUser)
router.get("/all-user",UserControllers.getAllUsers)

export const UserRoute = router