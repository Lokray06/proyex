"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
// ⭐️ IMPORT THE NEW BACKGROUND COMPONENT
import { FloatingPathsBackground } from "@/components/floating-paths";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="w-full border-b">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 relative">

        {/* ⭐️ BACKGROUND LAYER: Use the new component, place it absolutely, and set z-0 */}
        <FloatingPathsBackground className="z-0 opacity-70" />

        {/* FOREGROUND CONTENT: Ensure this layer has a higher z-index (z-10) */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Logo className="text-7xl text-foreground mb-4 font-bold" />
          <p className="text-lg text-muted-foreground mb-8">
            Manage your projects smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push("/signup")}>
              Sign up
            </Button>
          </div>
        </div>
      </main>

      <Separator />

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Proyex —
        <Button variant={"link"}><a href="https://github.com/Lokray06" target="blank">Lokray06</a></Button>
      </footer>
    </div>
  );
}
