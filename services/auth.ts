import { cookies } from "next/headers";
import { parseSetCookie } from "set-cookie-parser";
import type { AuthFormValues } from "@/schemas/auth";
import type { Session } from "@/types/session";

type ErrorResponse = {
  message?: string;
};

function getSession(res: Response): Session {
  const cookie = parseSetCookie(res, { map: true }).session;

  if (!cookie) {
    throw new Error("Could not start a session. Try again.");
  }

  return { value: cookie.value, maxAge: cookie.maxAge };
}

export async function registerUser(values: AuthFormValues) {
  const res = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message ?? "Could not sign up. Try again.");
  }

  return getSession(res);
}

export async function loginUser(values: AuthFormValues) {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.message ?? "Could not log in. Try again.");
  }

  return getSession(res);
}

export async function logoutUser() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.API_URL}/auth/logout`, {
    method: "POST",
    headers: { Cookie: cookieStore.toString() },
  });

  if (!res.ok) {
    throw new Error("Could not log out. Try again.");
  }
}
