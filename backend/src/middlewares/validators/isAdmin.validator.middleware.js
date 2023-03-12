import {body} from "express-validator";
import UserDao from "../../dao/user.dao.js";

const isAdminValidatorMiddleware = [
    body("userId")
        .custom(async value => {
            const user = await new UserDao().findById(value);
            return user["rank"] === "A" ? Promise.resolve() : Promise.reject("Felhasználó nem adminisztrátor!");
        })
]

export default isAdminValidatorMiddleware;