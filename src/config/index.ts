const DatabaseConfig = {
    Port: Number(process.env.DB_PORT),
    Dialect: process.env.DB_DIALECT,
    UserName: process.env.DB_USER,
    Password: process.env.DB_PW,
    DatabaseName: process.env.DB_NAME,
    Host: process.env.DB_HOST,
}

const AuthConfig = {
    Secret: process.env.AUTH_SECRET,
    Expires: process.env.AUTH_EXPIRES,
}

const CryptConfig = {
    SaltRounds: process.env.CRYPT_SALT,
}

export {
    DatabaseConfig,
    AuthConfig,
    CryptConfig,
}

// class Config {
//     private static _AuthSecret = process.env.AUTH_SECRET;
//     private static _CryptoSaltRound = process.env.CRYPT_SALT;
//
//     static get AuthSecret(): string {
//         return this._AuthSecret;
//     }
//
//     static get CryptoSaltRound(): string {
//         return this._CryptoSaltRound;
//     }
// }
