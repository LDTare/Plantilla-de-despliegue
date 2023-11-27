import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const estadosolicitud = await prisma.tbl_estadosolicitud.findMany()
    return NextResponse.json(estadosolicitud)
}

export async function POST(request){
    const data = await request.json()
    const newEstadoSolicitud = await prisma.tbl_estadosolicitud.create({
        data: {
            nombre: data.nombre,
        },
    });
    return NextResponse.json(newEstadoSolicitud)
}