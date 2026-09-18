import { TestApi, OtherTestApi, Configuration } from "./client"

export type ApiConfig = { baseURL: URL }

export class Api {
    public test: TestApi
    public otherTest: OtherTestApi

    constructor(config: ApiConfig) {
        const apiConfig = new Configuration({ basePath: config.baseURL.toString() })

        this.test = new TestApi(apiConfig)
        this.otherTest = new OtherTestApi(apiConfig)
    }
}
