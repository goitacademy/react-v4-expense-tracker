import { cookies } from "next/headers";
import type {
  Expense,
  ExpenseSummary,
  ExpenseYears,
  ExpensesQuery,
  ExpensePayload,
  ExpensesResponse,
} from "@/types/expense";

type ErrorResponse = {
  message?: string;
};

export async function getExpenses(query: ExpensesQuery) {
  const searchParams = new URLSearchParams();

  if (query.search) {
    searchParams.set("search", query.search);
  }

  if (query.category) {
    searchParams.set("category", query.category);
  }

  if (query.month) {
    searchParams.set("month", query.month);
  }

  if (query.page) {
    searchParams.set("page", query.page);
  }

  const cookieStore = await cookies();
  const res = await fetch(`${process.env.API_URL}/expenses?${searchParams}`, {
    headers: { Cookie: cookieStore.toString() },
  });

  if (!res.ok) {
    throw new Error("Failed to load expenses");
  }

  const data: ExpensesResponse = await res.json();
  return data;
}

export async function getExpenseById(id: string) {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.API_URL}/expenses/${id}`, {
    headers: { Cookie: cookieStore.toString() },
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

export async function getExpenseSummary(month?: string) {
  const searchParams = new URLSearchParams();

  if (month) {
    searchParams.set("month", month);
  }

  const cookieStore = await cookies();
  const res = await fetch(
    `${process.env.API_URL}/expenses/summary?${searchParams}`,
    { headers: { Cookie: cookieStore.toString() } },
  );

  if (!res.ok) {
    throw new Error("Failed to load the summary");
  }

  const summary: ExpenseSummary = await res.json();
  return summary;
}

export async function getExpenseYears() {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.API_URL}/expenses/years`, {
    headers: { Cookie: cookieStore.toString() },
  });

  if (!res.ok) {
    throw new Error("Failed to load the years");
  }

  const data: ExpenseYears = await res.json();
  return data.years;
}

export async function deleteExpense(id: string) {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.API_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: { Cookie: cookieStore.toString() },
  });

  if (!res.ok) {
    throw new Error("Failed to delete the expense");
  }
}

export async function createExpense(payload: ExpensePayload) {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(
      errorData.message ?? "Could not save the expense. Try again.",
    );
  }
}

export async function updateExpense(id: string, payload: ExpensePayload) {
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.API_URL}/expenses/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(
      errorData.message ?? "Could not save the expense. Try again.",
    );
  }
}
