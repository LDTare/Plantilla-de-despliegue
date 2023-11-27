import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const remitentes = await prisma.tbl_Remitentes.findMany()
    return NextResponse.json(remitentes)
}

export async function POST(request){
    const data = await request.json();
    try {
        const nuevoRemitente = await prisma.tbl_Remitentes.create({
            data: data
        });
        return NextResponse.json(nuevoRemitente);
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        },
        {
            status: 500,
        })
    }
}