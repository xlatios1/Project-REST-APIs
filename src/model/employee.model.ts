//talks to database 

import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../services/sequelize'

export enum DepartmentType {
	HR = 'HR',
	PS = 'PS',
}

export type EmployeeType = {
	id?: number
	name: string
	salary: number
	department: DepartmentType
}

export type ResponseType = [response_status: number, response_data: any]

export class Employee extends Model {
	public id?: number
	public name?: string
	public salary?: number
	public department?: DepartmentType

	toJSON() {
		return {
			...this.get(),
			uuid: undefined,
			createdAt: undefined,
			updatedAt: undefined,
		}
	}
}

Employee.init(
	{
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		salary: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		department: {
			type: DataTypes.ENUM('HR', 'PS'),
			allowNull: false,
		},
	},
	{
		sequelize: sequelize(),
		modelName: 'Employee',
		tableName: 'employees',
	}
)