/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // this is how we add new values to enum
      await queryInterface.createTable(
        "Client",
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.CHAR(36),
            unique: true,
            defaultValue: Sequelize.literal("(uuid())"),
          },
          document: {
            unique: true,
            type: Sequelize.STRING,
            allowNull: false,
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          phone: {
            unique: true,
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            unique: true,
            type: Sequelize.STRING,
            allowNull: false,
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
      await queryInterface.dropTable("Client", { transaction });

      return transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
