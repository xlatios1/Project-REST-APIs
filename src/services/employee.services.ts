// Business logics and services
import { StatusCodes } from 'http-status-codes'; //https://github.com/prettymuchbryce/http-status-codes#readme

import { checkIsEqual } from "../services/employee.middleware.ts"
import { DepartmentType, EmployeeType, NewExployeeType, Employee, ResponseType } from "../model/employee.model.ts"

export class Services {
    employees!: EmployeeType[];

    constructor(){
        this.fetchEmployee();
    }

    fetchEmployee = () =>{
        this.employees = [new Employee(1, "One", 1000000, DepartmentType.PS), 
                         new Employee(2, "Two", 1000000, DepartmentType.HR)] as EmployeeType[];
    }

    getAllEmployees = ():Employee[] => {
        return this.employees
    }

    getEmployeeByID = (id: number): ResponseType => {
        const fetchData = this.employees.filter((data:EmployeeType)=>data.id === id)
        if (fetchData.length === 1){
            return [StatusCodes.OK, fetchData[0]]
        } else if (fetchData.length === 0) {
            return [StatusCodes.NOT_FOUND, {"errorMessage": `Update failed: Employee id:${id} not found!!`}]
        } else {
            return [StatusCodes.IM_A_TEAPOT, null]
        }
    }

    createEmployee = (newData: NewExployeeType): ResponseType => {
        let i = 1
        for ( ; i<=this.employees.length; i++){ //Finds the index that is missing
            if (i !== this.employees[i-1].id){ break }
        }
        newData["id"] = i
        this.employees.splice(i-1, 0, newData as EmployeeType);
        return [StatusCodes.OK, newData as EmployeeType]
    }

    updateEmployee = (newData: EmployeeType): ResponseType => {
        const employeeIndex = this.employees.findIndex((employee) => employee.id === newData.id)

        if (employeeIndex !== -1) { // Successfully update
            if (checkIsEqual(this.employees[employeeIndex], newData)){
                return [StatusCodes.OK, "Data is unmodified!"]
            } else {
                this.employees.splice(employeeIndex, 1, newData as EmployeeType); // Update the database on change
                return [StatusCodes.OK, newData]
            }
        } else { // ID not found, no changes
            return [StatusCodes.NOT_FOUND, {"errorMessage": `Update failed: Employee id:${newData.id} not found!!`}]
        }
    }

    deleteEmployeeByID = (id: number): ResponseType => {
            const oldEmployee = this.employees // Creates an old copy
            this.employees = this.employees.filter((data:EmployeeType)=>data.id !== id) // Attempts to remove copy
            
            //if successfully deleted, it should not be the same length
            if (oldEmployee.length !== this.employees.length) {
                return [StatusCodes.NO_CONTENT, null] // Status code 204, NO CONTENT, lets the browser/client knows it doesn't have to wait for a response body.
            } else {
                return [StatusCodes.NOT_FOUND, {"errorMessage": `Update failed: Employee id:${id} not found!!`}]
            }
    }
}