import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}){
    const area = await prisma.tbl_area.findUnique({
        where: {
            id: Number(params.id),
        },
    });
    return NextResponse.json(area)
}

export async function DELETE( request, {params}){
    try {
        const borrarArea = await prisma.tbl_area.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(borrarArea);
    } catch (error) {
        return NextResponse.json(
            "Error al eliminar registro"
        )
    }
}

export async function PUT( request, {params}){
    const data = await request.json()
    const actualizarArea = await prisma.tbl_area.update({
        where:{
            id: Number(params.id),
        },
        data: data
    });
    return NextResponse.json(actualizarArea)
}