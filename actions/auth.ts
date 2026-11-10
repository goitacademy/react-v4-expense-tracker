"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authFormSchema } from "@/schemas/auth";
import { loginUser, registerUser } from "@/services/auth";
import type { Session } from "@/types/session";

async function saveSession(session: Session) {
  const cookieStore = await cookies();

  cookieStore.set("session", session.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.maxAge,
  });
}

export async function registerAction(values: unknown) {
  const result = authFormSchema.safeParse(values);

  if (!result.success) {
    return { error: "Check your email and password." };
  }

  try {
    const session = await registerUser(result.data);
    await saveSession(session);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Could not sign up. Try again.",
    };
  }

  redirect("/expenses");
}

export async function loginAction(values: unknown) {
  const result = authFormSchema.safeParse(values);

  if (!result.success) {
    return { error: "Check your email and password." };
  }

  try {
    const session = await loginUser(result.data);
    await saveSession(session);
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Could not log in. Try again.",
    };
  }

  redirect("/expenses");
}
