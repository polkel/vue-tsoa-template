import { UsersApi, Configuration } from "./client"

export type ApiConfig = { baseURL: URL }

export class Api {
    public user: UsersApi

    constructor(config: ApiConfig) {
        let basePath: string = config.baseURL.toString()
        if (basePath[basePath.length - 1] === "/") {
            basePath = basePath.slice(0, -1)
        }
        const apiConfig = new Configuration({ basePath })

        this.user = new UsersApi(apiConfig)
    }
}
