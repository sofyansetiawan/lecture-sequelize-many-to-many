'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Buyer, { 
        foreignKey: "buyer_id",
        targetKey: "id"
      });
      
      Order.belongsTo(models.Product, { 
        foreignKey: "product_id",
        targetKey: "id"
      });
    }
  };
  Order.init({
    buyer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    ammount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};