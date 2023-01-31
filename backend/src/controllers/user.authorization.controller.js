import bcrypt from "bcrypt";
import UserDao from "../dao/user.dao.js";
import {BCRYPT_SALT_ROUNDS} from "../configs/authorization.config.js";

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
        return {
            id: dbUser["id"],
            username: dbUser["username"],
            rank: dbUser["rank"]
        }
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

export {
    register,
    login
}