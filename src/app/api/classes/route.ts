import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const classes = await prisma.class.findMany({
    include: { teacher: true },
  });
  return NextResponse.json(classes);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newClass = await prisma.class.create({
    data: {
      name: data.name,
      teacherId: data.teacherId,
    },
  });
  return NextResponse.json(newClass);
}
