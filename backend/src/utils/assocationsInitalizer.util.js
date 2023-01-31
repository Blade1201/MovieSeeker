import CommentModel from "../model/comment.model.js";
import UserModel from "../model/user.model.js";

const associationsInitializer = () => {
    UserModel.hasMany(CommentModel, {
        foreignKey: {
            allowNull: false,
        },
    });
    CommentModel.belongsTo(UserModel);
}

export default associationsInitializer;
