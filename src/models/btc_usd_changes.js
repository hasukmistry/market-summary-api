'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
     class btc_usd_changes extends Model {
          /**
          * Helper method for defining associations.
          * This method is not a part of Sequelize lifecycle.
          * The `models/index` file will call this method automatically.
          */
          static associate(models) {
               // define association here
          }
     };
     btc_usd_changes.init({
          token: DataTypes.STRING,
          current_price: DataTypes.DOUBLE,
          timestamp: DataTypes.DATE
     }, {
          sequelize,
          timestamps: false,
          modelName: 'btc_usd_changes'
     });
     return btc_usd_changes;
};