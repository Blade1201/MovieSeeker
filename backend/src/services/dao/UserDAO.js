const User = require("../../model/User");

class UserDAO {
    async findById(id) {
        return await User.findByPk(id);
    }

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

    async delete(user) {
        return await user.destroy(user);
    }

    async restore(id) {
        return await User.restore({
            where: {id}
        })
    }

    async save(user) {
        return await user.save();
    }
}

module.exports = UserDAO;
