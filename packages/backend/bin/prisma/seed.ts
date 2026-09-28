import { PrismaClient } from "../../src/generated/prisma/client"
import { UserCreateInput } from "../../src/generated/prisma/models"

const prisma = new PrismaClient()

async function main() {
    const SEED_USERS: UserCreateInput[] = [
        { name: "Kevin Parker", email: "tameimpala@gmail.com" },
        { name: "Claire Cottrill", email: "clairo@gmail.com" },
        { name: "Hayley Williams", email: "paramore@gmail.com" },
        { name: "Patrick Stump", email: "falloutboy@gmail.com" },
        { name: "Joe Keery", email: "djo@gmail.com" }
    ]

    for (const user of SEED_USERS) {
        console.log(`Creating seed user for ${user.name}.`)
        await prisma.user.create({ data: user })
    }

    console.log("Successfully seeded the dev database!")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
