import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
    Tags
} from "tsoa"
import { PrismaClient, User } from "../generated/prisma/client"
import { getDB } from "../lib/db"
import { ClientHttpError } from "../lib/errors"
import { logger } from "../lib/logger"

interface UserDTO {
    id: string
    name: String
    email: string
}

interface GetUsersResponse {
    users: UserDTO[]
    total: number
    page: number
    count: number
}

interface CreateUserBody {
    name: string
    email: string
}

interface UpdateUserBody {
    name?: string
    email?: string
}

// Usually the controller logic would be kept in a separate file
// For the purposes of the example, they are all here.
@Route("users")
@Tags("Users")
export class UserController extends Controller {
    private prisma: PrismaClient

    constructor() {
        super()
        this.prisma = getDB()
    }

    @Get("")
    @SuccessResponse(200)
    public async getUsers(
        @Query() page?: number,
        @Query() count?: number
    ): Promise<GetUsersResponse> {
        const pg = page ?? 1
        const ct = count ?? 10

        if (pg < 1) {
            throw new ClientHttpError({ statusCode: 422, message: "Page must be greater than 1." })
        }

        if (ct < 1) {
            throw new ClientHttpError({ statusCode: 422, message: "Count must be greater than 1." })
        }

        if (ct > 50) {
            throw new ClientHttpError({
                statusCode: 422,
                message: "Count must not be greater than 50."
            })
        }

        const total = await this.prisma.user.count()

        const users = await this.prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            skip: (pg - 1) * ct,
            take: ct
        })

        return { page: pg, count: ct, total, users: users.map(this.userToDTO) }
    }

    @Post("")
    @SuccessResponse(201)
    public async createUser(@Body() body: CreateUserBody): Promise<UserDTO> {
        const { name: rawName, email: rawEmail } = body

        const name = rawName.trim()
        const email = rawEmail.trim().toLowerCase()
        this.validateEmail(email)
        this.validateName(name)

        let user = await this.doesUserExist({ email })

        if (user) {
            throw new ClientHttpError({
                statusCode: 409,
                message: "User with email already exists."
            })
        }

        user = await this.prisma.user.create({ data: { name, email } })

        return this.userToDTO(user)
    }

    @Patch("{id}")
    @SuccessResponse(200)
    public async updateUser(@Path() id: string, @Body() body: UpdateUserBody): Promise<UserDTO> {
        let user = await this.doesUserExist({ id })
        if (!user) {
            throw new ClientHttpError({ statusCode: 404, message: "Unable to find user id." })
        }

        const { name: rawName, email: rawEmail } = body

        const name = rawName?.trim()
        const email = rawEmail?.trim().toLowerCase()

        if (!name && !email) {
            return this.userToDTO(user)
        }
        if (name) {
            this.validateName(name)
        }
        if (email) {
            this.validateEmail(email)
            if (email !== user.email) {
                const otherUser = await this.doesUserExist({ email })
                if (otherUser) {
                    throw new ClientHttpError({
                        statusCode: 409,
                        message: "User already exists with this email."
                    })
                }
            }
        }

        user = await this.prisma.user.update({
            where: { id: user.id },
            data: { name: name, email: email }
        })

        return this.userToDTO(user)
    }

    @Delete("{id}")
    @SuccessResponse(204)
    public async deleteUser(@Path() id: string): Promise<void> {
        const user = await this.doesUserExist({ id })
        if (!user) {
            throw new ClientHttpError({ statusCode: 404, message: "User not found." })
        }

        await this.prisma.user.delete({ where: { id } })
    }

    private userToDTO(user: User): UserDTO {
        const { id, name, email } = user
        return { id, name, email }
    }

    private validateEmail(email: string): void {
        const emailRegex = /^[a-z0-9\.\-_]+@\S+$/i
        if (!email.match(emailRegex)) {
            throw new ClientHttpError({ statusCode: 422, message: "Email has an invalid format." })
        }
    }

    private validateName(name: string): void {
        if (name.trim().length === 0) {
            throw new ClientHttpError({
                statusCode: 422,
                message: "Name must have at least one character."
            })
        }
    }

    private async doesUserExist(req: { id?: string; email?: string }): Promise<User | null> {
        const { id, email } = req
        let user: User | null = null
        if (id) {
            try {
                user = await this.prisma.user.findUnique({ where: { id } })
            } catch (err) {
                logger.error(err, `Failed to find user with id ${id}`)
            }
        }
        if (email && !user) {
            user = await this.prisma.user.findUnique({ where: { email } })
        }

        return user
    }
}
