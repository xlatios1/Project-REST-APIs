//interface
import { StatusCodes } from 'http-status-codes'; //https://github.com/prettymuchbryce/http-status-codes#readme
import { Request, Response } from 'express'
import { Services } from '../services/employee.services'

export class Controller {
	services: Services

	constructor() {
		this.services = new Services()
	}

	getAllEmployees = (req: Request, res: Response) => {
		this.services
			.getAllEmployees()
			.then((response) => {
				const [response_status, response_data] = response
				return res.status(response_status).json(response_data)
			})
			.catch((err) => {
				const error = err as Error
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMessage: error })
			})
	}

	getEmployeeByID = (req: Request, res: Response) => {
		this.services
			.getEmployeeByID(+req.params.emp_id)
			.then((response) => {
				const [response_status, response_data] = response
				return res.status(response_status).json(response_data)
			})
			.catch((err) => {
				const error = err as Error
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMessage: error })
			})
	}

	createEmployee = (req: Request, res: Response) => {
		this.services
			.createEmployee(req.body)
			.then((response) => {
				const [response_status, response_data] = response
				console.log(response_status, response_data)
				return res.status(response_status).json(response_data)
			})
			.catch((err) => {
				const error = err as Error
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMessage: error })
			})
	}

	updateEmployee = (req: Request, res: Response) => {
		let newData = req.body
		newData['id'] = +req.params.emp_id

		this.services
			.updateEmployee(newData)
			.then((response) => {
				const [response_status, response_data] = response
				// const {name, salary} = getEmployee()
				console.log(response_status, response_data)
				return res.status(response_status).json(response_data)
			})
			.catch((err) => {
				const error = err as Error
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMessage: error })
			})
	}

	deleteEmployeeByID = (req: Request, res: Response) => {
		this.services
			.deleteEmployeeByID(+req.params.emp_id)
			.then((response) => {
				const [response_status, response_data] = response
				console.log(response_status, response_data)
				return res.status(response_status).json(response_data)
			})
			.catch((err) => {
				const error = err as Error
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMessage: error })
			})
	}

	homePage = (req: Request, res: Response) => {
		return res.status(StatusCodes.OK).json('Welcome to Employee API Services')
	}

	notFoundPage = (req: Request, res: Response) => {
		return res.status(StatusCodes.NOT_FOUND).json({ errorMessage: '404 Method Not Found' })
	}
}