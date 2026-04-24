import { useCallback, useEffect, useState } from 'react'

export function useApi(fn, params = [], immediate = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(Boolean(immediate))
  const [error, setError] = useState(null)

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    const response = await fn(...params)
    if (response.error) {
      setError(response.error)
      setData(null)
    } else {
      setData(response.data)
    }
    setLoading(false)
    return response
  }, [fn, ...params])

  useEffect(() => {
    if (immediate) run()
  }, [run, immediate])

  return { data, loading, error, refetch: run, setData }
}
