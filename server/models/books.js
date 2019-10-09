module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title:{ 
      type:DataTypes.STRING,
      notNull:true,
      validate:{
        max:30
      }
    },
    author:{
      type: DataTypes.STRING,
      notNull:true,
      validate:{
        max:20
      }
    },
    genre: {
      type:DataTypes.STRING,
      notNull:true,
      validate:{
        max:20
      }
    },
    description: {
      type:DataTypes.STRING,
      notNull:true,
      validate:{
        max:500
      }
    }
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};