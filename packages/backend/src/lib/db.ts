import { PrismaClient } from "../generated/prisma/client"

let _prismaClient: PrismaClient | null = null

export function getDB(): PrismaClient {
    if (!_prismaClient) {
        _prismaClient = new PrismaClient()
    }

    return _prismaClient
}
