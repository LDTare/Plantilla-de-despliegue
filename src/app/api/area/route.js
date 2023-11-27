import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const areas = await prisma.tbl_area.findMany()
    return NextResponse.json(areas)
}

export async function POST(request){
    const data = await request.json()
    const newArea = await prisma.tbl_area.create({
        data: {
            nombre: data.nombre,
            descripcion: data.descripcion,
        },
    });
    return NextResponse.json(newArea)
}