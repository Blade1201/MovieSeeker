import isAdminValidatorMiddleware from "./isAdmin.validator.middleware.js";
import {body} from "express-validator";

const editRankValidatorMiddleware = [
    ...isAdminValidatorMiddleware,
    body("id").isInt().bail().withMessage("ID csak egész szám lehet!").toInt()
        .custom((value, {req}) => {
          return req.body.userId === value ?
              Promise.reject("Saját rangodat nem módosíthatod!")
              :
              Promise.resolve();
        }),
    body("rank").isIn(["U", "A"]).bail().withMessage("Nem megfelelő rang!")
]

export default editRankValidatorMiddleware;