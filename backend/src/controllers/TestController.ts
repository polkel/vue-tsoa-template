import { Controller, Get, Route, SuccessResponse } from "tsoa"

@Route("test")
export class TestController extends Controller {
    @Get("")
    @SuccessResponse(200)
    public async test(): Promise<string> {
        return "Test success!"
    }
}
