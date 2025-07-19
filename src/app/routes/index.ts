import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auths/auth.route";

export const router = Router();

const moduleRoutes = [
    {
        path:'/user',
        route:UserRoute
    },
    {
        path:'/auth',
        route:AuthRoutes
    }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})