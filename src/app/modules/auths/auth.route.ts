import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import passport from "passport";
import { envVars } from "../../config/env";

const router = Router();



router.post('/login', authControllers.credentialLogin)
router.post('/refresh-token', authControllers.getNewAccessToken)
router.post('/logout', authControllers.logout)
router.post('/change-password', checkAuth(...Object.values(Role)), authControllers.changePassword)
router.post('/set-password', checkAuth(...Object.values(Role)), authControllers.setPassword)

//google oauth routes
router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
})

router.get("/google/callback", passport.authenticate("google", { failureRedirect: `${envVars.FRONTEND_URL}/login?error=There is some issues with your account. Please contact with out support team!` }), authControllers.googleCallbackController)


export const AuthRoutes = router