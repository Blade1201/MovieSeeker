require("../../configs/authorization.config.js");
const bcrypt = require("bcrypt");
const UserDTO = require("../../services/dto/UserDTO");
const {BCRYPT_SALT_ROUNDS} = require("../../configs/authorization.config");


module.exports = async (reqBody) => {
    const {username, email, password} = reqBody;

    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const registrationResult = await new UserDTO().create(username, email, hash);

    return registrationResult.id;

}
