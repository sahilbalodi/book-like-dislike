
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('booksdetails', {
    author: DataTypes.STRING,
    bookid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return users;
};
