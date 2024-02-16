import express from "express";
import { Router } from './router/employee.router.ts'

const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

var corsOptions = {
	origin: 'http://localhost:5000',
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

Router(app)

app.listen(5000, () => {
	console.log(`Application listening at http://localhost:5000`)
})

