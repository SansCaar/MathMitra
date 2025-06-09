import { PrismaClient } from "@prisma/client";
import express from "express";
import { get } from "http";
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
    let getQuestion = await prisma.question.findUnique({
      where: {
        id: body.questionId,
      },
    });
    if (!getQuestion) {
      return NextResponse.json({
        message: "Question not found",
        status: "failed",
      });
    }
    const submittedId = getQuestion.submittedId;
    console.log(submittedId);
    const toupdateData = {
      id: submittedId,
      time: new Date(),
      date: new Date(),
    };
    const submit = await prisma.question.update({
      where: {
        id: body.questionId,
      },
      data: {
        submittedId: {
          ...(typeof getQuestion.submittedId === "object"
            ? getQuestion.submittedId
            : {}),
          toupdateData,
        },
      },
    });
    console.log(submit);
    return NextResponse.json({
      message: "Class created",
      status: "success",
      body: submit,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};
