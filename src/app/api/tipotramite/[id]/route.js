import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request,{params}){
    const tipotramite = await prisma.tbl_tipotramites.findUnique({
        where:{
            id: Number(params.id),
        },
    });
    return NextResponse.json(tipotramite)
}

export async function DELETE(request,{params}){
    try {
        const deleteTiporamite = await prisma.tbl_tipotramites.delete({
            where:{
                id:Number(params.id),
            },
        });
        return NextResponse.json(deleteTiporamite);
    } catch (error) {
        return NextResponse.json("Error en el metodo DELETE")
    }
}

export async function PUT(request,{params}){
    const data = await request.json()
    const updateTipotramite = await prisma.tbl_tipotramites.update({
        where:{
            id: Number(params.id),
        },
        data: data
    });
    return NextResponse.json(updateTipotramite)
}