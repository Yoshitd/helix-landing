import { cn } from "@/lib/utils";

/** Minimal helix mark: two interlocking strands rendered as the brand. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="text-brand"
      >
        <path
          d="M6 3c0 6 12 6 12 12M6 9c0 6 12 6 12 12M6 3v18M18 3v18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span>Helix</span>
    </span>
  );
}
