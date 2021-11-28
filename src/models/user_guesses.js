'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user_guesses extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.users, { 
                as: 'user', 
                foreignKey: 'user_id', 
                targetKey: 'id',
                constraints: true
            })
        }
    };
    user_guesses.init({
        user_id: DataTypes.INTEGER,
        guess_price: DataTypes.DOUBLE,
        guess: DataTypes.STRING,
        status: DataTypes.STRING,
        processing_status: DataTypes.STRING,
        timestamp: DataTypes.DATE
    }, {
        sequelize,
        timestamps: false,
        modelName: 'user_guesses',
    });
    return user_guesses;
};