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

  const res = await fetch(`${process.env.API_URL}/expenses?${searchParams}`);

  if (!res.ok) {
    throw new Error("Failed to load expenses");
  }

  const data: ExpensesResponse = await res.json();
  return data;
}

export async function getExpenseById(id: string) {
  const res = await fetch(`${process.env.API_URL}/expenses/${id}`);

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

  const res = await fetch(
    `${process.env.API_URL}/expenses/summary?${searchParams}`,
  );

  if (!res.ok) {
    throw new Error("Failed to load the summary");
  }

  const summary: ExpenseSummary = await res.json();
  return summary;
}

export async function getExpenseYears() {
  const res = await fetch(`${process.env.API_URL}/expenses/years`);

  if (!res.ok) {
    throw new Error("Failed to load the years");
  }

  const data: ExpenseYears = await res.json();
  return data.years;
}

export async function deleteExpense(id: string) {
  const res = await fetch(`${process.env.API_URL}/expenses/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete the expense");
  }
}

export async function createExpense(payload: ExpensePayload) {
  const res = await fetch(`${process.env.API_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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
  const res = await fetch(`${process.env.API_URL}/expenses/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(
      errorData.message ?? "Could not save the expense. Try again.",
    );
  }
}
