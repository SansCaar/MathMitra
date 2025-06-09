import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    console.log("HELLOOOOOOO");
    console.log(body);
    if (!body) {
      return NextResponse.json({
        message: "Fields are Required",
        status: "failed",
        body: "ok",
      });
    }
    if (body.returnResBy == "teacher") {
      if (!body.teacherId) {
        return NextResponse.json({
          message: "Fields are Required",
          status: "failed",
          body: "ok",
        });
      }
      const teacherId = body.teacherId;
      const assignmentData = await prisma.assignment.findMany({
        where: {
          teacherId: teacherId,
        },
      });
      if (!assignmentData) {
        return NextResponse.json({
          message: "Assignment not found",
          status: "failed",
        });
      }
      return NextResponse.json({
        message: "Assignment found",
        status: "success",
        body: assignmentData,
      });
    }
    if (body.returnResBy == "classCode") {
      if (!body.classCode) {
        return NextResponse.json({
          message: "Fields are Required",
          status: "failed",
          body: "ok",
        });
      }
      const classCode = body.classCode;
      const assignmentData = await prisma.assignment.findMany({
        where: {
          classCode: classCode,
        },
      });
      if (!assignmentData) {
        return NextResponse.json({
          message: "Assignment not found",
          status: "failed",
        });
      }
      return NextResponse.json({
        message: "Assignment found",
        status: "success",
        body: assignmentData,
      });
    }
    if (body.returnResBy == "studentId") {
      if (!body.studentId) {
        return NextResponse.json({
          message: "Fields are Required",
          status: "failed",
          body: "ok",
        });
      }

      console.log("ok");
      const studentId = body.studentId;
      const classes = await prisma.classes.findMany({});

      // Type for student data in the JSON array
      type StudentData = {
        id: string;
        [key: string]: any;
      };

      const studentClasses = classes.filter(
        (classItem) =>
          Array.isArray(classItem.studentId) &&
          classItem.studentId.some((student: any) => student?.id === studentId)
      );

      console.log(studentClasses);
      // Get assignments for all classes the student is part of
      const assignments = await prisma.assignment.findMany({
        where: {
          classCode: {
            in: studentClasses
              .map((classItem) => classItem.classCode)
              .filter((code): code is number => code !== null),
          },
        },
      });
      console.log(assignments);

      return NextResponse.json({
        status: "success",
        data: assignments,
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
