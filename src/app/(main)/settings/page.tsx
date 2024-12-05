import SettingForm from "@/app/(main)/settings/_components/setting-form";
import React from "react";

export default function SettingPage() {
  return (
    <div className="relative w-full">
      <img
        src={"/images/auth-image.png"}
        alt=""
        className="absolute right-0 top-0 -z-10 opacity-15"
      ></img>
      {/* <h2 className="pl-10 text-left text-2xl font-bold">User Settings</h2> */}
      <div className="w-full">
        <SettingForm />
      </div>
    </div>
  );
}
