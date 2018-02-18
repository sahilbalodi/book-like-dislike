
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('likes', {
    bookId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    like: {
      type: Sequelize.BOOLEAN,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('likes'),
};
