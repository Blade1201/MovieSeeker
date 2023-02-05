import UserDao from "../../dao/user.dao.js";

const userExistValidatorMiddleware = (value, {req}) => {
    return new UserDao()
        .findById(value)
        .then(user => {
            if (user) {
                req.body.user = user;
                return Promise.resolve();
            }
            return Promise.reject("Törölt vagy nem létező felhasználó!");
        });
}

export default userExistValidatorMiddleware;