"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  width: number;
  height: number;
  className?: string;
}

export default function Logo({ width, height, className }: LogoProps) {
  const { theme } = useTheme();

  const imageClasses = cn("transition-all duration-200 ease-in-out", className);

  if (theme === "dark") {
    return (
      <Link href="/" className="flex items-center justify-center">
        <Image
          src={`/images/logo-dark.png`}
          quality={100}
          alt="Logo"
          width={width}
          height={height}
          className={imageClasses}
        />
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center justify-center">
      <Image
        src={`/images/logo-light.png`}
        quality={100}
        alt="Logo"
        width={width}
        height={height}
        className={imageClasses}
      />
    </Link>
  );
}
