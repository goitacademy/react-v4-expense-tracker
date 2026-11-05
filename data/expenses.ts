import type { Category, Expense } from "@/types/expense";

// Іконки категорій з'являться в уроці «Запити в Next»
const food: Category = { id: "1", name: "Food", iconUrl: "" };
const transport: Category = { id: "2", name: "Transport", iconUrl: "" };
const bills: Category = { id: "3", name: "Bills", iconUrl: "" };
const entertainment: Category = { id: "4", name: "Entertainment", iconUrl: "" };
const shopping: Category = { id: "5", name: "Shopping", iconUrl: "" };

export const expenses: Expense[] = [
  {
    id: "1",
    title: "Weekly groceries",
    amount: 45600,
    date: "2026-10-24",
    category: food,
    createdAt: "2026-10-24T18:12:00.000Z",
    updatedAt: "2026-10-24T18:12:00.000Z",
  },
  {
    id: "2",
    title: "Taxi to the office",
    amount: 18500,
    date: "2026-10-23",
    category: transport,
    createdAt: "2026-10-23T08:40:00.000Z",
    updatedAt: "2026-10-23T08:40:00.000Z",
  },
  {
    id: "3",
    title: "Cinema, two tickets",
    amount: 40000,
    date: "2026-10-21",
    category: entertainment,
    createdAt: "2026-10-21T19:55:00.000Z",
    updatedAt: "2026-10-21T19:55:00.000Z",
  },
  {
    id: "4",
    title: "Internet, October",
    amount: 35000,
    date: "2026-10-15",
    category: bills,
    createdAt: "2026-10-15T12:05:00.000Z",
    updatedAt: "2026-10-15T12:05:00.000Z",
  },
  {
    id: "5",
    title: "Running shoes",
    amount: 189000,
    date: "2026-10-12",
    category: shopping,
    createdAt: "2026-10-12T16:30:00.000Z",
    updatedAt: "2026-10-12T16:30:00.000Z",
  },
];
