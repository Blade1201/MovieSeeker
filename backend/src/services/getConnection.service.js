import {Sequelize} from "sequelize";
import databaseConfig from "../configs/database.config.js";

let sequelieze;

const getConnectionService = () => {
    if (sequelieze === undefined) {
        sequelieze = new Sequelize({
            ...databaseConfig,
            logging: false,
            define: {
                underscored: true,
            }
        });
    }

    return sequelieze;
}

export default getConnectionService;
