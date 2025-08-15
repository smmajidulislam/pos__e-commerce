"use client";
import React from "react";
import { useForm } from "react-hook-form";

const Filtering = ({ onSubmit, defaultValues, children }) => {
  const { handleSubmit, reset, register } = useForm({
    defaultValues: defaultValues || {},
  });

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-2"
    >
      {children(register)} {/* register child-এ পাঠানো */}
      <button type="submit" className=" hidden  p-2 rounded mt-2">
        Submit
      </button>
    </form>
  );
};

export default Filtering;
