const variants = {
  neutral: 'bg-navy/5 text-navy',
  accent: 'bg-coral/10 text-coral',
  dark: 'bg-navy text-white'
}

export function Badge({ children, className = '', variant = 'neutral' }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}>{children}</span>
}
