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
    const classCode = Math.floor(Math.random() * 100000);

    const createClass = await prisma.classes.create({
      data: {
        name: body.name,
        subject: body.subject,
        section: body.section,
        description: body.description,
        teacherId: body.teacherId,
        classCode: classCode,
      },
    });
    console.log(createClass);
    return NextResponse.json({
      message: "Class created",
      status: "success",
      body: createClass,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};
