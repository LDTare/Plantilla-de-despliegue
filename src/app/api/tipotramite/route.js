import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const tipotramite = await prisma.tbl_tipotramites.findMany()
    return NextResponse.json(tipotramite)
}

export async function POST(request){
    const data = await request.json()
    const newTipotramite = await prisma.tbl_tipotramites.create({
        data:{
            Nombre: data.Nombre,
            Nomenclatura: data.Nomenclatura,
            tiempo_promedio: data.tiempo_promedio,
            Descripcion: data.Descripcion,
        },
    });
    return NextResponse.json(newTipotramite)
}