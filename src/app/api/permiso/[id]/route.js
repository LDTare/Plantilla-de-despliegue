import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Asap_Condensed } from "next/font/google";

export async function GET(request, {params}){
    const permiso = await prisma.tbl_permiso.findUnique({
        where: {
            id: Number(params.id),
        },
    });
    return NextResponse.json(permiso)

}

export async function DELETE(request, {params}){
    try {
        const borrarPermiso = await prisma.tbl_permiso.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(borrarPermiso);

    } catch (error){
        return NextResponse.json(
            "Error en el metodo DELETE"
        )
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    const actualizarPermiso = await prisma.tbl_permiso.update({
        where: {
            id: Number(params.id),
        },
        data: data
    });
    return NextResponse.json(actualizarPermiso)
    
}

