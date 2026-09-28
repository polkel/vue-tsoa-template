import pino from "pino"

const devOptions = {
    transport: {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "SYS:standard", ignore: "pid,hostname" }
    }
}

export const logger = pino(process.env.NODE_ENV === "production" ? {} : devOptions)
