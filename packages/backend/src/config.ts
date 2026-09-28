import * as z from "zod"
import * as dotenv from "dotenv"
import path from "node:path"

const envSchema = z.object({
    API_PORT: z.coerce.number().gte(0).lte(65535),

    // Database setup
    PG_PASSWORD: z.string().nonempty(),
    PG_USER: z.string().nonempty(),
    PG_DB: z.string().nonempty(),
    PG_HOST: z.string().nonempty(),
    PG_PORT: z.coerce.number().gte(0).lte(65535),
    DATABASE_URL: z.string().nonempty()
})

const envPath = path.resolve(__dirname, "../.env")

dotenv.config({ path: envPath })

let _parsedEnv: ReturnType<typeof envSchema.safeParse>["data"] | null = null

export type Config = {
    apiPort: number
    database: {
        pgPassword: string
        pgUser: string
        pgDb: string
        pgHost: string
        pgPort: number
        databaseUrl: string
    }
}

export function initConfig() {
    if (_parsedEnv) {
        return
    }

    const parseRes = envSchema.safeParse(process.env)

    if (!parseRes.success) {
        for (const issue of parseRes.error.issues) {
            console.log(issue.message)
        }
        throw parseRes.error
    }

    _parsedEnv = parseRes.data
}

function parsedToConfig(parsed: NonNullable<typeof _parsedEnv>): Config {
    return {
        apiPort: parsed.API_PORT,
        database: {
            pgPassword: parsed.PG_PASSWORD,
            pgUser: parsed.PG_USER,
            pgDb: parsed.PG_DB,
            pgHost: parsed.PG_HOST,
            pgPort: parsed.PG_PORT,
            databaseUrl: parsed.DATABASE_URL
        }
    }
}

export function config(): Config {
    if (!_parsedEnv) {
        throw new Error("Config not initialized. Run initConfig first.")
    }
    return parsedToConfig(_parsedEnv)
}
