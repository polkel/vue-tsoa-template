import express, { json, urlencoded } from "express"
import { RegisterRoutes } from "./routes"
import cors from "cors"

export const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())

RegisterRoutes(app)
