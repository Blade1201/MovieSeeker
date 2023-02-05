import generalNumberValidatorMiddleware from "../generalNumber.validator.middleware.js";

const valueRatingValidatorMiddleware = () => {
    return generalNumberValidatorMiddleware("ratingScore")
        .isInt({min: 1, max: 10})
        .bail()
        .withMessage("Az értékelésnek 1-10 között kell lennie!")
}

export default valueRatingValidatorMiddleware;