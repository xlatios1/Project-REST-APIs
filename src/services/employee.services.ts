// Business logics and services
import { Employee } from '../model/employee.model.ts'
import { EmployeeType } from '../model/employee.model.ts'
import { CustomHandleErrorType } from '../customErrors/CustomErrors.ts'

type ResponseType =
	| Employee
	| Employee[]
	| CustomHandleErrorType
	| number
	| null
	| [affectedCount: number, affectedRows: Employee[]]

export class Services {
	employees!: EmployeeType[]

	constructor() {
		this.__establishConnection()
	}

	__establishConnection = async () => {
		try {
			// await Employee.sync() //creates tne database
			console.log('Database sync successfully.')
		} catch (error) {
			console.error('Error establishing database:')
		} finally {
			// Step 6: Close the connection
			console.log('/* INITIALIZED */')
		}
	}

	getAllEmployees = async (): Promise<ResponseType> => {
		return await Employee.findAll({
			order: [['id', 'ASC']],
		})
	}

	getEmployeeByID = async (id: number): Promise<ResponseType> => {
		return await Employee.findOne({ where: { id } })
	}

	createEmployee = async (newData: EmployeeType): Promise<ResponseType> => {
		return await Employee.create({
			name: newData.name,
			salary: newData.salary,
			department: newData.department.toUpperCase(),
		})
	}

	updateEmployee = async (newData: EmployeeType): Promise<ResponseType> => {
		return await Employee.update(
			{
				name: newData.name,
				salary: newData.salary,
				department: newData.department.toUpperCase(),
			},
			{
				where: { id: newData.id },
				returning: true,
			}
		)
	}

	deleteEmployeeByID = async (id: number): Promise<ResponseType> => {
		return await Employee.destroy({ where: { id } })
	}
}
