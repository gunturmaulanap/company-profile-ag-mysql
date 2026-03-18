"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { signInAction } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = {
  error: null as string | null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      size="lg"
      className="w-full bg-[#011f37] text-white hover:bg-blue-950 transition-colors shadow-md"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Signing in...</span>
        </>
      ) : (
        <span>Sign In</span>
      )}
    </Button>
  );
}

export default function LoginForm({
  initialError = null,
}: {
  initialError?: string | null;
}) {
  const [state, formAction] = useActionState(signInAction, {
    ...initialState,
    error: initialError,
  });

  return (
    <div className="min-h-dvh bg-slate-50 font-sans selection:bg-[#011f37] selection:text-white">
      <div className="flex min-h-dvh flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/" className="flex justify-center mb-2">
            <h1 className="text-3xl font-black tracking-tight text-[#011f37]">
              Adibayu Group
            </h1>
          </Link>
          <h2 className="mt-2 text-center text-sm font-bold text-slate-500 uppercase tracking-widest">
            Admin Dashboard
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="border border-slate-200 bg-white px-6 py-10 shadow-2xl sm:rounded-2xl sm:px-12">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900">
                Welcome back
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Sign in to access the content management dashboard.
              </p>
            </div>

            {state.error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <span className="font-medium">{state.error}</span>
              </div>
            )}

            <form action={formAction} className="space-y-6">
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-slate-900"
                >
                  Email Address
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="admin@adibayu.com"
                    className="h-10 w-full rounded-md border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 shadow-sm dark:border-slate-200 dark:bg-white dark:text-slate-900 dark:placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#011f37] focus-visible:ring-offset-1 focus-visible:border-slate-200 dark:focus-visible:ring-[#011f37]"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-semibold leading-6 text-slate-900"
                >
                  Password
                </Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="•••••••••"
                    className="h-10 w-full rounded-md border-slate-200 bg-white px-3 text-slate-900 placeholder:text-slate-400 shadow-sm dark:border-slate-200 dark:bg-white dark:text-slate-900 dark:placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#011f37] focus-visible:ring-offset-1 focus-visible:border-slate-200 dark:focus-visible:ring-[#011f37]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <SubmitButton />
              </div>
            </form>

            <div className="mt-8 border-t border-slate-200 pt-6 flex justify-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#011f37]"
              >
                <svg
                  className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to homepage
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400 font-medium tracking-wide">
            © {new Date().getFullYear()} Adibayu Group. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
