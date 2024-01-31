//Security and validation
import { StatusCodes } from 'http-status-codes' //https://github.com/prettymuchbryce/http-status-codes#readme
import { Request, Response, NextFunction } from 'express'
import { EmployeeType, DepartmentType } from '../model/employee.model.ts'

const Joi = require('joi')

const employeeSchema = Joi.object({
	name: Joi.string().min(1).required(),
	salary: Joi.number().strict().greater(0).required(),
	department: Joi.string().valid(DepartmentType.PS, DepartmentType.HR).insensitive().required(),
})

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMessage: err })
}

export const validateExpressBody = (req: Request, res: Response, next: NextFunction) => {
	const { error } = employeeSchema.validate(req.body)
	if (error) {
		res.status(StatusCodes.BAD_REQUEST).json({ errorMessage: error })
	} else {
		req.body = ensureBody(req.body)
		next()
	}
}

export const validateParamID = (req: Request, res: Response, next: NextFunction) => {
	const id = +req.params?.emp_id
	if (!!id) {
		if (Number.isInteger(id) && +id > 0) {
			next()
		}
	} else {
		return res.status(StatusCodes.BAD_REQUEST).json({
			errorMessage: 'Employee id has to be a positive non-zero integer.',
		})
	}
}

export const ensureBody = (data: EmployeeType): EmployeeType => {
	return {
		id: data?.id,
		name: data.name,
		salary: data.salary,
		department: data.department,
	}
}