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
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};
