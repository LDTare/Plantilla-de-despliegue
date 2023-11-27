import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const paso = await prisma.tbl_paso.findUnique({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(paso);
}

export async function DELETE(request, { params }) {
  try {
    const deletePaso = await prisma.tbl_paso.delete({
      where: {
        id: parseInt(params.id),
      },
    });
    return NextResponse.json(deletePaso);
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

export async function PUT(request, { params }) {
  const data = await request.json();
  try {
    const updatePaso = await prisma.tbl_paso.update({
      where: {
        id: parseInt(params.id),
      },
      data: data,
    });
    return NextResponse.json(updatePaso);
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


