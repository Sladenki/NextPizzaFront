import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

// Получем всех юзеров
export async function GET() { 
    const users = await prisma.user.findMany()

    // Возвращаем всегда в JSON формате
    return NextResponse.json({
        users
    })
}

// Создаем юзера
// req: NextResponse
export async function POST(req: any) {
    const data = await req.json()

    const user = await prisma.user.create({
        data
    })

    return NextResponse.json(user)
}

