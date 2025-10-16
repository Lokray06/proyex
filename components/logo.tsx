import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-block align-middle text-current bg-current h-[1em] aspect-[39/9]",
        // Explicitly control mask behavior
        "[mask-image:url('/logo.svg')] [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain]",
        className
      )}
    />
  );
}
