import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const attendance = await prisma.attendance.findMany({
    include: { student: true, class: true },
  });
  return NextResponse.json(attendance);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newAttendance = await prisma.attendance.create({
    data: {
      studentId: data.studentId,
      classId: data.classId,
      date: new Date(data.date),
      online: data.online,
      inPerson: data.inPerson,
      recording: data.recording,
      absent: data.absent,
      attendanceGrade: data.attendanceGrade,
    },
  });
  return NextResponse.json(newAttendance);
}
