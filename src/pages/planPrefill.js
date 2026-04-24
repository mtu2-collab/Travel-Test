export function getPrefilledDestination(searchParams) {
  const value = searchParams?.get('destination') || ''
  return typeof value === 'string' ? value.trim() : ''
}
