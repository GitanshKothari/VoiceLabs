"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { signInSchema, type SignInFormValues } from "~/schemas/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    setIsFormValid(!!email && !!password);
  }, [email, password]);
  const searchParams = useSearchParams();
  const onSubmit = async (data: SignInFormValues) => {
    try {
      setIsLoading(true);

      const callbackUrl =
        searchParams.get("callbackUrl") ||
        "/app/speech-synthesis/text-to-speech";

      const signInResults = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });

      if (!signInResults?.error) {
        router.push(signInResults?.url || callbackUrl);
      } else {
        setError(
          signInResults?.error === "CredentialsSignin"
            ? "Invalid email or password"
            : "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 mx-auto w-full max-w-md backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold text-balance">
          Welcome back
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Sign in to your account to continue creating
        </CardDescription>
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="bg-input border-border/50 focus:border-primary"
              disabled={isLoading}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <a href="#" className="text-primary text-sm hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="bg-input border-border/50 focus:border-primary pr-10"
                disabled={isLoading}
                placeholder="Enter your password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="text-muted-foreground h-4 w-4" />
                ) : (
                  <Eye className="text-muted-foreground h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-destructive text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground w-full font-medium"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
          <div className="text-muted-foreground text-center text-sm">
            Don't have an account?{" "}
            <a
              href="/auth/sign-up"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
