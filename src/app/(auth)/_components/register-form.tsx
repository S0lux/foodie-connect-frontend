"use client";
import { MultiForm } from "@/app/(auth)/register/_components/multi-form";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  const [type, setType] = useState("Head");
  const [hideForm, setHideForm] = useState(false);
  const changeForm = () => {
    setHideForm(!hideForm);
  };
  return (
    <div className="rounded-md pb-12 pl-6 pr-6 pt-4 shadow-2xl md:mt-auto md:pl-12 md:pr-12">
      {!hideForm ? (
        <div>
          <h1 className="p-4 text-center text-5xl font-bold text-primary">
            Register
          </h1>
          <div className="flex flex-col gap-y-2 p-4 pl-2 pr-2">
            <p className="text-[16px] font-bold">
              Choose the account type you want to use:
            </p>
            <Select
              onValueChange={() => {
                setType(type === "Head" ? "User" : "Head");
              }}
            >
              <SelectTrigger className="flex h-[48px] w-full items-center">
                <SelectValue placeholder="Head" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel></SelectLabel>
                  <SelectItem className="hover:cursor-pointer" value="Head">
                    Head
                  </SelectItem>
                  <SelectItem className="hover:cursor-pointer" value="User">
                    User
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              className="mt-2 h-[48px] w-full rounded-xl bg-primary text-[16px] font-bold text-white hover:bg-primary/90"
              onClick={() => changeForm()}
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <MultiForm type={type} />
      )}
    </div>
  );
};

export default RegisterForm;
