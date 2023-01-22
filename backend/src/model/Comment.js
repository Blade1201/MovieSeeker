const {DataTypes, Model} = require('sequelize');
const currentConnection = require("../services/getConnection");
const sequelize = currentConnection();

class Comment extends Model {}

Comment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        imdbId: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(1024),
            allowNull: false
        },
    },
    {
        sequelize, // We need to pass the connection instance
        modelName: "Comment",
    });


module.exports = Comment;
