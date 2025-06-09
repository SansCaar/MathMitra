import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({
        message: "Fields are Required",
        status: "failed",
        body: "ok",
      });
    }
    if (!body.teacherId) {
      return NextResponse.json({
        message: "Fields are Required",
        status: "failed",
        body: "ok",
      });
    }
    let groupBy = body.groupBy;
    if (!groupBy) {
      groupBy = "classCode";
    }
    if (groupBy === "classCode") {
      const classData = await prisma.question.findMany({
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
      return NextResponse.json({
        message: "Class found",
        status: "success",
        body: classData,
      });
    }
    if (groupBy === "teacherId") {
      const classData = await prisma.question.findMany({
        where: {
          teacherId: body.teacherId,
        },
      });
      if (!classData) {
        return NextResponse.json({
          message: "Class not found",
          status: "failed",
        });
      }
      return NextResponse.json({
        message: "Class found",
        status: "success",
        body: classData,
      });
    }
    if (groupBy === "assignmentId") {
      const classData = await prisma.question.findMany({
        where: {
          assignmentId: body.assignmentId,
        },
      });
      if (!classData) {
        return NextResponse.json({
          message: "Class not found",
          status: "failed",
        });
      }
      return NextResponse.json({
        message: "Class found",
        status: "success",
        body: classData,
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
