const bcrypt = require("bcrypt");
const UserDTO = require("../../services/dto/UserDTO");

const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash.toString());
}

module.exports = async (body) => {
    const {credential, password} = body;

    let dbUser;
    if (credential.includes("@")) {
        dbUser = await new UserDTO().findByEmail(credential);
    } else {
        dbUser = await new UserDTO().findByUsername(credential);
    }

    if (dbUser === null) return;

    const success = await comparePasswords(password, dbUser["hash"]);

    if(success) {
        return {
            id: dbUser["id"],
            username: dbUser["username"]
        }
    }
    return null;
}