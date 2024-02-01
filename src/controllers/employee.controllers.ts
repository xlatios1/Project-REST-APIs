//interface
import { Request, Response } from 'express'
import { Services } from '../services/employee.services'
import { NoChangeError, NotFoundError, customHandleError, CustomHandleErrorType } from '../customErrors/CustomErrors'
import { Employee } from '../model/employee.model'

export class Controller {
	services: Services

	constructor() {
		this.services = new Services()
	}

	getAllEmployees = async (req: Request, res: Response) => {
		return await this.services
			.getAllEmployees()
			.then((response) => {
				return res.status(200).json(response)
			})
			.catch((error) => {
				return customHandleError(res, error, 'Get All')
			})
	}

	getEmployeeByID = async (req: Request, res: Response) => {
		const id = +req.params.emp_id
		return await this.services
			.getEmployeeByID(id)
			.then((response) => {
				if (response) {
					return res.status(200).json(response)
				} else {
					throw new NotFoundError()
				}
			})
			.catch((error) => {
				return customHandleError(res, error, 'Get', id)
			})
	}

	createEmployee = async (req: Request, res: Response) => {
		return await this.services
			.createEmployee(req.body)
			.then((response) => {
				return res.status(200).json(response)
			})
			.catch((error) => {
				return customHandleError(res, error, 'Create', 'Unable to create employee!')
			})
	}

	updateEmployee = async (req: Request, res: Response) => {
		let newData = req.body
		const id = +req.params.emp_id
		newData['id'] = id
		try {
			const getResult = (await this.services.getEmployeeByID(id)) as Employee
			if (!getResult) {
				throw new NotFoundError()
			} else {
				if (
					getResult.dataValues.name === newData.name &&
					getResult.dataValues.salary === newData.salary &&
					getResult.dataValues.department === newData.department.toUpperCase()
				) {
					throw new NoChangeError()
				} else {
					const updateResult = (await this.services.updateEmployee(newData)) as [
						affectedCount: number,
						affectedRows: Employee[]
					]
					return res.status(200).json(updateResult[1][0])
				}
			}
		} catch (error) {
			return customHandleError(res, error as CustomHandleErrorType, 'Update', id)
		}
	}

	deleteEmployeeByID = async (req: Request, res: Response) => {
		const id = +req.params.emp_id as number
		try {
			const deletedCounts = await this.services.deleteEmployeeByID(id)
			if (deletedCounts || deletedCounts === 0) {
				throw new NotFoundError()
			} else {
				return res.status(204).json()
			}
		} catch (error) {
			return customHandleError(res, error as CustomHandleErrorType, 'Delete', id)
		}
	}

	homePage = (req: Request, res: Response) => {
		return res.status(200).json('Welcome to Employee API Services')
	}

	notFoundPage = (req: Request, res: Response) => {
		return res.status(404).json({ errorMessage: '404 Method Not Found' })
	}
}
