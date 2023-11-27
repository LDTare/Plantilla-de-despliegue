import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}){
    const requisitos = await prisma.tbl_requisito.findUnique({
        where:{
            id: Number(params.id),
        },
    });
    return NextResponse.json(requisitos)
}

export async function DELETE(request, {params}){
    try {
        const deleteRequisito = await prisma.tbl_requisito.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(deleteRequisito);
    } catch (error) {
        return NextResponse.json("Error en el metodo DELETE")
    }
}

export async function PUT(request,{params}){
    const data = await request.json()
    const updateRequisitos = await prisma.tbl_requisito.update({
        where: {
            id: Number(params.id),
        },
        data: data
    });
    return NextResponse.json(updateRequisitos)
}