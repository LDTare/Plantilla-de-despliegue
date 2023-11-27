import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const tarasignaciones = await prisma.tbl_tarasignaciones.findMany();
    return NextResponse.json(tarasignaciones);
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
  try {
    const newTarasignacion = await prisma.tbl_tarasignaciones.create({ data: data });
    return NextResponse.json(newTarasignacion);
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
