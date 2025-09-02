"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaEnvelope, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { useLoginMutation } from "@/app/features/api/userApi";
import sawal from "sweetalert2";
import { useUser } from "@/app/utils/saveUser/user";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "", password: "", remember: false },
    mode: "onTouched",
  });
  const { saveUser } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  // RTK Query mutation hook
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      setServerError("");
      const payload = {
        email: values.email,
        password: values.password,
      };

      const res = await login(payload).unwrap();

      if (res?.message) {
        saveUser(res?.user);
        sawal.fire({
          icon: "success",
          title: "Success!",
          text: res?.data?.message,
          timer: 1000,
          cancelButtonText: "Close",
          cancelButtonColor: "#3085d6",
        });
        router.push("/shop");
      }

      reset();
    } catch (error) {
      sawal.fire(
        "Error!",
        error?.data?.message || "Invalid credentials",
        "error"
      );
      setServerError(error?.data?.message || "Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-600 mt-2 text-sm sm:text-base">
            Sign in to continue to your account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-md ring-1 ring-slate-100 p-6 space-y-5"
        >
          {serverError && (
            <div className="text-sm rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">
              {serverError}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-10 text-base outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                    message: "Enter a valid email",
                  },
                })}
                aria-invalid={!!errors.email}
              />
              <FaEnvelope className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-slate-700 hover:text-slate-900 underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mt-1 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-10 text-base outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-slate-500" />
                ) : (
                  <FaEye className="h-5 w-5 text-slate-500" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me + Register */}
          <div className="flex items-center justify-between pt-1">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-200"
                {...register("remember")}
              />
              Remember me
            </label>
            <Link
              href="/register"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 underline"
            >
              Create account
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 !text-white font-medium shadow-sm hover:opacity-95 active:opacity-90 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaSignInAlt className="h-5 w-5" />
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Mobile bottom links */}
        <div className="mt-6 flex items-center justify-center gap-2 md:hidden text-sm">
          <span className="text-slate-600">New here?</span>
          <Link href="/register" className="font-medium underline">
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}
