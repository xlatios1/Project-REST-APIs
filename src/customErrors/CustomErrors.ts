import { Response } from 'express'

export class NoChangeError extends Error {
	statusCode: number

	constructor() {
		super()
		this.statusCode = 304
	}
}

export class NotFoundError extends Error {
	statusCode: number

	constructor() {
		super()
		this.statusCode = 404
	}
}

export class ServerError extends Error {
	statusCode: number

	constructor() {
		super()
		this.statusCode = 500
	}
}

export type CustomHandleErrorType = ServerError | NotFoundError | NoChangeError | Error

export const customHandleError = (
	res: Response,
	error: Error,
	operation: string | undefined,
	message: string | number | undefined = undefined
) => {
	let customErrorMessage = ''
	if (message) {
		if (typeof message === 'number') {
			customErrorMessage += ` Employee id:${message} not found!! `
		} else {
			customErrorMessage += message
		}
	} else {
		customErrorMessage += error.message
	}

	if (error instanceof NoChangeError || error instanceof NotFoundError || error instanceof ServerError) {
		return res.status(error.statusCode).json({
			operation: operation,
			errorMessage: customErrorMessage,
		})
	} else {
		return res.status(520).json({
			operation: operation,
			errorMessage: error,
		})
	}
}
