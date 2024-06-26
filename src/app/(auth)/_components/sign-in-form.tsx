"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  signInSchema,
  type SignInSchemaType,
} from "@/lib/validations/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";

function SignInForm() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit() {
    if (isSigningIn) return;

    setIsSigningIn(true);
    const res = await signIn("credentials", {
      email: form.getValues().email,
      password: form.getValues().password,
      redirect: false,
    });
    setIsSigningIn(false);

    if (res?.ok) {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} autoComplete="email" />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2" aria-disabled={isSigningIn}>
          {isSigningIn ? <Loader className="animate-spin" /> : "Sign in"}
        </Button>
        <div className="text-center text-sm font-semibold">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-brand-500 hover:underline">
            Register here
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default SignInForm;
