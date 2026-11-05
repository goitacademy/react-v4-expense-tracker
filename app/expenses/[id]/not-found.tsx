import Link from "next/link";
import { MessagePanel } from "@/components/MessagePanel/MessagePanel";

export default function ExpenseNotFound() {
  return (
    <MessagePanel
      title="Expense not found"
      text="It may have been deleted, or the link is wrong."
    >
      <Link href="/expenses" className="button buttonSecondary">
        Back to expenses
      </Link>
    </MessagePanel>
  );
}
