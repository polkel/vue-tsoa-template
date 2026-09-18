import { Controller, Get, Route, SuccessResponse, Tags } from "tsoa"

interface TestResponse {
    message: string
}

@Route("test")
@Tags("Test")
export class TestController extends Controller {
    @Get("")
    @SuccessResponse(200)
    public async test(): Promise<TestResponse> {
        return { message: "Test Success!" }
    }
}
