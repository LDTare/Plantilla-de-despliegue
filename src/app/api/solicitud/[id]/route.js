import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET(request, {params}){
    const solicitud = await prisma.tbl_solicitud.findUnique({
        where: {
            id: Number(params.id),
        },
    });
    return NextResponse.json(solicitud)
}

export async function DELETE(request,{params}){
    try{
        const borrarSolicitud = await prisma.tbl_solicitud.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(borrarSolicitud);
    }
    catch (error){
        return NextResponse.json("Error en el metodo DELETE")
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    data.tipotra_id = Number(data.tipotra_id);
    data.estadosolicitud_id= Number(data.estadosolicitud_id);
    
    const actualizarSolicitud = await prisma.tbl_solicitud.update({
        where:{
            id: Number(params.id),
        },
        data: data
    });
    return NextResponse.json(actualizarSolicitud)
}