import { cookies } from "next/headers";
import type { User } from "@/types/user";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.API_URL}/users/me`, {
    headers: { Cookie: cookieStore.toString() },
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to load the user");
  }

  const user: User = await res.json();
  return user;
}
