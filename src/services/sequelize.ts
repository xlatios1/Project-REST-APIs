import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = (): Sequelize => {
	return new Sequelize({
		username: process.env.DB_USER || '',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || '',
		host: process.env.DB_HOST || '',
		dialect: 'postgres',
	})
}
