const ConnectionManager = require("../ConnectionManager");
const getConnection = require("../ConnectionManager");
const User = require("../../model/User");

class UserDTO {
    async findByUsername(username) {
        return await User.findOne({
            where: {username}
        });
    }

    async findByEmail(email) {
        return await User.findOne({
            where: {email}
        });
    }

    async create(username, email, hash) {
        return await User.create({username, email, hash});
    }
}

module.exports = UserDTO;