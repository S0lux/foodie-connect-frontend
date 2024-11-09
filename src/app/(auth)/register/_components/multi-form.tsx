"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useMultiContext } from "@/contexts/multistep-form-context";
import { StepOne } from "@/app/(auth)/register/_components/step-one";
import { StepTwo } from "@/app/(auth)/register/_components/step-two";
import { StepThree } from "@/app/(auth)/register/_components/step-three";
import SuccessForm from "@/app/(auth)/register/_components/success-form";
import { RegisterBodyType } from "@/schema/auth.schema";
import useAuth from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ErrorType } from "@/types/error.type";

const stepOneSchema = z.object({
  email: z.string().email("Invalid email."),
});

const stepTwoSchema = z.object({
  displayName: z
    .string()
    .min(2, "The display name must have at least 2 characters."),
  phoneNumber: z
    .string()
    .min(10, "The phoneNumber number must have at least 10 digits"),
});

const stepThreeSchema = z
  .object({
    userName: z
      .string()
      .min(3, "userName must be at least 3 characters.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "userName contains only letters, numbers, and underscores.",
      ),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least 1 capital letter.")
      .regex(/[a-z]/, "Password must contain at least 1 lower case letter.")
      .regex(/[0-9]/, "Password must contain at least 1 number."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirmation password does not match.",
    path: ["confirmPassword"],
  });

const formSchema = z.object({
  email: z.string().email(),
  displayName: z.string(),
  phoneNumber: z.string(),
  userName: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

type NewFormData = z.infer<typeof formSchema>;

export function MultiForm({ type }: { type: string }) {
  const { toast } = useToast();
  const { step, nextStep, prevStep, createUserData } = useMultiContext();
  const [loading, setLoading] = useState(false);
  const form = useForm<NewFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      displayName: "",
      phoneNumber: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const registerHeadAction = useAuth.useRegisterHead();
  const registerUserAction = useAuth.useRegisterUser();

  async function registerAccount(data: RegisterBodyType) {
    if (loading) return;
    setLoading(true);
    if (type === "Head") {
      try {
        await registerHeadAction.mutateAsync(data);
        toast({
          title: "Success",
          description: "Account created successfully",
        });
        nextStep();
      } catch (error) {
        switch ((error as ErrorType).code) {
          case "USERNAME_ALREADY_EXISTS":
            toast({
              title: "Error",
              description: "Username is taken",
              variant: "destructive",
            });
            break;
          case "EMAIL_ALREADY_EXISTS":
            toast({
              title: "Error",
              description: "Email is taken",
              variant: "destructive",
            });
            break;
          default:
            toast({
              title: "Error",
              description: "An error occurred",
              variant: "destructive",
            });
            break;
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await registerUserAction.mutateAsync(data);
        nextStep();
      } catch (error) {
        switch ((error as ErrorType).code) {
          case "USERNAME_ALREADY_EXISTS":
            toast({
              title: "Error",
              description: "Username is taken",
              variant: "destructive",
            });
            break;
          case "EMAIL_ALREADY_EXISTS":
            toast({
              title: "Error",
              description: "Email is taken",
              variant: "destructive",
            });
          default:
            toast({
              title: "Error",
              description: "An error occurred",
              variant: "destructive",
            });
            break;
        }
      } finally {
        setLoading(false);
      }
    }
  }

  async function submitForm(data: NewFormData) {
    const registerData: RegisterBodyType = {
      displayName: data.displayName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      userName: data.userName,
      password: data.password,
    };
    registerAccount(registerData);
  }

  const validateStep = async () => {
    let isValid = false;
    const currentValues = form.getValues();

    switch (step) {
      case 1:
        try {
          await stepOneSchema.parseAsync({
            email: currentValues.email,
          });
          isValid = true;
        } catch (error) {
          if (error instanceof z.ZodError) {
            error.errors.forEach((err) => {
              form.setError(err.path[0] as keyof NewFormData, {
                type: "manual",
                message: err.message,
              });
            });
          }
        }
        break;

      case 2:
        try {
          await stepTwoSchema.parseAsync({
            displayName: currentValues.displayName,
            phoneNumber: currentValues.phoneNumber,
          });
          isValid = true;
        } catch (error) {
          if (error instanceof z.ZodError) {
            error.errors.forEach((err) => {
              form.setError(err.path[0] as keyof NewFormData, {
                type: "manual",
                message: err.message,
              });
            });
          }
        }
        break;

      case 3:
        try {
          await stepThreeSchema.parseAsync({
            userName: currentValues.userName,
            password: currentValues.password,
            confirmPassword: currentValues.confirmPassword,
          });
          isValid = true;
        } catch (error) {
          if (error instanceof z.ZodError) {
            error.errors.forEach((err) => {
              form.setError(err.path[0] as keyof NewFormData, {
                type: "manual",
                message: err.message,
              });
            });
          }
        }
        break;
    }

    return isValid;
  };

  const WaitingRegistrationCard = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <Card className="mx-4 w-full max-w-md bg-white/90">
          <CardContent className="flex flex-col items-center space-y-6 p-8">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-blue-400/30" />
              <div className="relative">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              </div>
            </div>

            <div className="space-y-2 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Registration is processing
              </h3>
              <p className="text-sm text-gray-500">
                Please wait a moment while we create your account...
              </p>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="animate-progress h-full rounded-full bg-blue-500"
                style={{
                  animation: "progress 2s ease-in-out infinite",
                }}
              />
            </div>
          </CardContent>
        </Card>

        <style jsx>{`
          @keyframes progress {
            0% {
              width: 0%;
            }
            50% {
              width: 70%;
            }
            100% {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  };

  async function onSubmit(values: NewFormData) {
    const isStepValid = await validateStep();
    if (isStepValid) {
      if (step === 3) {
        createUserData(values);
        submitForm(values);
      } else {
        nextStep();
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 lg:relative lg:flex-1"
      >
        <FormProvider {...form}>
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          {step === 3 && (
            <div>
              <StepThree />
              {loading && <WaitingRegistrationCard />}
            </div>
          )}
          {step === 4 && <SuccessForm />}
        </FormProvider>
        {step < 4 && (
          <div className="flex justify-end">
            <Button
              type="button"
              variant={"outline"}
              className={`${step === 1 ? "invisible" : ""}`}
              size={"lg"}
              onClick={() => prevStep()}
            >
              Go Back
            </Button>
            <Button type="submit" size={"lg"} className="ml-4">
              {step === 3 ? "Confirm" : "Next Step"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default MultiForm;
