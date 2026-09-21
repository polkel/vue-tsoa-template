// enumerate required config in Config, RawConfig, and with the config() function

interface Config {
    apiUrl: URL
}

interface RawConfig {
    VITE_API_URL: string | undefined
}

type ValidatedRawConfig = { [K in keyof RawConfig]: Exclude<RawConfig[K], null | undefined> }

function isValidatedRawConfig(cfg: RawConfig): cfg is ValidatedRawConfig {
    for (const k of Object.keys(cfg)) {
        const key = k as keyof RawConfig
        if (!cfg[key]) {
            return false
        }
    }
    return true
}

export function config(): Config {
    const rawConfig: RawConfig = { VITE_API_URL: import.meta.env.VITE_API_URL }

    if (!isValidatedRawConfig(rawConfig)) {
        throw new Error("Missing config in .env")
    }

    return { apiUrl: new URL(rawConfig.VITE_API_URL) }
}
