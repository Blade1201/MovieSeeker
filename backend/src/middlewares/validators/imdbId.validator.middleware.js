import {check} from "express-validator";

const imdbIdValidatorMiddleware = () => {
    return check("imdbId")
        .exists()
        .bail()
        .withMessage("Nem található paraméter")
        .isLength({min: 9})
        .bail()
        .withMessage("Nem megfelelő hosszúság (9-255)")
        .matches(/^ev\d{7}\/\d{4}(-\d)?$|^(tt)\d{7,}$/)
        .bail()
        .withMessage("Nem megfelelő formátum!")
}

export default imdbIdValidatorMiddleware;