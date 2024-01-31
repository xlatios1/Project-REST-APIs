//routes APIs
import { Express } from "express";

import { Controller } from "../controllers/employee.controllers.ts"
import { validateExpressBody, validateParamID, errorHandler } from '../services/employee.middleware.ts'

export const Router = (app: Express) => {
	const controller = new Controller()

	app.get('/', controller.homePage)

	app.route('/employee').get(controller.getAllEmployees).post(validateExpressBody, controller.createEmployee)

	app
		.route('/employee/:emp_id')
		.get(validateParamID, controller.getEmployeeByID)
		.put(validateExpressBody, validateParamID, controller.updateEmployee)
		.delete(validateParamID, controller.deleteEmployeeByID)

	app.route('/*').all(controller.notFoundPage)

	app.use(errorHandler)
}