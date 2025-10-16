'use client';

import { motion } from 'framer-motion';
// Assuming cn utility is available locally
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Helper component that generates and animates the SVG paths
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    // Original complex path calculation
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        // Use w-full and h-full to stretch the SVG across the container
        className="w-full h-full text-neutral-950 dark:text-white"
        // PreserveAspectRatio is key to ensure the paths scale correctly
        preserveAspectRatio="xMidYMid slice" 
        viewBox="0 0 696 900" 
        fill="none"
      >
        <title>Animated Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export interface FloatingPathsBackgroundProps {
  className?: string;
}

// The main component, stripped of all foreground content
export function FloatingPathsBackground({ className }: FloatingPathsBackgroundProps) {
  return (
    <div className={cn(
      // Ensure the background is positioned absolutely and covers the parent
      "absolute inset-0 overflow-hidden", 
      // Set the background color here if needed, or rely on the parent's color
      "bg-white dark:bg-neutral-950",
      className
    )}>
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
    </div>
  );
}