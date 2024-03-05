
const config = {
  LOCAL_CLIENT: process.env.LOCAL_CLIENT,
  CLIENT: process.env.CLIENT,
  LOCAL_DB: process.env.DATABASE_LOCAL,
  PROD_DB: process.env.DATABASE_PROD,
  DB_PASS: process.env.DATABASE_LOCAL_PASSWORD,
  DB_USER: process.env.DATABASE_LOCAL_USERNAME,
  DB_NAME: process.env.DB_NAME,
  ENV: process.env.NODE_ENV,
  ACCES_TOKEN: process.env.ACCESS_TOKEN_SECRET,
  STRIPE_API: process.env.SRTIPE_KEY,
  USER_EMAIL: process.env.EMAIL,
  USER_PASS: process.env.PASSWORD,
};

module.exports = Object.freeze(config);