"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

import useAuth from "@/hooks/use-auth";
import { VerifyEmailBodyType } from "@/schema/auth.schema";
import { ErrorType } from "@/types/error.type";
import Loader from "@/components/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import authAction from "@/apis/auth.api";

export default function VerificationEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const resendVerification = useAuth.useSendEmailVerification();

  // Simplified state management
  const [verificationState, setVerificationState] = useState<{
    status: "idle" | "loading" | "success" | "failure";
    message?: string;
  }>({
    status: "idle",
    message: undefined,
  });

  const [loading, setLoading] = useState(false);

  const verifyEmail = async (emailToken: VerifyEmailBodyType) => {
    // Prevent multiple verification attempts
    if (verificationState.status === "loading") return;

    setVerificationState({ status: "loading" });

    try {
      const result = await authAction.verifyEmail(emailToken);
      setVerificationState({
        status: "success",
        message: result.message ?? "Email verified successfully",
      });
    } catch (error) {
      setVerificationState({
        status: "failure",
        message: (error as ErrorType).message ?? "Verification failed",
      });
    }
  };

  const resendEmail = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await resendVerification.mutateAsync();
      toast({
        title: "Success",
        description: result.message ?? "Verification email sent successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as ErrorType).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token")?.replace(/ /g, "+");

    // Single verification attempt with proper token
    if (token && verificationState.status === "idle") {
      verifyEmail({ emailToken: token });
    }
  }, [searchParams, verificationState.status]);

  // Loading state
  if (
    verificationState.status === "loading" ||
    verificationState.status === "idle"
  ) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            {verificationState.status === "success"
              ? "Email Verification Successful"
              : "Email Verification Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {verificationState.status === "success" ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle2
                  className="h-24 w-24 text-green-600"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-green-700">
                  Verification Complete
                </h2>
                <p className="mb-6 text-gray-600">
                  {verificationState.message ||
                    "Your email has been successfully verified."}
                </p>
              </div>
              <div className="space-y-4">
                <Button asChild className="w-full" size={"lg"}>
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <XCircle className="h-24 w-24 text-red-600" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-red-700">
                  Verification Failed
                </h2>
                <p className="mb-6 text-gray-600">
                  {verificationState.message || "Unable to verify email."}
                </p>
              </div>
              <div className="space-y-4">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => router.refresh()}
                >
                  Try Again
                </Button>
                <Button
                  className="w-full"
                  onClick={() => resendEmail()}
                  disabled={loading}
                >
                  {loading ? "Resending..." : "Resend Verification Email"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
