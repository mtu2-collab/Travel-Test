import { useCallback, useEffect, useRef, useState } from 'react'

export function useApi(fn, params = [], immediate = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(Boolean(immediate))
  const [error, setError] = useState(null)
  const paramsRef = useRef(params)

  useEffect(() => {
    paramsRef.current = params
  }, [params])

  const run = useCallback(async (overrideParams) => {
    setLoading(true)
    setError(null)

    const effectiveParams = Array.isArray(overrideParams) ? overrideParams : paramsRef.current
    const response = await fn(...effectiveParams)

    if (response.error) {
      setError(response.error)
      setData(null)
    } else {
      setData(response.data)
    }

    setLoading(false)
    return response
  }, [fn])

  useEffect(() => {
    if (immediate) run()
  }, [run, immediate])

  return { data, loading, error, refetch: run, setData }
}
