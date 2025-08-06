import { Router } from "express";
import { otpControllers } from "./otp.controller";

const router = Router();

router.post('/send',otpControllers.sendOtp)
router.post('/verify',otpControllers.verifyOtp)

export const OtpRoutes=router