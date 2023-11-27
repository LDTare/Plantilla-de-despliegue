import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const actividad = await prisma.tbl_actividad.findMany()
    return NextResponse.json(actividad)
}

export async function POST(request){
    const data = await request.json()
    const newActividad = await prisma.tbl_actividad.create({
        data: {
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
            departamento_id: Number(data.departamento_id),
        },
    });
    return NextResponse.json(newActividad)
}
