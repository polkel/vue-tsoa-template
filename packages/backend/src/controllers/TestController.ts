import { Body, Controller, Get, Post, Route, SuccessResponse, Tags } from "tsoa"
import { ClientHttpError, ServerHttpError } from "../lib/errors"

interface TestResponse {
    message: string
}

interface GetRandomNameResponse {
    name: string
}

const NAMES: string[] = ["Kevin", "Claire", "Joe", "Alice", "Jack", "Kyle"]

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
        const nameIndex = Math.floor(Math.random() * (NAMES.length + 1))
        if (nameIndex >= NAMES.length) {
            throw new ServerHttpError({ message: "Index out of bounds." })
        }
        return { name: NAMES[nameIndex]! }
    }

    @Post("getNameId")
    @SuccessResponse(200)
    public async getNameId(@Body() body: { name: string }): Promise<{ id: number }> {
        const id = NAMES.indexOf(body.name)
        if (id < 0) {
            throw new ClientHttpError({ statusCode: 404, message: `${body.name} not found.` })
        }
        return { id }
    }

    @Post("sayHello")
    @SuccessResponse(200)
    public async sayHello(@Body() body: { name: string }): Promise<{ message: string }> {
        return { message: `Hello ${body.name}!` }
    }
}
