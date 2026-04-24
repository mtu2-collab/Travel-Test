export function Card({ children, className = '', padded = false }) {
  return <div className={`rounded-2xl bg-white shadow-soft ${padded ? 'p-4' : ''} ${className}`}>{children}</div>
}
