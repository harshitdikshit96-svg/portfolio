"use server";

import crypto from "node:crypto";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/session";

function passwordMatches(input, expected) {
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  // Constant-time compare — see the matching note in lib/session.js.
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function login(prevState, formData) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return { error: "Admin login isn't configured yet — set ADMIN_PASSWORD in the environment." };
  }
  const password = formData.get("password");
  if (typeof password !== "string" || !password || !passwordMatches(password, expected)) {
    return { error: "Incorrect password." };
  }
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
