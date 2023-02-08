import CommentModel from "../model/comment.model.js";
import UserModel from "../model/user.model.js";
import SubscriptionModel from "../model/subscription.model.js";
import MediaModel from "../model/media.model.js";
import FavoriteModel from "../model/favorite.model.js";
import RatingModel from "../model/rating.model.js";

const associationsInitializer = () => {
    CommentModel.hasMany(CommentModel, { as: "Replies", foreignKey: "parentId" });

    UserModel.hasMany(CommentModel, {
        foreignKey: {
            allowNull: true,
        },
    });
    CommentModel.belongsTo(UserModel);

    MediaModel.hasMany(CommentModel, {
        foreignKey: {
            name: "MediaId",
            allowNull: false
        },
    });
    CommentModel.belongsTo(MediaModel, {
        foreignKey: "MediaId"
    });

    UserModel.hasMany(SubscriptionModel, {
        foreignKey: {
            allowNull: false
        },
    });
    SubscriptionModel.belongsTo(UserModel);

    UserModel.belongsToMany(MediaModel, {
        through: FavoriteModel,
        as: "favoriteMedia"
    });
    MediaModel.belongsToMany(UserModel, {
        through: FavoriteModel,
        foreignKey: "MediaId",
        as: "favoriteUsers"
    });

    UserModel.belongsToMany(MediaModel, {
        through: RatingModel,

    });
    MediaModel.belongsToMany(UserModel, {
        through: RatingModel,
        foreignKey: "MediaId"
    })
}

export default associationsInitializer;
