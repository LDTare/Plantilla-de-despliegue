//metodos para un dato en especifico
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}){
    const DPI = Number(params.dpi)
    const clientes = await prisma.tbl_clientes.findUnique({
        where: {
            DPI: DPI,
        },
    });
    if (!clientes) {
        return NextResponse.json({ error: "Cliente no encontrado" }, { status: 404 });
    }
    const convertBigIntToNumber = (bigIntValue) => {
        if (typeof bigIntValue === 'bigint') {
            return Number(bigIntValue);
        }
        return bigIntValue;
    };

    clientes.DPI = convertBigIntToNumber(clientes.DPI);
    return NextResponse.json(clientes)

}

export async function DELETE(request, {params}){
    try {
        const DPI = Number(params.dpi);
        const borrarCliente = await prisma.tbl_clientes.delete({
            where: {
                DPI: DPI.toString(),
            },
        });
        return NextResponse.json({ message: 'Registro eliminado correctamente' });

    } catch (error){
        console.log(error);
        return NextResponse.json(
            "Error en el metodo DELETE"
        )
    }   
}

export async function PUT(request, {params}){
    const data = await request.json()
    const DPI = Number(params.dpi);
    const actualizarCliente = await prisma.tbl_clientes.update({
        where: {
            DPI: DPI.toString(),
        },
        data: data
    });
    return NextResponse.json({ message: 'Registro actualizado correctamente' })
    
}

