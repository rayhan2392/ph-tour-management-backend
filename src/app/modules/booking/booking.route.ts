import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { bookingControllers } from "./booking.controller";

const router = Router();
// api/v1/booking
router.post('/',checkAuth(...Object.values(Role)),bookingControllers.createBooking)


export const BookingRoutes = router