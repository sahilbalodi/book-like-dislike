
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('booksdetails', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    bookid: {
      type: Sequelize.INTEGER,
    },
    author: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    rating: {
      type: Sequelize.DOUBLE,
    },
    like:{
      
    }
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('booksdetails'),
};
