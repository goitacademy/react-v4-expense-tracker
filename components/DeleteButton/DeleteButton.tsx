"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteExpenseAction } from "@/actions/expenses";

type DeleteButtonProps = {
  expenseId: string;
};

export function DeleteButton({ expenseId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = async () => {
    setIsDeleting(true);
    await deleteExpenseAction(expenseId);
  };

  return (
    <button
      className="button buttonDanger"
      type="button"
      disabled={isDeleting}
      onClick={handleClick}
    >
      <Trash2 size={18} aria-hidden />
      {isDeleting ? "Deleting…" : "Delete"}
    </button>
  );
}
