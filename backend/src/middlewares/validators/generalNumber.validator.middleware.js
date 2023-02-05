import {body} from "express-validator";

const generalNumberValidatorMiddleware = (fieldName) => {
    return body(fieldName)
        .exists()
        .bail()
        .withMessage("Nem található paraméter")
        .isNumeric()
        .bail()
        .withMessage("Nem numerikus paraméter.")
}

export default generalNumberValidatorMiddleware;