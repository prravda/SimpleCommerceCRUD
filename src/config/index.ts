const DatabaseConfig = {
    Port: Number(process.env.DB_PORT),
    Dialect: process.env.DB_DIALECT,
    UserName: process.env.DB_USER,
    Password: process.env.DB_PW,
    DatabaseName: process.env.DB_NAME,
    Host: process.env.DB_HOST,
}

export {
    DatabaseConfig,
}