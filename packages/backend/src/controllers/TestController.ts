import { Controller, Get, Route, SuccessResponse, Tags } from "tsoa"

interface TestResponse {
    message: string
}

interface GetRandomNameResponse {
    name: string
}

@Route("test")
@Tags("Test")
export class TestController extends Controller {
    @Get("")
    @SuccessResponse(200)
    public async test(): Promise<TestResponse> {
        return { message: "Test Success!" }
    }

    @Get("random")
    @SuccessResponse(200)
    public async getRandomName(): Promise<GetRandomNameResponse> {
        const NAMES: string[] = ["Kevin", "Claire", "Joe", "Alice", "Jack", "Kyle"]
        const nameIndex = Math.floor(Math.random() * (NAMES.length + 1))
        if (nameIndex >= NAMES.length) {
            throw new Error("Index out of bounds.")
        }
        return { name: NAMES[nameIndex]! }
    }
}
