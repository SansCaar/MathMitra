"use server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NEXT_DATABASE_URL } from "@src/config/mongoCongig";
const JWT_TOKEN =
  "cd7e8db55cc57f5b21d71eb9aaa13b642e7d466ba1f41c38543da44ed1d092a271da238102c874c4e6bf4bddfa2342be12aa255074676a2db8dd17427585e14f";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
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
