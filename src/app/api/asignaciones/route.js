import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const asignaciones = await prisma.tbl_asignaciones.findMany();
    return NextResponse.json(asignaciones);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  const data = await request.json();
  data.paso_id = Number(data.paso_id)
  data.Destinatarios = Number(data.Destinatarios)
  try {
    const newAsignacion = await prisma.tbl_asignaciones.create({ data: data });
    return NextResponse.json(newAsignacion);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
