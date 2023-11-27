import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET(request, {params}){
    const requisitosoli = await prisma.tbl_requisitott.findMany({
        where: {
            tt_id: Number(params.id),
        },
        select: {
            requisito: {
              select: {
                id:true,
                Nombre: true,
              },
            },
          },
    });
    const nombresRequisitos = requisitosoli.map((requisito) => requisito.requisito.Nombre);
    return NextResponse.json(nombresRequisitos)
    //return NextResponse.json(requisitosoli);
}

export async function DELETE(request,{params}){
    try{
        const deleteRequisitosoli = await prisma.tbl_requisitott.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(deleteRequisitosoli);
    }
    catch (error){
        return NextResponse.json("Error en el metodo DELETE")
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    const updateRequisitosoli = await prisma.tbl_requisitott.update({
        where:{
            id: Number(params.id),
        },
        data: data
    });
    return NextResponse.json(updateRequisitosoli)
}