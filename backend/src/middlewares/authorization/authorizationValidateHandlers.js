const {body} = require("express-validator");

exports.usernameHandlers = (credentialName) => {
    return body(credentialName)
        .exists()
        .bail()
        .withMessage("1 és 30 közötti hosszt adjon meg!")
        .isLength({min: 1, max: 30})
        .bail()
        .withMessage("1 és 30 közötti hosszt adjon meg!")
        .isAlphanumeric()
        .bail()
        .withMessage("Csak alfanumerikus karaktereket tartalmazhat!")
}

exports.emailHandlers = (credentialName) => {
    return body(credentialName)
        .exists()
        .bail()
        .withMessage("Valós e-mail címet adjon meg!")
        .isEmail()
        .bail()
        .withMessage("Valós e-mail címet adjon meg!")
}

exports.passwordHandlers = () => {
    return body("password")
        .exists()
        .bail()
        .withMessage("A jelszó nem lehet üres!")
        .not()
        .contains(" ")
        .bail()
        .withMessage("Nem tartalmazhat szóközt!")
        .isLength({min: 8, max: 30})
        .bail()
        .withMessage("8 és 30 közötti hosszt adjon meg!")
        .custom(value => {
            if (!(/^.*[A-Z].*$/.test(value))) {
                return Promise.reject("Adjon meg legalább 1 nagybetűt!");
            } else if (!(/^.*[a-z].*$/.test(value))) {
                return Promise.reject("Adjon meg legalább 1 kisbetűt!");
            } else if (!(/^.*\d.*$/.test(value))) {
                return Promise.reject("Adjon meg legalább 1 számot!");
            } else if (!(/^.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹].*$/.test(value))) {
                return Promise.reject("Adjon meg legalább 1 szimbólumot!");
            }
            return Promise.resolve();
        })
}



