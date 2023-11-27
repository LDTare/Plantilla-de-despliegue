//metodos para un dato en especifico
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Asap_Condensed } from "next/font/google";

export async function GET(request, {params}){
    const estadotramite = await prisma.tbl_estadotramite.findUnique({
        where: {
            id: Number(params.id),
        },
    });
    return NextResponse.json(estadotramite)

}

export async function DELETE(request, {params}){
    try {
        const borrarEstadotramite = await prisma.tbl_estadotramite.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(borrarEstadotramite);

    } catch (error){
        return NextResponse.json(
            "Error en el metodo DELETE"
        )
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    const actualizarEstadotramite = await prisma.tbl_estadotramite.update({
        where: {
            id: Number(params.id),
        },
        data: data
    });
    return NextResponse.json(actualizarEstadotramite)
    
}

