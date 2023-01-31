import UserDao from "../../dao/user.dao.js";
import {emailHandlers, passwordHandlers, usernameHandlers} from "./authorization.validator.middleware..js";

const registrationValidatorMiddleware = [
    usernameHandlers("username")
        .custom(value => {
            return new UserDao().findByUsername(value).then(user => {
                if (user) {
                    return Promise.reject("Foglalt felhasználónév!");
                }
            });
        }),
    emailHandlers("email")
        .custom(value => {
            return new UserDao().findByEmail(value).then(user => {
                if (user) {
                    return Promise.reject("Foglalt email!");
                }
            });
        }),
    passwordHandlers()
]

export default registrationValidatorMiddleware;