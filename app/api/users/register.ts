"use server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Fields are Required",
        status: "failed",
        body: "ok",
      });
    }
    const serverToken = process.env.JWT_TOKEN;
    if (!serverToken) {
      return res.status(500).send({
        message: "Missing Server Token",
        status: "failed",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const checkExisting = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (checkExisting) {
      res.status(400).send({
        message: "Email Already Exists",
        status: "failed",
      });
    } else {
      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
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
        },
      );

      res.status(200).send({
        message: "Succesfully registered",
        status: "success",
        token: userToken,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
