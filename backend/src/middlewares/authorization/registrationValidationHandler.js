const UserDTO = require("../../services/dao/UserDAO");
const {usernameHandlers, emailHandlers, passwordHandlers} = require("./authorizationValidateHandlers");
module.exports = [
    usernameHandlers("username")
        .custom(value => {
            return new UserDTO().findByUsername(value).then(user => {
                if (user) {
                    return Promise.reject("Foglalt felhasználónév!");
                }
            });
        }),
    emailHandlers("email")
        .custom(value => {
            return new UserDTO().findByEmail(value).then(user => {
                if (user) {
                    return Promise.reject("Foglalt email!");
                }
            });
        }),
    passwordHandlers()
]