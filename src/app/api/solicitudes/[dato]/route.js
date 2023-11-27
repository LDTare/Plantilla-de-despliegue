//metodos para un dato en especifico
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}){
    const tipotra = Number(params.tipotra_id)
    const cliente_dpi = Number(params.cliente_dpi)
    const estado = Number(params.estadosolicitud_id)
    const solicitudes = await prisma.tbl_solicitud.findUnique({
        where: {
            cliente_dpi: cliente_dpi
        },
    });
    if (!solicitudes) {
        return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
    }
    /*const convertBigIntToNumber = (bigIntValue) => {
        if (typeof bigIntValue === 'bigint') {
            return Number(bigIntValue);
        }
        return bigIntValue;
    };*/

    //solicitudes.DPI = convertBigIntToNumber(solicitudes.DPI);
    return NextResponse.json(solicitudes)

}

