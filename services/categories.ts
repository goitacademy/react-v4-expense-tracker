import { cookies } from "next/headers";
import { cacheLife } from "next/cache";
import type { Category } from "@/types/expense";

export async function getCategories() {
  const cookieStore = await cookies();
  return fetchCategories(cookieStore.toString());
}

async function fetchCategories(cookie: string) {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${process.env.API_URL}/categories`, {
    headers: { Cookie: cookie },
  });

  if (!res.ok) {
    throw new Error("Failed to load categories");
  }

  const categories: Category[] = await res.json();
  return categories;
}
