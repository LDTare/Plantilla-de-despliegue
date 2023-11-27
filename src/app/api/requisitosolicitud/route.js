import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const requisitoSoli = await prisma.tbl_requisitott.findMany()
    return NextResponse.json(requisitoSoli)
}

export async function POST(request){
    const data = await request.json()
    const newRequisitosoli = await prisma.tbl_requisitott.create({
        data:{
            tt_id: Number(data.tipotra_id),
            requisito_id: Number(data.requisito_id),
        },
    });
    return NextResponse.json(newRequisitosoli)
}