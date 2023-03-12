import imdbIdValidatorMiddleware from "./imdbId.validator.middleware.js";
import mediaValidatorMiddleware from "./media.validator.middleware.js";
import {body} from "express-validator";

const watchlistValidatorMiddleware = [
    body("watched").isIn(["Y", "N"]).bail().withMessage("Nem megfelelő típus!"),
    imdbIdValidatorMiddleware()
        .custom(mediaValidatorMiddleware)
]

export default watchlistValidatorMiddleware;