// Business logics and services
import { StatusCodes } from 'http-status-codes'; //https://github.com/prettymuchbryce/http-status-codes#readme
import { Employee } from '../model/employee.model.ts'
import { EmployeeType, ResponseType } from '../model/employee.model.ts'

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
		try {
			const allEmployees = await Employee.findAll()
			return [StatusCodes.OK, allEmployees]
		} catch (error) {
			return [StatusCodes.INTERNAL_SERVER_ERROR, error]
		}
	}

	getEmployeeByID = async (id: number): Promise<ResponseType> => {
		try {
			const thisEmployee = await Employee.findOne({ where: { id } })
			if (thisEmployee) {
				return [StatusCodes.OK, thisEmployee]
			} else {
				return [StatusCodes.NOT_FOUND, { errorMessage: `Fetch failed: Employee id:${id} not found!!` }]
			}
		} catch (error) {
			return [StatusCodes.INTERNAL_SERVER_ERROR, error]
		}
	}

	createEmployee = async (newData: EmployeeType): Promise<ResponseType> => {
		try {
			const newEmployee = await Employee.create({
				name: newData.name,
				salary: newData.salary,
				department: newData.department.toUpperCase(),
			})
			return [StatusCodes.OK, newEmployee]
		} catch (error) {
			throw [StatusCodes.INTERNAL_SERVER_ERROR, error]
		}
	}

	updateEmployee = async (newData: EmployeeType): Promise<ResponseType> => {
		const [_, employeeExist] = await this.getEmployeeByID(newData.id!)
		if (employeeExist) {
			const [affectedRowsCount, updatedRecords] = await Employee.update(
				{
					name: newData.name,
					salary: newData.salary,
					department: newData.department.toUpperCase(),
					createdAt: 0,
					updatedAt: 0,
				},
				{
					where: { id: newData.id },
					returning: true,
				}
			)
			console.log('AAADAWAED', affectedRowsCount, updatedRecords)
			if (+affectedRowsCount > 0) {
				return [StatusCodes.OK, updatedRecords]
			} else {
				return [StatusCodes.OK, 'Data is unmodified!']
			}
		} else {
			return [
				StatusCodes.NOT_FOUND,
				{
					errorMessage: `Update failed: Employee id:${newData.id} not found!!`,
				},
			]
		}
	}

	deleteEmployeeByID = async (id: number): Promise<ResponseType> => {
		const value = await Employee.destroy({ where: { id } })
		if (value) {
			return [StatusCodes.NO_CONTENT, null]
		} else {
			return [StatusCodes.NOT_FOUND, { errorMessage: `Delete failed: Employee id:${id} not found!!` }]
		}
	}
}