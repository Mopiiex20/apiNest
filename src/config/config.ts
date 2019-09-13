import * as dotenv from "dotenv";
dotenv.config();

export default {
    Production:{
    PORT: process.env.PORT || 4201,
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME || "books",
    DB_PASSWORD: process.env.DB_PASSWORD || "Bar123456789",
    DB_PORT: process.env.DB_PORT || 3306,
    DB_USER: process.env.DB_USER || "foo",

    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || "jwt_please_change",
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10
    }
};