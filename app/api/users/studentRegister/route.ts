"use server";
import { NextApiResponse } from "next";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_TOKEN =
  "cd7e8db55cc57f5b21d71eb9aaa13b642e7d466ba1f41c38543da44ed1d092a271da238102c874c4e6bf4bddfa2342be12aa255074676a2db8dd17427585e14f";
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    console.log("ok");
    const body = await req.json();
    if (!body) {
      return NextResponse.json({
        message: "Fields are Required",
        status: "failed",
        body: "ok",
      });
    }
    const serverToken = JWT_TOKEN;
    if (!serverToken) {
      return NextResponse.json({
        message: "Missing Server Token",
        status: "failed",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const checkExisting = await prisma.student.findFirst({
      where: {
        email: body.email,
      },
    });
    if (checkExisting) {
      return NextResponse.json({
        message: "Email Already Exists",
        status: "failed",
      });
    } else {
      const user = await prisma.student.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
        },
      });

      const userToken = jwt.sign(
        {
          userId: user?.id,
          role: "user",
        },
        serverToken,
        {
          expiresIn: "10d",
        }
      );

      return NextResponse.json({
        message: "Succesfully registered",
        status: "success",
        token: userToken,
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
