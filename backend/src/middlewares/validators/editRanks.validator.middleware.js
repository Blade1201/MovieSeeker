import isAdminValidatorMiddleware from "./isAdmin.validator.middleware.js";
import {body} from "express-validator";

const editRanksValidatorMiddleware = [
    ...isAdminValidatorMiddleware,
    body("users").isArray().bail().withMessage("Nem adott át tömböt!"),
    body("users.*.id")
        .isInt()
        .bail()
        .withMessage("Nem egész szám!")
        .toInt(),
    body("users.*.newRank")
        .isIn(["A", "U"])
        .bail()
        .withMessage("Nem megfelelő rang!")
]

export default editRanksValidatorMiddleware;