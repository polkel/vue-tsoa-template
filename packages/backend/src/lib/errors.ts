import { NextFunction, Request, Response } from "express"
import { ValidateError } from "tsoa"
import { logger } from "./logger"

interface HttpErrorParam {
    statusCode?: number
    message: string
}

interface ClientHttpErrorParam extends HttpErrorParam {}

interface ServerHttpErrorParam extends HttpErrorParam {
    details?: Record<string, any>
}

class CustomHttpError extends Error {
    public statusCode: number

    constructor(req: HttpErrorParam) {
        super(req.message)
        let statCode = 500
        if (req.statusCode && req.statusCode >= 400 && req.statusCode < 600) {
            statCode = req.statusCode
        }
        this.statusCode = statCode
    }
}

export class ClientHttpError extends CustomHttpError {
    constructor(req: ClientHttpErrorParam) {
        let statCode = 400
        if (req.statusCode && req.statusCode >= 400 && req.statusCode <= 499) {
            statCode = req.statusCode
        }
        super({ statusCode: statCode, message: req.message })
    }
}

export class ServerHttpError extends CustomHttpError {
    public details: Record<string, any> | undefined

    constructor(req: ServerHttpErrorParam) {
        let statCode = 500
        if (req.statusCode && req.statusCode > 500 && req.statusCode < 600) {
            statCode = req.statusCode
        }
        super({ statusCode: statCode, message: req.message })
        this.details = req.details
    }
}

export function errorHandler(
    err: unknown,
    _: Request,
    res: Response,
    next: NextFunction
): Response | void {
    if (err instanceof ValidateError) {
        return res
            .status(422)
            .json({ message: `Validation failed. ${err.message}`, details: { fields: err.fields } })
    }

    if (err instanceof ClientHttpError) {
        return res.status(err.statusCode).json({ message: err.message })
    }

    if (err instanceof ServerHttpError) {
        logger.error({ err, details: err.details }, err.message)
        return res.status(err.statusCode).json({ message: "An unknown error occurred." })
    }

    if (err instanceof Error) {
        logger.error(err, err.message)
        return res.status(500).json({ message: "Internal server error." })
    }

    next()
}
