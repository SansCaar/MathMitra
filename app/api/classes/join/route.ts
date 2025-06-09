import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

type StudentData = {
  id: string;
  joinedAt: string;
  [key: string]: any; // Allow additional properties
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    let body = await req.json();
    console.log(body);
    if (!body.classCode) {
      return NextResponse.json({
        message: "classCode is required",
        status: "failed",
      });
    }
    if (!body.userId) {
      return NextResponse.json({
        message: "userId is required",
        status: "failed",
      });
    }
    const classData = await prisma.classes.findFirst({
      where: {
        classCode: body.classCode,
      },
    });

    if (!classData) {
      return NextResponse.json({
        message: "Class not found",
        status: "failed",
      });
    }

    // Get existing student data and ensure it's an array
    const existingStudents = Array.isArray(classData.studentId)
      ? (classData.studentId as unknown as StudentData[])
      : [];

    // if (classData?.studentId !== null) {
    //   console.log("Ok");
    //   classData?.studentId.forEach(async (student) => {
    //     if (student.id === body.userId) {
    //       return NextResponse.json({
    //         status: "failed",
    //         message: "User already joined class",
    //       });
    //     }
    //   });
    // }

    // Create new student object
    const newStudent = {
      id: body.userId,
      joinedAt: new Date().toISOString(),
      // Add any other student data you want to store
    };

    const joinClass = await prisma.classes.update({
      where: {
        id: classData.id,
      },
      data: {
        studentsCount: (classData.studentsCount ?? 0) + 1,
        studentId: [...existingStudents, newStudent] as any,
      },
    });

    return NextResponse.json({
      message: "Successfully joined class",
      status: "success",
      data: joinClass,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};
