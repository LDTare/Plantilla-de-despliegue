//metodos para un dato en especifico
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}){
    const estadosolicitud = await prisma.tbl_estadosolicitud.findUnique({
        where: {
            id: Number(params.id),
        },
    });
    return NextResponse.json(estadosolicitud)

}

export async function DELETE(request, {params}){
    try {
        const borrarEstadosolicitud = await prisma.tbl_estadosolicitud.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(borrarEstadosolicitud);

    } catch (error){
        return NextResponse.json(
            "Error en el metodo DELETE"
        )
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    const actualizarEstadosolicitud = await prisma.tbl_estadosolicitud.update({
        where: {
            id: Number(params.id),
        },
        data: data
    });
    return NextResponse.json(actualizarEstadosolicitud)
    
}

