import type { Category } from "@/types/expense";

export async function getCategories() {
  const res = await fetch(`${process.env.API_URL}/categories`, {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error("Failed to load categories");
  }

  const categories: Category[] = await res.json();
  return categories;
}
