import UserDao from "../dao/user.dao.js";

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
    res.send();
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