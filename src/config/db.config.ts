require("dotenv").config();

export const config = {
  HOST: process.env.RDS_HOSTNAME ,
  USER: process.env.RDS_USERNAME,
  PASSWORD: process.env.RDS_PASSWORD,
  DB: process.env.RDS_DB_NAME,
  PORT: process.env.RDS_PORT || 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const dialect = "mysql";
