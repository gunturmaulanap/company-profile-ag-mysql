"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";

function isRedirectErrorLike(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export async function signInAction(
  prevState: { error: string | null; success: boolean },
  formData: FormData,
) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return {
      error: "Missing credentials",
      success: false,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Successful login - redirect to admin
    redirect("/admin");
  } catch (error) {
    if (isRedirectErrorLike(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      return {
        error: "Invalid email or password",
        success: false,
      };
    }

    return {
      error: "An unexpected error occurred",
      success: false,
    };
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
