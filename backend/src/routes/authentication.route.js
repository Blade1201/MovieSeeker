import express from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";
import * as userAuthorizationController from "../controllers/user.authorization.controller.js";

const authenticationRouter = express.Router();

authenticationRouter.use(express.json());
authenticationRouter.get("/", verifyJWTMiddleware, userAuthorizationController.get);

const deleteJWTMiddleware = (req, res) =>  {
    res.clearCookie("access-token");
    res.end();
}

authenticationRouter.delete("/", deleteJWTMiddleware)
export default authenticationRouter;