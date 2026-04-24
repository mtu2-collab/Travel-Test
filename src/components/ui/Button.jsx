export function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'rounded-2xl px-4 py-2.5 text-sm font-semibold transition'
  const variants = {
    primary: 'bg-coral text-white hover:opacity-90',
    ghost: 'border border-navy/15 bg-white text-navy hover:bg-navy/5',
    link: 'p-0 text-coral underline'
  }

  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>
}
