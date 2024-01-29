//Security and validation
import { Request, Response, NextFunction} from "express";
import { EmployeeType, DepartmentType } from "../model/employee.model.ts"

const Joi = require("joi");

const employeeSchema = Joi.object({
    name: Joi.string().min(1).required(),
    salary: Joi.number().strict().greater(0).required(),
    department: Joi.string().valid(DepartmentType.PS, DepartmentType.HR).insensitive().required(),
});

export const validateExpressBody = (req:Request, res:Response, next:NextFunction) => {
    const { error } = employeeSchema.validate(req.body)
    if (error) { res.status(400).json({ errorMessage: error.details })}
    next();
};

export const ensureBody = (data:EmployeeType): EmployeeType => {
    return {
        id: data?.id,
        name: data.name,
        salary: data.salary,
        department: data.department
    }
}

export const isPositiveInt = (value: number): boolean => {
    return (Number.isInteger(value) && value > 0)
}

export const checkIsEqual = (objA: EmployeeType, objB: EmployeeType): boolean => {
    const keysA = Object.keys(objA) as (keyof EmployeeType)[];
    const keysB = Object.keys(objB) as (keyof EmployeeType)[];

    for (const key of keysA) {
        if (!keysB.includes(key) || objA[key] !== objB[key]) {
            return false;
        }
    }
    return true;
}