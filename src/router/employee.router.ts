//routes APIs
import { Express } from "express";

import { Controller } from "../controllers/employee.controllers.ts"
import { validateExpressBody } from "../services/employee.middleware.ts"

export const Router = (app: Express)=>{
    const controller = new Controller()

    app.get('/', controller.homePage);

    app.route("/employee")
    .get(controller.getAllEmployees)
    .post(validateExpressBody, controller.createEmployee)
    
    app.route("/employee/:emp_id")
    .get(controller.getEmployeeByID)
    .put(validateExpressBody, controller.updateEmployee)
    .delete(controller.deleteEmployeeByID)
    
    app.route("/*")
    .all(controller.notFoundPage);
}