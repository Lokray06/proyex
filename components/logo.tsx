// components/logo.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Logo({ className, ...props }: LogoProps) {
  return (
    // Change "text-logo font-bold" to "font-polysans"
    <span className={cn("font-polysans tracking-tight", className)} {...props}>
      proyex
    </span>
  );
}