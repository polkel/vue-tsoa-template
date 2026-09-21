import express, { json, urlencoded } from "express"
import { RegisterRoutes } from "./generated/tsoa/routes"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "./generated/tsoa/swagger.json"
import { pinoHttp } from "pino-http"
import { logger } from "./lib/logger"
import { errorHandler } from "./lib/errors"

export const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())

app.use(
    pinoHttp({
        logger,
        customLogLevel: (_, res, error) => {
            if (error || res.statusCode >= 500) {
                return "error"
            }
            if (res.statusCode >= 400) {
                return "warn"
            }
            return "info"
        }
    })
)

app.use("/docs", ...swaggerUi.serveFiles(swaggerDoc), swaggerUi.setup(swaggerDoc))

RegisterRoutes(app)

app.use(errorHandler)
