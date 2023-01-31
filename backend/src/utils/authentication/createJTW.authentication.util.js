import jwt from "jsonwebtoken";
import {JWT_SECRET_KEY} from "../../configs/authentication.config.js";

const createJWTAuthenticationUtil =  (id, username, rank) => {
    if (id) {
        return jwt.sign({id, username, rank}, JWT_SECRET_KEY);
    }
    return null;
}

export default createJWTAuthenticationUtil;