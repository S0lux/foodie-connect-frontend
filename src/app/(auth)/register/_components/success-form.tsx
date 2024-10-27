import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SuccessForm() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-slate-200 p-2 dark:bg-slate-50">
        <Check className="h-[150px] w-[150px] text-primary" />
      </div>
      <h1 className="p-4 text-4xl font-bold text-primary">Successfully</h1>
      <p>Your account has been created Successfully.</p>
      <Button type="submit" className="!mt-6 w-full" size={"lg"}>
        <Link className="flex size-full items-center justify-center" href="/">
          Back to Home Page
        </Link>
      </Button>
    </div>
  );
}
