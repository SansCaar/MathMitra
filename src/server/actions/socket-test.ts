"use server";

import { io } from "@src/express/server";

export const testSocket = async () => {
  io.emit("test", "test");
};
