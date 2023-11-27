import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const pasos = await prisma.tbl_paso.findMany();
  return NextResponse.json(pasos);
}

export async function POST(request) {
  const data = await request.json();
  try {
    const stepType = await prisma.tbl_paso.findFirst({
      where: {  tipoTramite_id: Number(data.tipotra_id)},
    });

    if (stepType) {
      const stepNumber = await prisma.tbl_paso.findFirst({
        OR: [
          {
            secuencia: Number(data.secuencia),
          },
          {
            Nombre: data.Nombre
          }
        ]
      })
      if (stepNumber)
      {
        return NextResponse.json(
          {
            message: "El paso ya se encuentra registrado o la secuencia ya se encuentra registrada"
          },
          {
            status: 400,
          }
        );
      }
    }

    console.log(data);

    const nuevoPaso = await prisma.tbl_paso.create({
      data: {
        Nombre: data.Nombre,
        Descripcion: data.Descripcion,
        departamento_id: Number(data.departamento_id),
        actividad_id: Number(data.actividad_id),
        tipoTramite_id: Number(data.tipotra_id),
        secuencia: Number(data.secuencia),
      },
    });

    return NextResponse.json(nuevoPaso);
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
