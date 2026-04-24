export function Skeleton({ className = '', rounded = 'rounded-xl' }) {
  return <div className={`animate-shimmer bg-[linear-gradient(110deg,#f3f4f6,45%,#e5e7eb,55%,#f3f4f6)] bg-[length:200%_100%] ${rounded} ${className}`} />
}
