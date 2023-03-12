import express from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";
import checkErrorsMiddleware from "../middlewares/checkErrors.middleware.js";
import isAdminValidatorMiddleware from "../middlewares/validators/isAdmin.validator.middleware.js";
import * as userController from "../controllers/user.controller.js";
import editRanksValidatorMiddleware from "../middlewares/validators/editRanks.validator.middleware.js";

const adminRouter = express.Router();

adminRouter.use(express.json());

adminRouter.get("/users",
    verifyJWTMiddleware,
    isAdminValidatorMiddleware,
    checkErrorsMiddleware,
    userController.getAll);

adminRouter.post("/users/editRanks",
    verifyJWTMiddleware,
    editRanksValidatorMiddleware,
    checkErrorsMiddleware,
    userController.changeRanks);

export default adminRouter;