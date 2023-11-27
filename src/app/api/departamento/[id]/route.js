import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Asap_Condensed } from "next/font/google";

export async function GET(request, {params}){
    const departamento = await prisma.tbl_departamento.findUnique({
        where: {
            id: Number(params.id),
        },
    });
    return NextResponse.json(departamento)

}

export async function DELETE(request, {params}){
    try {
        const borrarDepartamento = await prisma.tbl_departamento.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(borrarDepartamento);

    } catch (error){
        return NextResponse.json(
            "Error en el metodo DELETE"
        )
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    const actualizarDepartamento = await prisma.tbl_departamento.update({
        where: {
            id: Number(params.id),
        },
        data: data
    });
    return NextResponse.json(actualizarDepartamento)
    
}

