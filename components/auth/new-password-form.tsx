"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Eye, EyeOff, Key } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { newPassword } from "@/actions/new-password";
import { FormSuccess } from "@/components/form-success";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success || "");
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter your new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password" className="sr-only">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        disabled={isPending}
                        placeholder="******"
                        autoComplete="off"
                        type={isVisiblePassword ? "text" : "password"}
                        className="px-10"
                      />
                      <Key
                        size={20}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      {isVisiblePassword ? (
                        <EyeOff
                          size={20}
                          onClick={() =>
                            setIsVisiblePassword((prevState) => !prevState)
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        />
                      ) : (
                        <Eye
                          size={20}
                          onClick={() =>
                            setIsVisiblePassword((prevState) => !prevState)
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
