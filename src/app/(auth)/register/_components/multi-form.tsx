import React from "react";
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

// Schema validation cho từng step
const stepOneSchema = z.object({
  email: z.string().email("Invalid email."),
});

const stepTwoSchema = z.object({
  displayname: z
    .string()
    .min(2, "The display name must have at least 2 characters."),
  phone: z.string().min(10, "The phone number must have at least 10 digits"),
});

const stepThreeSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username contains only letters, numbers, and underscores.",
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
  displayname: z.string(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

type NewFormData = z.infer<typeof formSchema>;

export function MultiForm() {
  const { step, nextStep, prevStep, createUserData } = useMultiContext();
  const form = useForm<NewFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      displayname: "",
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

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
            displayname: currentValues.displayname,
            phone: currentValues.phone,
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
            username: currentValues.username,
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
        nextStep();
      } else {
        nextStep();
      }
    }
    console.log(values);
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
