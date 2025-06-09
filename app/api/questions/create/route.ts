import { PrismaClient } from "@prisma/client";
import express from "express";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json({
        message: "Fields are Required",
        status: "failed",
        body: "ok",
      });
    }
    const createQuestion = await prisma.question.create({
      data: {
        question: body.question,
        answer: body.answer,
        assignmentId: body.assignmentId,
        teacherId: body.teacherId,
        classCode: body.classCode,
        submissionsCount: body.submissionsCount,
      },
    });
    console.log(createQuestion);
    return NextResponse.json({
      message: "Class created",
      status: "success",
      body: createQuestion,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};
