'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class postgres extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	postgres.init(
		{
			id: DataTypes.INTEGER,
			name: DataTypes.STRING,
			salary: DataTypes.INTEGER,
			department: DataTypes.ENUM('PS', 'HR'),
		},
		{
			sequelize,
			modelName: 'postgres',
		}
	)
	return postgres
}
