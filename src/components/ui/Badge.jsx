export function Badge({ children, className = '' }) {
  return <span className={`rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy ${className}`}>{children}</span>
}
