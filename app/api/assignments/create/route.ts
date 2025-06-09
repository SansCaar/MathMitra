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
    const createAssignment = await prisma.assignment.create({
      data: {
        title: body.title,
        description: body.description,
        classCode: body.classCode,
        dueDate: body.dueDate,
        questionId: body.questionId,
        teacherId: body.teacherId,
        submissionCount: 0,
        
      },
    });
    console.log(createAssignment);
    return NextResponse.json({
      message: "Assignment created",
      status: "success",
      body: createAssignment,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};
