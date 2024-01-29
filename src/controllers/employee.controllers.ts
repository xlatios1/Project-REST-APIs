//interface
import { StatusCodes } from 'http-status-codes'; //https://github.com/prettymuchbryce/http-status-codes#readme
import { Request, Response } from "express";

import { Services } from '../services/employee.services';
import { EmployeeType, NewExployeeType } from "../model/employee.model.ts"
import { ensureBody, isPositiveInt } from "../services/employee.middleware.ts"

export class Controller {
    services: Services;

    constructor() {
        this.services = new Services();
    }

    getAllEmployees = (req: Request, res: Response) => {
        try {
            const response = this.services.getAllEmployees()
            return res.status(StatusCodes.OK).json(response)
        } catch (err) {
            const error = err as Error
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"errorMessage": error})
        }
    }

    getEmployeeByID = (req: Request, res: Response)=> {
        try {
            const id = +req.params.emp_id
            if (!isPositiveInt(id)) { throw TypeError() }
            const [response_status, response_data] = this.services.getEmployeeByID(id)
            return res.status(response_status).json(response_data)
        } catch (err) {
            if (err instanceof TypeError){
                return res.status(StatusCodes.BAD_REQUEST).json({"errorMessage": "Employee id has to be a positive non-zero integer."})
            } else {
                const error = err as Error
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"errorMessage": error})
            }
        }
    }

    createEmployee = (req: Request, res: Response) => {
        try{
            const [response_status, response_data] = this.services.createEmployee(ensureBody(req.body) as NewExployeeType)
            return res.status(response_status).json(response_data)
        } catch (err) {
            const error = err as Error
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"errorMessage": error})
        }
    }

    updateEmployee = (req: Request, res: Response) => {
        try {
            let newData = ensureBody(req.body) as NewExployeeType
            const id = +req.params.emp_id
            if (!isPositiveInt(id)) { throw TypeError() }
            newData["id"] = +id
            const [response_status, response_data] = this.services.updateEmployee(newData as EmployeeType)
            return res.status(response_status).json(response_data)
        } catch (err) {
            if (err instanceof TypeError){
                return res.status(StatusCodes.BAD_REQUEST).json({"errorMessage": "Employee id has to be a positive non-zero integer."})
            } else {
                const error = err as Error
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"errorMessage": error})
            }
        }
    }

    deleteEmployeeByID = (req: Request, res: Response) => {
        try{
            const id = +req.params.emp_id
            if (!isPositiveInt(id)) { throw TypeError() }
            const [response_status, response_data] = this.services.deleteEmployeeByID(id)
            return res.status(response_status).json(response_data)
        } catch (e) {
            if (e instanceof TypeError){
                return res.status(StatusCodes.BAD_REQUEST).json({"errorMessage": "Employee id has to be a positive non-zero integer."})
            } else {
                const error = e as Error
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"errorMessage": error})
            }
        }
    }

    homePage = (req: Request, res: Response) => {
         return res.status(StatusCodes.OK).json("Welcome to Employee API Services")
    }
    
    notFoundPage = (req: Request, res: Response) => {
        return res.status(StatusCodes.NOT_FOUND).json({"errorMessage": "404 Method Not Found"})
    }
}










// function Execpetion (methodName: string) {
//     return (target: any, nameMethod: string, descriptor: PropertyDescriptor) => {      
//         const originalMethod = descriptor.value 
//         descriptor.value = async function (...args: any[]) {
//             try {
//                 const executionMethod = await originalMethod.apply(this, args) 
//                 return executionMethod
//             }  catch (error) {
//                 return errorWrapper(error as Error)
//             }            
//         }
//     }
// }
