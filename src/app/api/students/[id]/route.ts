import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const studentId = (params.id);

  if (!(studentId)) {
    return new Response(JSON.stringify({ error: "Invalid student ID" }), { status: 400 });
  }

  try {
    // Fetch student with attendance and class info
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        attendance: {
          include: { class: true },
          orderBy: { date: "asc" },
        },
      },
    });

    if (!student) {
      return new Response(JSON.stringify({ error: "Student not found" }), { status: 404 });
    }

    // Build attendance per class dynamically
    const classes: Record<
      string,
      { online: number; inPerson: number; recording: number; absent: number; dates: any[] }
    > = {};

    student.attendance.forEach((record) => {
      const className = record.class.name;

      if (!classes[className]) {
        classes[className] = {
          online: 0,
          inPerson: 0,
          recording: 0,
          absent: 0,
          dates: [],
        };
      }

      if (record.online) classes[className].online++;
      if (record.inPerson) classes[className].inPerson++;
      if (record.recording) classes[className].recording++;
      if (record.absent) classes[className].absent++;

      classes[className].dates.push({
        date: record.date.toISOString().split("T")[0],
        online: record.online,
        inPerson: record.inPerson,
        recording: record.recording,
        absent: record.absent,
      });
    });

    return new Response(
      JSON.stringify({
        student: {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          phone: student.phone,
        },
        classes,
      })
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch student data" }), { status: 500 });
  }
}
