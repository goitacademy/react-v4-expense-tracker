import { cacheLife } from "next/cache";
import type { Category } from "@/types/expense";

export async function getCategories() {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${process.env.API_URL}/categories`);

  if (!res.ok) {
    throw new Error("Failed to load categories");
  }

  const categories: Category[] = await res.json();
  return categories;
}
