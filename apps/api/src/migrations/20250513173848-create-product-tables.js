const { PurchaseStatus } = require("commons");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // this is how we add new values to enum
      await queryInterface.createTable(
        "Product",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(36),
            unique: true,
            defaultValue: Sequelize.literal("(uuid())"),
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          price: {
            type: Sequelize.BIGINT,
            allowNull: false,
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

      const createdAt = new Date();
      const updatedAt = createdAt;

      await queryInterface.bulkInsert("Product", [
        {
          name: "Product A",
          price: 1000,
          createdAt,
          updatedAt,
        },
        {
          name: "Product B",
          price: 2500,
          createdAt,
          updatedAt,
        },
      ]);

      await queryInterface.createTable(
        "ClientPurchase",
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
            type: Sequelize.CHAR(36),
            references: {
              model: "Client",
              key: "id",
            },
          },
          productId: {
            allowNull: false,
            type: Sequelize.CHAR(36),
            references: {
              model: "Product",
              key: "id",
            },
          },
          status: {
            type: Sequelize.ENUM(
              PurchaseStatus.CANCELED,
              PurchaseStatus.PENDING_CONFIRMATION,
              PurchaseStatus.COMPLETED
            ),
            defaultValue: PurchaseStatus.PENDING_CONFIRMATION,
            allowNull: false,
          },
          token: {
            type: Sequelize.CHAR(6),
            allowNull: false,
            unique: true,
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
      await queryInterface.dropTable("Product", { transaction });
      await queryInterface.dropTable("ClientPurchase", { transaction });

      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
