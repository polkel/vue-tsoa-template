import { TestApi, OtherTestApi, Configuration } from "./client"

export type ApiConfig = { baseURL: URL }

export class Api {
    public test: TestApi
    public otherTest: OtherTestApi

    constructor(config: ApiConfig) {
        let basePath: string = config.baseURL.toString()
        if (basePath[basePath.length - 1] === "/") {
            basePath = basePath.slice(0, -1)
        }
        const apiConfig = new Configuration({ basePath })

        this.test = new TestApi(apiConfig)
        this.otherTest = new OtherTestApi(apiConfig)
    }
}
