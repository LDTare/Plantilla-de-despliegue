import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const departamento = await prisma.tbl_departamento.findMany()
    return NextResponse.json(departamento)
}

export async function POST(request){
    const data = await request.json()
    const newDepartamento = await prisma.tbl_departamento.create({
        data: {
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
        },
    });
    return NextResponse.json(newDepartamento)
}