"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuth from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { ErrorType } from "@/types/error.type";
import { set } from "date-fns";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface VerificationResultProps {
  status: "success" | "failure";
  message?: string;
}

export default function VerificationResult({
  status,
  message = "Unknown verification error",
}: VerificationResultProps) {
  const resendVerification = useAuth.useSendEmailVerification();
  const router = useRouter();

  const resendEmail = async () => {
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
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            {status === "success"
              ? "Email Verification Successful"
              : "Email Verification Failed"}
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === "success" ? (
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
                  Your email has been successfully verified. You can now access
                  all features of our platform.
                </p>
              </div>
              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
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
                <p className="mb-6 text-gray-600">{message}</p>
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
                  variant="outline"
                  className="w-full"
                  onClick={() => resendEmail()}
                >
                  Resend Verification Email
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
