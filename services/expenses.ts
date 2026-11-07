import type {
  Expense,
  ExpenseSummary,
  ExpensesQuery,
  ExpensesResponse,
} from "@/types/expense";

export async function getExpenses(query: ExpensesQuery) {
  const searchParams = new URLSearchParams();

  if (query.search) {
    searchParams.set("search", query.search);
  }

  if (query.category) {
    searchParams.set("category", query.category);
  }

  const res = await fetch(`${process.env.API_URL}/expenses?${searchParams}`, {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error("Failed to load expenses");
  }

  const data: ExpensesResponse = await res.json();
  return data;
}

export async function getExpenseById(id: string) {
  const res = await fetch(`${process.env.API_URL}/expenses/${id}`, {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to load the expense");
  }

  const expense: Expense = await res.json();
  return expense;
}

export async function getExpenseSummary() {
  const res = await fetch(`${process.env.API_URL}/expenses/summary`, {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error("Failed to load the summary");
  }

  const summary: ExpenseSummary = await res.json();
  return summary;
}
