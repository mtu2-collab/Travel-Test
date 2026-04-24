export function PageWrapper({ children }) {
  return (
    <main className="mx-auto min-h-screen max-w-[430px] animate-fade bg-cream pb-24">
      <div className="px-4 pt-4">{children}</div>
    </main>
  )
}
