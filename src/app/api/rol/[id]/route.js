import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const rol = await prisma.tbl_rol.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(rol);
}

export async function DELETE(reques, { params }) {
  try {
    const borrarRol = await prisma.tbl_rol.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(borrarRol);
  } catch (error) {
    return NextResponse.json("ID no encontrado en la base de datos");
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();
  const actualizarRol = await prisma.tbl_rol.update({
    where: {
      id: Number(params.id),
    },
    data: data,
  });
  return NextResponse.json(actualizarRol);
}
