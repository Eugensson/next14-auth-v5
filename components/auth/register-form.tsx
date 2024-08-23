"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Eye, EyeOff, Key, User } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name" className="sr-only">
                    Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="name"
                        disabled={isPending}
                        placeholder="John Doe"
                        autoComplete="off"
                        type="text"
                        className="pl-10"
                      />

                      <User
                        size={20}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="sr-only">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        id="email"
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        autoComplete="off"
                        type="email"
                        className="pl-10"
                      />
                      <AtSign
                        size={20}
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
