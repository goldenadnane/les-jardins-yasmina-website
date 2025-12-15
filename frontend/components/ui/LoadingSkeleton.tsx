export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-muted rounded-lg ${className}`}>
      <div className="h-full w-full" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      <LoadingSkeleton className="h-64" />
      <div className="p-6 space-y-4">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
