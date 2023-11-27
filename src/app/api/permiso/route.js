import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const permiso = await prisma.tbl_permiso.findMany()
    return NextResponse.json(permiso)
}

export async function POST(request){
    const data = await request.json()
    const newPermiso = await prisma.tbl_permiso.create({
        data: {
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
        },
    });
    return NextResponse.json(newPermiso)
}