"use server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const JWT_TOKEN = process.env.SERVER_TOKEN;
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  console.log(JWT_TOKEN);
  try {
    const body = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "Fields are Required" },
        { status: 400 }
      );
    }
    console.log(body);
    const serverToken = JWT_TOKEN;

    if (!serverToken) {
      return NextResponse.json(
        { message: "Invalid Server Token" },
        { status: 400 }
      );
    }

    const userExists = await prisma.student.findFirst({
      where: {
        email: body.email,
      },
    });
    console.log(userExists);
    if (userExists) {
      let compare = await bcrypt.compare(body.password, userExists.password);
      if (compare) {
        const userToken = jwt.sign(
          {
            userId: userExists?.id,
            role: "admin",
          },

          serverToken,
          {
            expiresIn: "10d",
          }
        );

        return NextResponse.json({
          message: "success",
          status: "success",
          token: userToken,
        });
      } else {
        return NextResponse.json({
          message: "Wrong Password",
          status: "failed",
        });
      }
    } else {
      return NextResponse.json({
        message: "User doesn't exist with the username",
        status: "failed",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Something went wrong",
      status: "failed",
    });
  }
}
