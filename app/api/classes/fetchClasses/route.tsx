import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    console.log(body);
    if (!body.userId) {
      return NextResponse.json({
        message: "teacherId is required",
        status: "failed",
      });
    }
    if (body.role == "student") {
      console.log("okkkk");
      const classes = await prisma.classes.findMany({});
      const studentClasses = classes.filter(
        (classItem) =>
          Array.isArray(classItem.studentId) &&
          classItem.studentId.some(
            (student: any) => student?.id === body.userId
          )
      );
      console.log(studentClasses);
      return NextResponse.json({
        status: "success",
        data: studentClasses,
      });
    } else {
      const classData = await prisma.classes.findMany({
        where: {
          teacherId: body.userId,
        },
      });
      if (!classData) {
        return NextResponse.json({
          message: "Class not found",
          status: "failed",
        });
      }
      console.log(classData);
      return NextResponse.json({
        message: "Class found",
        status: "success",
        data: classData,
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};
