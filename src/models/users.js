'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.user_guesses,{ 
                foreignKey: 'user_id', 
                as: 'user_guess', 
                onDelete: 'CASCADE' 
            });
        }
    };
    users.init({
        points: DataTypes.INTEGER,
        ip_addr: DataTypes.STRING,
        timestamp: DataTypes.DATE
    }, {
        sequelize,
        timestamps: false,
        modelName: 'users'
    });
    return users;
};