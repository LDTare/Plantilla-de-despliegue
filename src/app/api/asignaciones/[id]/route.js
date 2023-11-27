import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const asignacion = await prisma.tbl_asignaciones.findMany({
    where: { Destinatarios: Number(params.id) },
  });
  return NextResponse.json(asignacion);
}

export async function PUT(request, { params }) {
  const data = await request.json();
  const updateAsignacion = await prisma.tbl_asignaciones.update({
    where: {
      id: Number(params.id),
    },
    data: {
      ...data,
    },
  });
  return NextResponse.json(updateAsignacion);
}
