import UserModel from "../model/user.model.js";

class UserDao {
    async findById(id) {
        return await UserModel.findByPk(id);
    }

    async findAllById(ids) {
        return await UserModel.findAll({
            where: {
                id: ids
            }
        });
    }

    async findAll() {
        return await UserModel.findAll();
    }

    async findByUsername(username) {
        return await UserModel.findOne({
            where: {username}
        });
    }

    async findByEmail(email) {
        return await UserModel.findOne({
            where: {email}
        });
    }

    async create(username, email, hash) {
        return await UserModel.create({username, email, hash});
    }

    async delete(user) {
        return await user.destroy(user);
    }

    async restore(id) {
        return await UserModel.restore({
            where: {id}
        })
    }

    async save(user) {
        return await user.save();
    }
}

export default UserDao;
