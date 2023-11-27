import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const tarasignacion = await prisma.tbl_tarasignaciones.findMany({
    where: { Destinatarios: Number(params.id) },
  });
  return NextResponse.json(tarasignacion);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  const updateTarasignacion = await prisma.tbl_tarasignaciones.update({
    where: {
      id: Number(params.id),
    },
    data: {
      ...data,
    },
  });
  return NextResponse.json(updateTarasignacion);
}
