import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ExpenseDetails } from "@/components/ExpenseDetails/ExpenseDetails";
import { getExpenseById } from "@/services/expenses";
import { MessagePanel } from "@/components/MessagePanel/MessagePanel";

export default function ExpensePage({ params }: PageProps<"/expenses/[id]">) {
  return (
    <Suspense fallback={<MessagePanel text="Loading…" role="status" />}>
      <ExpenseContent params={params} />
    </Suspense>
  );
}

type ExpenseContentProps = Pick<PageProps<"/expenses/[id]">, "params">;

async function ExpenseContent({ params }: ExpenseContentProps) {
  const { id } = await params;
  const expense = await getExpenseById(id);

  if (!expense) {
    notFound();
  }

  return <ExpenseDetails expense={expense} />;
}
