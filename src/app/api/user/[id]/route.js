import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt"

export async function GET(request, { params }) {
  const usuario = await prisma.tbl_usuarios.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(usuario);
}

export async function DELETE(request, { params }) {
  try {
    const borrarUsuario = await prisma.tbl_usuarios.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(borrarUsuario);
  } catch (error) {
    return NextResponse.json(
      "ID no encontrado en la base de datos"
    );
  }
}

export async function PUT(request, {params} ){
  const data = await request.json()

  const hashPassword = await bcrypt.hash(data.password, 10);

  const actualizarUsuario = await prisma.tbl_usuarios.update({
    where:{
      id: Number(params.id)
    },
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      username: data.username,
      password: hashPassword,
      direccion: data.direccion, 
      Telefono: Number(data.Telefono),
      rol_id: Number(data.rol_id),
      area_id: Number(data.area_id),
      email: data.email,
  },
  });
  return  NextResponse.json(actualizarUsuario);
}