import { Suspense } from "react";
import type { Metadata } from "next";
import { ExpenseForm } from "@/components/ExpenseForm/ExpenseForm";
import { getCategories } from "@/services/categories";
import { MessagePanel } from "@/components/MessagePanel/MessagePanel";

export const metadata: Metadata = {
  title: "New expense",
};

export default function NewExpensePage() {
  return (
    <Suspense fallback={<MessagePanel text="Loading…" role="status" />}>
      <NewExpenseContent />
    </Suspense>
  );
}

async function NewExpenseContent() {
  const categories = await getCategories();

  return <ExpenseForm title="New expense" categories={categories} />;
}
