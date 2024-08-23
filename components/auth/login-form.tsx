"use client";

import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Code, Eye, EyeOff, Key } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [error, setError] = useState<string | undefined>();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [success, setSuccess] = useState<string | undefined>();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="code">Two Factor Code</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          id="code"
                          disabled={isPending}
                          placeholder="123456"
                          autoComplete="off"
                          type="text"
                          className="pl-10"
                        />
                        <Code
                          size={20}
                          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
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
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
