
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(){
    const clientes = await prisma.tbl_clientes.findMany()
    const clientesJSON = clientes.map((cliente) => ({
        ...cliente,
        DPI: cliente.DPI.toString(),
      }));
    return NextResponse.json(clientesJSON)
}

export async function POST(request){
    const data = await request.json()
    const nuevoCliente = await prisma.tbl_clientes.create({
        data: {
            DPI: Number(data.DPI),
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            Correo: data.Correo,
            Telefono: Number(data.Telefono),
            NIM: Number(data.NIM),
            NIT: Number(data.NIT),
        },
    });
    return NextResponse.json(nuevoCliente)
}