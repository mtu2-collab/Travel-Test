const variantClasses = {
  primary: 'bg-coral text-white hover:opacity-90 active:scale-[0.99]',
  ghost: 'border border-navy/15 bg-white text-navy hover:bg-navy/5',
  link: 'bg-transparent p-0 text-coral underline-offset-2 hover:underline'
}

const sizeClasses = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base'
}

export function Button({ children, variant = 'primary', size = 'md', className = '', loading = false, disabled, ...props }) {
  const isDisabled = disabled || loading
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition ${variantClasses[variant]} ${sizeClasses[size]} ${isDisabled ? 'cursor-not-allowed opacity-70' : ''} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" /> : null}
      {children}
    </button>
  )
}
