//metodos para un dato en especifico
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Asap_Condensed } from "next/font/google";

export async function GET(request, {params}){
    const clientes = await prisma.tbl_clientes.findUnique({
        where: {
            id: Number(params.id),
        },
    });
    return NextResponse.json(clientes)

}

export async function DELETE(request, {params}){
    try {
        const borrarCliente = await prisma.tbl_clientes.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json(borrarCliente);

    } catch (error){
        return NextResponse.json(
            "Error en el metodo DELETE"
        )
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    const actualizarCliente = await prisma.tbl_clientes.update({
        where: {
            id: Number(params.id),
        },
        data: {
            DPI: Number(data.DPI),
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            Telefono: Number(data.Telefono),
            NIM: Number(data.NIM),
            Correo: data.Correo,
            NIT: Number(data.NIT),
        },
    });
    return NextResponse.json(actualizarCliente)
    
}

