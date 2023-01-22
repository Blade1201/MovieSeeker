const {oneOf} = require("express-validator");
const {usernameHandlers, emailHandlers, passwordHandlers} = require("./authorizationValidateHandlers");
module.exports = [
    oneOf([
        usernameHandlers("credential"), emailHandlers("credential"),
    ]),
    passwordHandlers()
]
