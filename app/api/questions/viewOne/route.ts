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
    const classData = await prisma.question.findUnique({
      where: {
        id: body.questionId,
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
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};
