import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const actividad = await prisma.tbl_actividad.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(actividad);
}

export async function DELETE(request, { params }) {
  try {
    const borrarActividad = await prisma.tbl_actividad.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(borrarActividad);
  } catch (error) {
    return NextResponse.json(
      "ID no encontrado en la base de datos"
    );
  }
}

export async function PUT(request, {params} ){
  const data = await request.json()
  const actualizarActividad = await prisma.tbl_actividad.update({
    where:{
      id: Number(params.id)
    },
    data: {
      Nombre: data.Nombre,
      Descripcion: data.Descripcion,
      departamento_id: Number(data.departamento_id),
      
  },
  });
  return  NextResponse.json(actualizarActividad);
}