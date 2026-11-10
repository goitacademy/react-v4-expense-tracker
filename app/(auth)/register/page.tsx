import type { Metadata } from "next";
import { RegisterForm } from "@/components/RegisterForm/RegisterForm";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
