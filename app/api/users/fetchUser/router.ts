import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

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
    let classData;
    if (body?.role == "teacher") {
      classData = await prisma.teacher.findUnique({
        where: {
          id: body?.userId,
        },
      });
    } else {
      classData = await prisma.student.findUnique({
        where: {
          id: body.userId,
        },
      });
    }
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
