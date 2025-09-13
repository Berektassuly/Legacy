"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [representsOrg, setRepresentsOrg] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn("email", {
      email,
      callbackUrl: "/dashboard",
      representsOrg: representsOrg.toString()
    })
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center p-8 sm:p-12">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Log in to Legacy</h1>
            <p className="text-sm text-muted-foreground">Log in with magic link</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="representsOrg"
                checked={representsOrg}
                onCheckedChange={(v) => setRepresentsOrg(!!v)}
              />
              <Label htmlFor="representsOrg" className="text-sm">
                I represent an organization/brand
              </Label>
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("github")}
            >
              Sign in with GitHub
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image
          src="/images/dashboard-preview.png"
          alt="Login illustration"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}
