"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useCreateUserMutation } from "@/app/features/api/userApi";
import sawal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [createUser] = useCreateUserMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    // ফাইনাল payload বানানো
    const payload = {
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    try {
      const res = await createUser(payload).unwrap();
      if (res?.message) {
        sawal.fire({
          icon: "success",
          title: "Success!",
          text: res?.data?.message,
          timer: 1000,
          cancelButtonText: "Close",
          cancelButtonColor: "#3085d6",
        });
        router.push("/login");
      }
      reset();
    } catch (error) {
      sawal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message,
        timer: 1000,
        cancelButtonText: "Close",
        cancelButtonColor: "#3085d6",
      });
    }
  };

  const password = watch("password");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.fullName && (
              <p className="text-xs text-red-600 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.phone && (
              <p className="text-xs text-red-600 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 !text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
