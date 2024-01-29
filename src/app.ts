import express from "express";
import { Router } from './router/employee.router.ts'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
Router(app);

app.listen(3001, () => {
  console.log(`Application listening at http://localhost:3001`);
});