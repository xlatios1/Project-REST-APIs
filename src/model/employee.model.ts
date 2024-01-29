//talks to database 

export enum DepartmentType {
    HR = 'HR',
    PS = 'PS'
  }

export type EmployeeType = {
    id: number;
    name: string;
    salary: number;
    department: DepartmentType;
}

export type NewExployeeType = {
    id?: number;
    name: string;
    salary: number;
    department: string;
}

export type ResponseType = [
    response_status: number, 
    response_data: any
]

export class Employee implements EmployeeType{
    id: number;
    name: string;
    salary: number;
    department: DepartmentType;

    constructor(id: number, name:string, salary:number, department:DepartmentType){
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
}