import { Sequelize, Transaction } from "sequelize";

/**
 * Returns the appropriate sequelize instance per the environment
 * @returns
 */
function getSequelizeInstance(): Sequelize {
  // testing uses sqllite, an in-memory db
  if (process.env.NODE_ENV === "test") {
    return new Sequelize("sqlite::memory:", "test", undefined, {
      logging: false,
      dialect: "sqlite",
    });
  }
  return new Sequelize(
    process.env.MYSQL_DATABASE!,
    process.env.MYSQL_USER!,
    process.env.MYSQL_PASSWORD!,
    {
      dialect: "mysql",
      host: process.env.MYSQL_HOST!,
      port: Number(process.env.MYSQL_PORT),
    }
  );
}

const instance = getSequelizeInstance();

// Putting these functions here so that if we change the db, we can just alter here
// how the transactions work for the new db.
export const getTransaction = (): Promise<Transaction> =>
  instance.transaction();

export const commitTransaction = (transaction: Transaction): Promise<void> =>
  transaction.commit();

export const rollbackTransaction = (transaction: Transaction): Promise<void> =>
  transaction.rollback();

export default instance;
