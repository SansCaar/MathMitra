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
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};
