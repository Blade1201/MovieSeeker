import SubscriptionDao from "../dao/subscription.dao.js";

const add = async (req, res) => {
    const {user, type} = req.body;

    const result = await new SubscriptionDao().create(user, type);

    if (result) {
        res.sendStatus(201);
    } else {
        res.status(500).json({success: false, blameUser: false, reason: "Hiba történt az adatbázis kapcsolat közben."});
    }

}

const hasActiveSubscription = async (user) => {
    const subscription = await new SubscriptionDao().findUserLatestSubscription(user);

    if (!subscription || subscription["endAt"] < Date.now()) {
        return false;
    }
    return true;
}

const userHasAccess = async (req, res) => {
    const result = await hasActiveSubscription(req.body.user);


    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
}

export {
    add,
    hasActiveSubscription,
    userHasAccess
}