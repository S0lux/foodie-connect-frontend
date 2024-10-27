import { MultiStepContenxtProvider } from "@/contexts/multistep-form-context";
import { ReactNode } from "react";

interface MultiStepFormLayout {
  children: ReactNode;
}

export default function MultiStepFormLayout({ children }: MultiStepFormLayout) {
  return <MultiStepContenxtProvider>{children}</MultiStepContenxtProvider>;
}
