export function PageWrapper({ children }) {
  return (
    <main className="mx-auto min-h-screen max-w-[430px] animate-fade bg-cream pb-24 text-navy md:my-6 md:rounded-[28px] md:border md:border-navy/10 md:shadow-soft">
      <div className="px-4 pt-4">{children}</div>
    </main>
  )
}
