import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  const usuarios = await prisma.tbl_usuarios.findMany();
  return NextResponse.json(usuarios);
}

export async function POST(request) {
  const data = await request.json();

  try {
    //Verificar si existe el regitro del correo en la base de datos

    const useremailFound = await prisma.tbl_usuarios.findUnique({
      where: {
        email: data.email,
      },
    });

    if (useremailFound) {
      return NextResponse.json(
        {
          message: "El correo ya existe en los registros",
        },
        {
          status: 400,
        }
      );
    }

    //Verificar si existe registro del nombre de usuario en la base de datos
    const usernameFound = await prisma.tbl_usuarios.findFirst({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "El nombre de usuario ya existe",
        },
        {
          status: 400,
        }
      );
    }

    //Cifrar contraseña
    const hashPassword = await bcrypt.hash(data.password, 10);

    //Crear nuevo registro
    const newUser = await prisma.tbl_usuarios.create({
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

    //Eliminar el campo "password" de la respuesta json de respuesta
    const { password: _, ...user } = newUser;
    return NextResponse.json(user);
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
