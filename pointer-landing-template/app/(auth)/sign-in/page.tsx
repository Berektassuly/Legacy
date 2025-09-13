"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Fingerprint } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.ok) router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-950 text-white">
      <div className="w-full max-w-sm">
        <Card className="bg-gray-900">
          <CardHeader className="space-y-4 text-center">
            <Fingerprint className="mx-auto h-12 w-12 text-primary" />
            <div className="space-y-1">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Enter your email and password</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-sm text-center">
              Don\'t have an account? <Link href="/sign-up" className="underline">Sign Up</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
