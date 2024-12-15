import VerificationEmail from "@/app/(auth)/email/_components/verification-email";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <VerificationEmail />{" "}
    </Suspense>
  );
}
