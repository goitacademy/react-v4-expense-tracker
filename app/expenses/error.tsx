"use client";

import { MessagePanel } from "@/components/MessagePanel/MessagePanel";

type ExpensesErrorProps = {
  error: unknown;
  retry: () => void;
};

export default function ExpensesError({ retry }: ExpensesErrorProps) {
  return (
    <MessagePanel
      title="Something went wrong"
      text="We could not load your expenses. Try again in a moment."
      role="alert"
    >
      <button className="button buttonSecondary" type="button" onClick={retry}>
        Try again
      </button>
    </MessagePanel>
  );
}
