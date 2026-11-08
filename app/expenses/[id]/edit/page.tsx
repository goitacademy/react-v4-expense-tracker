import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExpenseForm } from "@/components/ExpenseForm/ExpenseForm";
import { getExpenseById } from "@/services/expenses";
import { getCategories } from "@/services/categories";
import { MessagePanel } from "@/components/MessagePanel/MessagePanel";

export const metadata: Metadata = {
  title: "Edit expense",
};

export default function EditExpensePage({
  params,
}: PageProps<"/expenses/[id]/edit">) {
  return (
    <Suspense fallback={<MessagePanel text="Loading…" role="status" />}>
      <EditExpenseContent params={params} />
    </Suspense>
  );
}

type EditExpenseContentProps = Pick<PageProps<"/expenses/[id]/edit">, "params">;

async function EditExpenseContent({ params }: EditExpenseContentProps) {
  const { id } = await params;
  const [expense, categories] = await Promise.all([
    getExpenseById(id),
    getCategories(),
  ]);

  if (!expense) {
    notFound();
  }

  return (
    <ExpenseForm
      title="Edit expense"
      categories={categories}
      expense={expense}
    />
  );
}
