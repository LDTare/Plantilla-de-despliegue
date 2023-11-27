import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const requisito = await prisma.tbl_requisito.findMany()
    return NextResponse.json(requisito)
}

export async function POST(request){
    const data = await request.json()
    const newRequisito = await prisma.tbl_requisito.create({
        data:{
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
        },
    });
    return NextResponse.json(newRequisito)
}