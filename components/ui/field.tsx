import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      {label && (
        <span className="mb-2 block text-sm font-medium tracking-tight">
          {label}
        </span>
      )}
      {children}
      {hint && (
        <span className="mt-2 block text-xs text-muted-foreground">{hint}</span>
      )}
    </label>
  );
}

export function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} className={cn(inputBase, props.className)} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={cn(inputBase, "min-h-[120px]", props.className)}
    />
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  return <select {...props} className={cn(inputBase, props.className)} />;
}