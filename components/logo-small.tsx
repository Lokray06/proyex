// components/logo.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function LogoSmall({ className, ...props }: LogoProps) {
  return (
    <img className={cn("font-polysans tracking-tight", className)} {...props} src="/logo.png" alt="proyex logo" />
  );
}