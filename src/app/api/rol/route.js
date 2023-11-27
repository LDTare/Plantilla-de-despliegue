import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const roles = await prisma.tbl_rol.findMany()
    return NextResponse.json(roles)
}

export async function POST(request){
    const data = await request.json()
    const newRol = await prisma.tbl_rol.create({
        data: {
            nombre: data.nombre,
            descripcion: data.descripcion,
        },
    });
    return NextResponse.json(newRol)
}
