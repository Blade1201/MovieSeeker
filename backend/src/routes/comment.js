const express = require("express");
const router = express.Router();
const checkErrors = require("../middlewares/checkErrors");
const verifyJWTMW = require("../middlewares/authentication/verifyJWT");
const createValidationHandlerMW = require("../middlewares/comment/createValidationHandler");
const createCommentMW = require("../middlewares/comment/createComment");
const editValidationHandlerMW = require("../middlewares/comment/editValidationHandler");
const editCommentMW = require("../middlewares/comment/editComment");
const {deleteValidationHandler} = require("../middlewares/comment/deleteValidationHandler");
const {deleteComment: deleteCommentMW} = require("../middlewares/comment/deleteComment");

router.use(express.json());

router.use(verifyJWTMW);

router.post("/add",
    createValidationHandlerMW,
    checkErrors,
    createCommentMW,
    (req, res) => {
        res.status(201).json({
            success: true
        })
    })

router.patch("/edit",
    editValidationHandlerMW,
    checkErrors,
    editCommentMW,
    (req, res) => {
        res.status(200).json({
            success: true
        })
    })

router.delete("/delete",
    deleteValidationHandler,
    checkErrors,
    deleteCommentMW,
    (req, res) => {
        res.status(200).json({success: true});
    });

module.exports = router;