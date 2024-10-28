import SettingForm from "@/app/(main)/settings/_components/setting-form";
import React from "react";

export default function SettingPage() {
  return (
    <div className="w-full">
      <h2 className="pl-10 text-left text-2xl font-bold">User Settings</h2>
      <div className="w-full">
        <SettingForm />
      </div>
    </div>
  );
}
