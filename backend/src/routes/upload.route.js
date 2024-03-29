import express from "express";
import fileUpload from "express-fileupload";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";
import {body} from "express-validator";
import userExistValidatorMiddleware from "../middlewares/validators/userExist.validator.middleware.js";
import checkErrorsMiddleware from "../middlewares/checkErrors.middleware.js";
import avatarUploadValidatorMiddleware from "../middlewares/validators/upload/avatar.upload.validator.middleware.js";
import * as userController from "../controllers/user.controller.js";

const uploadRouter = express.Router();


uploadRouter.use(fileUpload({
    createParentPath: true
}));

uploadRouter.use(express.json());

uploadRouter.get("/avatar/:path",
    userController.getAvatar);

uploadRouter.post("/avatar",
    verifyJWTMiddleware,
    body("userId").custom(userExistValidatorMiddleware),
    checkErrorsMiddleware,
    avatarUploadValidatorMiddleware,
    userController.changeAvatar
);

export  default uploadRouter;