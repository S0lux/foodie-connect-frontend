import React, { use, useState } from "react";
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
import { set } from "date-fns";
import { RegisterBodyType } from "@/schema/auth.schema";
import authAction from "@/apis/auth.api";

// Schema validation cho từng step
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
  console.log(type);
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

  const registerAction = authAction;

  async function registerAccount(data: RegisterBodyType) {
    if (loading) return;
    setLoading(true);
    if (type === "Head") {
      try {
        const result = await registerAction.useRegisterHead().mutateAsync(data);
        console.log(result);
        nextStep();
      } catch (error: any) {
        switch (error.status) {
          case 400:
            console.error("Request body does not meet specified requirements");
            break;
          case 409:
            console.error("Username or Email is taken");
            break;
          default:
            console.error("An error occurred");
            break;
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await registerAction.useRegisterUser().mutateAsync(data);
        nextStep();
      } catch (error: any) {
        switch (error.status) {
          case 400:
            console.error("Request body does not meet specified requirements");
            break;
          case 409:
            console.error("Username or Email is taken");
            break;
          default:
            console.error("An error occurred");
            break;
        }
      } finally {
        setLoading(false);
      }
    }
  }

  function submitForm(data: NewFormData) {
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
    console.log({
      email: values.email,
      displayName: values.displayName,
      phoneNumber: values.phoneNumber,
      userName: values.userName,
      password: values.password,
    });
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
          {step === 3 && <StepThree />}
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
