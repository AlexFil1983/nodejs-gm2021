import pkg from "sequelize";
const { Sequelize } = pkg;

const url =
  "postgres://xfginkprwojuqb:f5d819380a3e46768b735fdeaf4f0ecfc2ab40176601187fca6d1cb946647a6e@ec2-176-34-222-188.eu-west-1.compute.amazonaws.com:5432/dcdnkedictj1ka";

export const sequelize = new Sequelize(url, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});
