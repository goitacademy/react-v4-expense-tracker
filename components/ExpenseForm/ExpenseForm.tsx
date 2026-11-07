"use client";

import { useEffect, useId } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Category, Expense } from "@/types/expense";
import { expenseFormSchema, type ExpenseFormValues } from "@/schemas/expenses";
import { createExpenseAction, updateExpenseAction } from "@/actions/expenses";
import styles from "./ExpenseForm.module.css";

type ExpenseFormProps = {
  title: string;
  categories: Category[];
  expense?: Expense;
};

export function ExpenseForm({ title, categories, expense }: ExpenseFormProps) {
  const titleId = useId();
  const amountId = useId();
  const dateId = useId();
  const categorySelectId = useId();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(expenseFormSchema),
    mode: "onTouched",
    defaultValues: {
      title: expense?.title ?? "",
      amount: expense ? expense.amount / 100 : "",
      date: expense?.date ?? "",
      categoryId: expense?.category.id ?? "",
    },
  });

  const isNew = !expense;

  useEffect(() => {
    if (!isNew) {
      return;
    }

    return () => reset();
  }, [isNew, reset]);

  const handleFormSubmit = async (values: ExpenseFormValues) => {
    const result = expense
      ? await updateExpenseAction(expense.id, values)
      : await createExpenseAction(values);

    setError("root", { message: result.error });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <h1 className={styles.title}>{title}</h1>

      <div className="field">
        <label className="label" htmlFor={titleId}>
          Title
        </label>
        <input
          className="input"
          id={titleId}
          maxLength={100}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? `${titleId}-error` : undefined}
          {...register("title")}
        />
        {errors.title && (
          <p className="fieldError" id={`${titleId}-error`}>
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor={amountId}>
          Amount, ₴
        </label>
        <input
          className="input"
          id={amountId}
          type="number"
          step="0.01"
          aria-invalid={!!errors.amount}
          aria-describedby={errors.amount ? `${amountId}-error` : undefined}
          {...register("amount")}
        />
        {errors.amount && (
          <p className="fieldError" id={`${amountId}-error`}>
            {errors.amount.message}
          </p>
        )}
      </div>

      <div className={styles.row}>
        <div className="field">
          <label className="label" htmlFor={dateId}>
            Date
          </label>
          <input
            className="input"
            id={dateId}
            type="date"
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? `${dateId}-error` : undefined}
            {...register("date")}
          />
          {errors.date && (
            <p className="fieldError" id={`${dateId}-error`}>
              {errors.date.message}
            </p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor={categorySelectId}>
            Category
          </label>
          <select
            className="input"
            id={categorySelectId}
            aria-invalid={!!errors.categoryId}
            aria-describedby={
              errors.categoryId ? `${categorySelectId}-error` : undefined
            }
            {...register("categoryId")}
          >
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="fieldError" id={`${categorySelectId}-error`}>
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      {errors.root && (
        <p className="formError" role="alert">
          {errors.root.message}
        </p>
      )}

      <div className={styles.actions}>
        <button
          className="button buttonPrimary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving…" : "Save expense"}
        </button>
        <Link
          className="button buttonGhost"
          href={expense ? `/expenses/${expense.id}` : "/expenses"}
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
