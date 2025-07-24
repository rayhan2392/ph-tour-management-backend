import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auths/auth.route";
import { divisionRoutes } from "../modules/division/division.routes";

export const router = Router();

const moduleRoutes = [
    {
        path:'/user',
        route:UserRoute
    },
    {
        path:'/auth',
        route:AuthRoutes
    },
    {
        path:'/division',
        route:divisionRoutes
    }
]

moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})