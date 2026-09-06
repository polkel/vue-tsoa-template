import express, { json, urlencoded } from "express"
import { RegisterRoutes } from "./routes"

export const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())

RegisterRoutes(app)
