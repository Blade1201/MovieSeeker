import {body} from "express-validator";
import userExistValidatorMiddleware from "../userExist.validator.middleware.js";
import subscriptionNotExistValidatorMiddleware from "../subscriptionNotExist.validator.middleware.js";

const typeValidatorMiddleware = () => {
    return body("type")
        .matches("^[MSA]$")
        .bail()
        .withMessage("Érvénytelen típus!")
}

const addSubscriptionValidatorMiddleware = [
    body("userId")
        .custom(userExistValidatorMiddleware)
        .custom(subscriptionNotExistValidatorMiddleware),
    typeValidatorMiddleware(),
];

export default  addSubscriptionValidatorMiddleware;