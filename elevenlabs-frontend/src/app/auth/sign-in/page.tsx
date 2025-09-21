"use client";

import SignInForm from "~/components/auth/signInForm";

export default function SignInPage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left side - Branding */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                  <div className="bg-primary-foreground h-4 w-4 rounded-sm" />
                </div>
                <span className="text-xl font-semibold">VoiceAI</span>
              </div>
              <h1 className="text-4xl leading-tight font-bold text-balance lg:text-5xl">
                The future of <span className="text-primary">AI voice</span>{" "}
                technology
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Create realistic, expressive AI voices for your content. Join
                thousands of creators, developers, and businesses transforming
                how they communicate.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-primary h-2 w-2 rounded-full" />
                <span className="text-foreground">
                  Generate voices in 29+ languages
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary h-2 w-2 rounded-full" />
                <span className="text-foreground">
                  Clone your voice with just 1 minute of audio
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary h-2 w-2 rounded-full" />
                <span className="text-foreground">
                  Professional-grade API for developers
                </span>
              </div>
            </div>

            <div className="text-muted-foreground flex items-center space-x-6 text-sm">
              <span>Trusted by</span>
              <div className="flex items-center space-x-4">
                <span className="font-medium">OpenAI</span>
                <span className="font-medium">Microsoft</span>
                <span className="font-medium">Google</span>
              </div>
            </div>
          </div>

          {/* Right side - Signin Form */}
          <div className="flex justify-center lg:justify-end">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
