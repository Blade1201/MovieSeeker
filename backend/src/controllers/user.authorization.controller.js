import bcrypt from "bcrypt";
import UserDao from "../dao/user.dao.js";
import {BCRYPT_SALT_ROUNDS} from "../configs/authorization.config.js";
import * as subscriptionController from "../controllers/subscription.controller.js"

const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash.toString());
}

const login = async (body) => {
    const {credential, password} = body;

    let dbUser;
    if (credential.includes("@")) {
        dbUser = await new UserDao().findByEmail(credential);
    } else {
        dbUser = await new UserDao().findByUsername(credential);
    }

    if (dbUser === null) return;

    const success = await comparePasswords(password, dbUser["hash"]);

    if(success) {
        return dbUser;
    }
    return null;
}

const register = async (body) => {
    const {username, email, password} = body

    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const registrationResult = await new UserDao().create(username, email, hash);

    if (registrationResult) {
        return {
            id: registrationResult["id"],
            username: registrationResult["username"],
            rank: registrationResult["rank"]
        }
    }

    return null;
}

const get = async (req, res) => {
    const {userId} = req.body;

    const result = await new UserDao().findById(userId);

    if (result) {
        const {id, username, email, rank, avatarPath} = result;
        const subscribed = await subscriptionController.hasActiveSubscription(result);
        res.json({id, username, email, rank, subscribed, avatarPath});
    } else {
        res.sendStatus(500);
    }

}

export {
    register,
    login,
    get
}