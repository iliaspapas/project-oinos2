export default () => ({
  appSecret: process.env.APP_SECRET,
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    dbname: process.env.DB_NAME,
    dbusername: process.env.DB_USERNAME,
    dbpassword: process.env.DB_PASSWORD,
  },
});
