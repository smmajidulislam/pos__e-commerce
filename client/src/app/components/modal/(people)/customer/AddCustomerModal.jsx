"use client";
import { useCreateCustomerMutation } from "@/app/features/api/customersApi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const AddCustomerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createCustomer] = useCreateCustomerMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    const res = await createCustomer(data).unwrap();
    if (res?.message) {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: res?.data?.message,
        timer: 1000,
        cancelButtonText: "Close",
        cancelButtonColor: "#3085d6",
      });
    }
    reset();
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 bg-green-500 !text-white rounded hover:bg-green-600"
      >
        <FaPlus className="mr-2" /> Add New Customer
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-4">Add New Customer</h2>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {/* First Name */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter password"
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Phone
                </label>
                <input
                  {...register("phone", { required: "Phone is required" })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Address
                </label>
                <input
                  {...register("address", { required: "Address is required" })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter address"
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">
                    {errors.address.message}
                  </span>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  City
                </label>
                <input
                  {...register("city", { required: "City is required" })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <span className="text-red-500 text-sm">
                    {errors.city.message}
                  </span>
                )}
              </div>

              {/* Zip */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Zip
                </label>
                <input
                  {...register("zip", { required: "Zip is required" })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter zip code"
                />
                {errors.zip && (
                  <span className="text-red-500 text-sm">
                    {errors.zip.message}
                  </span>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block mb-1 font-semibold text-gray-700">
                  Country
                </label>
                <input
                  {...register("country", { required: "Country is required" })}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter country"
                />
                {errors.country && (
                  <span className="text-red-500 text-sm">
                    {errors.country.message}
                  </span>
                )}
              </div>

              {/* Submit Button spanning full width */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 !text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCustomerModal;
