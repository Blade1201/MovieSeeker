import express from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";

const authenticationRouter = express.Router();

authenticationRouter.use(express.json());
authenticationRouter.get("/", verifyJWTMiddleware, (req, res) => {
    res.json({
        success: true
    })
})
export default authenticationRouter;