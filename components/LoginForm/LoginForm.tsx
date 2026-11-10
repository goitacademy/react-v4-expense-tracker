"use client";

import { useEffect, useId } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema, type AuthFormValues } from "@/schemas/auth";
import { loginAction } from "@/actions/auth";
import styles from "./LoginForm.module.css";

export function LoginForm() {
  const emailId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(authFormSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const handleFormSubmit = async (values: AuthFormValues) => {
    const result = await loginAction(values);

    setError("root", { message: result.error });
  };

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={styles.heading}>
        <h1 className={styles.title}>Log in</h1>
        <p className={styles.text}>Log in to see your expenses.</p>
      </div>

      <div className="field">
        <label className="label" htmlFor={emailId}>
          Email
        </label>
        <input
          className="input"
          id={emailId}
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p className="fieldError" id={`${emailId}-error`}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor={passwordId}>
          Password
        </label>
        <input
          className="input"
          id={passwordId}
          type="password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? `${passwordId}-error` : undefined}
          {...register("password")}
        />
        {errors.password && (
          <p className="fieldError" id={`${passwordId}-error`}>
            {errors.password.message}
          </p>
        )}
      </div>

      {errors.root && (
        <p className="formError" role="alert">
          {errors.root.message}
        </p>
      )}

      <button
        className={`button buttonPrimary ${styles.submit}`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in…" : "Log in"}
      </button>

      <p className={styles.switch}>
        No account yet? <Link href="/register">Sign up</Link>
      </p>
    </form>
  );
}
