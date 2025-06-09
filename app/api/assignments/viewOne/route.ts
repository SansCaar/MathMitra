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
    if (!body.assignmentId) {
      return NextResponse.json({
        message: "Fields are Required",
        status: "failed",
        body: "ok",
      });
    }
    const assignmentId = body.assignmentId;
    const assignmentData = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
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
