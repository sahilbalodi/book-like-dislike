module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    like: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return likes;
};
