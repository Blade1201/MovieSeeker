import UserDao from "../dao/user.dao.js";

const changeRanks = async (req, res) => {
    const {users} = req.body;

    const userDao = new UserDao();

    const dbUsers = await userDao.findAllById(users.map(u => u.id));


    if (dbUsers.length !== users.length) {
        res.status(404).json({success: false, blameUser: true, message: "Nem található id!"});
        return;
    }

    try {
        for (const user of users) {
            const dbUser = dbUsers.find(u => u.id === user.id);

            dbUser["rank"] = user["newRank"];
            await userDao.save(dbUser);
        }
        res.sendStatus(200);
    } catch (exc) {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
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
    changeRanks,
    getAll
}