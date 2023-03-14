import express from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";
import checkErrorsMiddleware from "../middlewares/checkErrors.middleware.js";
import isAdminValidatorMiddleware from "../middlewares/validators/isAdmin.validator.middleware.js";
import * as userController from "../controllers/user.controller.js";
import editRankValidatorMiddleware from "../middlewares/validators/editRank.validator.middleware.js";

const adminRouter = express.Router();

adminRouter.use(express.json());

adminRouter.get("/users",
    verifyJWTMiddleware,
    isAdminValidatorMiddleware,
    checkErrorsMiddleware,
    userController.getAll);

adminRouter.patch("/users/",
    verifyJWTMiddleware,
    editRankValidatorMiddleware,
    checkErrorsMiddleware,
    userController.changeRank);

export default adminRouter;