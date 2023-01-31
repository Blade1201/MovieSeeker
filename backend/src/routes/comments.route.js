import express from "express";
import checkErrorsMiddleware from "../middlewares/checkErrors.middleware.js";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";
import * as commentController from "../controllers/comment.controller.js"
import createCommentValidatorMiddleware
    from "../middlewares/validators/comment/create.comment.validator.middleware..js";
import editCommentValidatorMiddleware
    from "../middlewares/validators/comment/edit.comment.validator.middleware.js";
import deleteCommentValidatorMiddleware
    from "../middlewares/validators/comment/delete.comment.validator.middleware.js";
import {imdbIdValidator} from "../middlewares/validators/comment/other.comment.validator.middleware..js";
const commentsRouter = express.Router();

commentsRouter.use(express.json());

commentsRouter.get("/:imdbId",
    imdbIdValidator(),
    checkErrorsMiddleware,
    commentController.get
);

commentsRouter.post("/",
    verifyJWTMiddleware,
    createCommentValidatorMiddleware,
    checkErrorsMiddleware,
    commentController.create,
    (req, res) => {
        res.status(201).json({
            success: true
        })
    })

commentsRouter.patch("/",
    verifyJWTMiddleware,
    editCommentValidatorMiddleware,
    checkErrorsMiddleware,
    commentController.edit,
    (req, res) => {
        res.status(200).json({
            success: true
        })
    })

commentsRouter.delete("/",
    verifyJWTMiddleware,
    deleteCommentValidatorMiddleware,
    checkErrorsMiddleware,
    commentController.destroy,
    (req, res) => {
        res.status(200).json({success: true});
    });

export default commentsRouter;