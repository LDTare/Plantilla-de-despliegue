import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const estadotramite = await prisma.tbl_estadotramite.findMany()
    return NextResponse.json(estadotramite)
}

export async function POST(request){
    const data = await request.json()
    const newEstadotramite = await prisma.tbl_estadotramite.create({
        data: {
            Nombre: data.Nombre,
            Color: data.Color,
            Descripcion: data.Descripcion,
        },
    });
    return NextResponse.json(newEstadotramite)
}