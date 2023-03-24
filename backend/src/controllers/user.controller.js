import UserDao from "../dao/user.dao.js";
import path from "path";
import fs from "fs";
import {hasActiveSubscription} from "./subscription.controller.js";

export const getAvatar = (req, res) => {
    const {path} = req.params;
    res.sendFile(`${path.resolve()}/src/upload/avatar/${path}`);
};


const changeRank = async (req, res) => {
    const {id, rank} = req.body;

    const userDao = new UserDao();

    const user = await userDao.findById(id);

    if (!user) {
        res.status(404).json({success: false, reason: "Nem létező felhasználó."});
        return;
    }

    try {
        user["rank"] = rank;
        await userDao.save(user);
        res.sendStatus(200);
    } catch (exc) {
        res.status(500).json({success: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }
}

const changeAvatar = async (req, res) => {
    const {user} = req.body;
    const {avatar} = req.files;

    const extensionName = path.extname(avatar.name);

    if (extensionName === ".gif") {
        if (!await hasActiveSubscription(user)) {
            res.status(403).json({success: false, reason: "GIF-et csak előfizetéssel lehet feltölteni!"});
            return;
        }
    }

    const previousAvatarPath = user["avatarPath"];

    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
    const newAvatarPath = uniqueSuffix + extensionName;

    await avatar.mv(`${path.resolve()}/src/upload/avatar/${newAvatarPath}`);
    user["avatarPath"] = newAvatarPath;
    await new UserDao().save(user);
    res.status(200).json({success: true, avatarPath: newAvatarPath});

    if (previousAvatarPath) {
        try {
            await fs.promises.unlink(`${path.resolve()}/src/upload/avatar/${previousAvatarPath}`);
        } catch (e) {
            console.error(e.message);
        }
    }
}

const getAll = async (_, res) => {
    const users = await new UserDao().findAll();
    const result = users.map(user => {
        const {id, username, email, rank} = user;
        return {id, username, email, rank};
    });

    res.json(result);
}

export {
    changeRank,
    changeAvatar,
    getAll
}