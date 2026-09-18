import express, { json, urlencoded } from "express"
import { RegisterRoutes } from "./routes"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "../build/swagger.json"

export const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())

app.use("/docs", ...swaggerUi.serveFiles(swaggerDoc), swaggerUi.setup(swaggerDoc))

RegisterRoutes(app)
