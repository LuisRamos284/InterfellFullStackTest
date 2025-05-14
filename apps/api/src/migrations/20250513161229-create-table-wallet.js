const { WalletEventType } = require("commons");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // this is how we add new values to enum
      await queryInterface.createTable(
        "Wallet",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(36),
            unique: true,
            defaultValue: Sequelize.literal("(uuid())"),
          },
          clientId: {
            allowNull: false,
            unique: true,
            type: Sequelize.CHAR(36),
            references: {
              model: "Client",
              key: "id",
            },
          },
          balance: {
            allowNull: false,
            type: Sequelize.BIGINT,
            defaultValue: 0,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
            defaultValue: null,
          },
        },
        { transaction }
      );

      await queryInterface.createTable(
        "WalletEvent",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(36),
            unique: true,
            defaultValue: Sequelize.literal("(uuid())"),
          },
          walletId: {
            allowNull: false,
            type: Sequelize.CHAR(36),
            references: {
              model: "Wallet",
              key: "id",
            },
          },
          walletEventType: {
            type: Sequelize.ENUM(WalletEventType.CREDIT, WalletEventType.DEBIT),
            allowNull: false,
          },
          transactionAmount: {
            allowNull: false,
            type: Sequelize.BIGINT,
            defaultValue: 0,
          },
          balance: {
            allowNull: false,
            type: Sequelize.BIGINT,
            defaultValue: 0,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          deletedAt: {
            allowNull: true,
            type: Sequelize.DATE,
            defaultValue: null,
          },
        },
        { transaction }
      );

      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("Wallet", { transaction });
      await queryInterface.dropTable("WalletEvent", { transaction });

      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
