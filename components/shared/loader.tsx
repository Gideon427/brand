export function Loader({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
      {label && (
        <p className="text-xs text-muted-foreground">{label}</p>
      )}
    </div>
  );
}