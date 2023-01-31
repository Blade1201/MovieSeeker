import {oneOf} from "express-validator";
import {emailHandlers, passwordHandlers, usernameHandlers} from "./authorization.validator.middleware..js";

const loginValidatorMiddleware = [
    oneOf([
        usernameHandlers("credential"), emailHandlers("credential"),
    ]),
    passwordHandlers()
]

export default loginValidatorMiddleware;
