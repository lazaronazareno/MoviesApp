export const DATA_SOURCES = {
  mySqlDataSource: {
    DB_HOST: process.env.MYSQL_HOST,
    DB_USER: process.env.MYSQL_USER,
    DB_PASSWORD: process.env.MYSQL_PASSWORD,
    DB_PORT: process.env.MYSQL_PORT,
    DB_DATABASE: process.env.MYSQL_DATABASE,
    DB_CONNECTION_LIMIT: (process.env.MYSQL_CONNECTION_LIMIT != null) ? parseInt(process.env.MYSQL_CONNECTION_LIMIT) : 4
  }
}
