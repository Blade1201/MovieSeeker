require("mysql2");
const {Sequelize} = require("sequelize");
const databaseConfig = require("../configs/database.config");
let sequelieze;

const getConnection = () => {
    if (sequelieze === undefined) {
        sequelieze = new Sequelize({
            ...databaseConfig,
            logging: false,
            define: {
                underscored: true,
                paranoid: true
            }
        });
    }

    return sequelieze;
}

module.exports = getConnection;
