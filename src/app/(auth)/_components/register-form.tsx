"use client";
import { MultiForm } from "@/app/(auth)/register/_components/multi-form";
import React from "react";

const RegisterForm = () => {
  return (
    <div className="rounded-md pb-12 pl-6 pr-6 pt-4 shadow-2xl md:mt-auto md:pl-12 md:pr-12">
      {/* <h1 className="p-4 text-center text-5xl font-bold text-primary">
        Register
      </h1> */}
      <MultiForm />
    </div>
  );
};

export default RegisterForm;
