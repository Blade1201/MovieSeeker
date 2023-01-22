const Rank = require("../model/Rank");
const Comment = require("../model/Comment");
const User = require("../model/User");

Rank.hasOne(User, {
    foreignKey: {
        defaultValue: 1
    },
    onUpdate: "RESTRICT",
    onDelete: "RESTRICT"
});
User.belongsTo(Rank);

User.hasMany(Comment, {
    foreignKey: {
        allowNull: false,
    },
});
Comment.belongsTo(User);
