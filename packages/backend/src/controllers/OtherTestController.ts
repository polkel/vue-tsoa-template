import { Controller, Get, Route, SuccessResponse, Tags } from "tsoa"

interface OtherTestResponse {
    message: string
}

@Route("othertest")
@Tags("OtherTest")
export class OtherTestController extends Controller {
    @Get("")
    @SuccessResponse(200)
    public async secondTest(): Promise<OtherTestResponse> {
        return { message: "hello" }
    }
}
