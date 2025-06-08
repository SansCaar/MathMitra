"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Fields are Required",
        status: "failed",
      });
    }

    const serverToken = process.env.JWT_TOKEN;
    console.log(req.body);

    if (!serverToken) {
      return res.status(500).send({
        message: "Invalid Server Token",
        status: "failed",
      });
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });
    if (userExists) {
      let compare = await bcrypt.compare(
        req.body.password,
        userExists.password,
      );
      if (compare) {
        const userToken = jwt.sign(
          {
            userId: userExists?.id,
            role: "admin",
          },
          serverToken,
          {
            expiresIn: "10d",
          },
        );

        res.status(200).send({
          message: "success",
          status: "success",
          token: userToken,
        });
      } else {
        res.status(400).send({
          message: "Wrong Password",
          status: "failed",
        });
      }
    } else {
      res.status(400).send({
        message: "User doesn't exist with the username",
        status: "failed",
      });
    }
  } catch (e) {
    console.log(e);
  }
};
