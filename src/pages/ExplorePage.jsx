import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDestinationById, getDestinations, getFeaturedDrops, searchDestinations } from '../api/destinations'
import { DestinationCard } from '../components/explore/DestinationCard'
import { FeaturedDrop } from '../components/explore/FeaturedDrop'
import { SearchBar } from '../components/explore/SearchBar'
import { VibeFilter } from '../components/explore/VibeFilter'
import { Skeleton } from '../components/ui/Skeleton'
import { useDebounce } from '../hooks/useDebounce'
import { useUser } from '../context/UserContext.jsx'
import { Button } from '../components/ui/Button'

export function ExplorePage() {
  const navigate = useNavigate()
  const { user, toggleWishlist } = useUser()
  const [filter, setFilter] = useState('All')
  const [drop, setDrop] = useState(null)
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 300)
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  const loadFirstPage = async (selectedFilter) => {
    setLoading(true)
    setError('')
    const res = await getDestinations({ filter: selectedFilter, page: 1 })
    if (res.error) {
      setError(res.error)
    } else {
      setItems(res.data.items)
      setHasMore(res.data.hasMore)
      setPage(1)
    }
    setLoading(false)
  }

  useEffect(() => {
    getFeaturedDrops().then((res) => setDrop(res.data?.[0]))
  }, [])

  useEffect(() => {
    loadFirstPage(filter)
  }, [filter])

  useEffect(() => {
    let alive = true
    if (!debounced.trim()) {
      setSearchResults([])
      setSearchLoading(false)
      return
    }
    setSearchLoading(true)
    searchDestinations(debounced).then((res) => {
      if (!alive) return
      setSearchResults(res.data || [])
      setSearchLoading(false)
    })

    return () => {
      alive = false
    }
  }, [debounced])

  useEffect(() => {
    if (debounced.trim()) return
    const onScroll = async () => {
      if (!hasMore || loading) return
      if (window.innerHeight + window.scrollY < document.body.offsetHeight - 180) return
      setLoading(true)
      const next = page + 1
      const res = await getDestinations({ filter, page: next })
      if (res.error) setError(res.error)
      if (res.data) {
        setItems((prev) => [...prev, ...res.data.items])
        setHasMore(res.data.hasMore)
        setPage(next)
      }
      setLoading(false)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [page, hasMore, loading, filter, debounced])

  const list = useMemo(() => (debounced.trim() ? searchResults : items), [debounced, searchResults, items])

  const viewDropDestinations = async () => {
    if (!drop?.destinationIds?.length) return
    setQuery('')
    setSearchResults([])
    setLoading(true)
    const dropResults = await Promise.all(drop.destinationIds.map((destId) => getDestinationById(destId)))
    const dropMatches = dropResults.map((r) => r.data).filter(Boolean)
    setItems(dropMatches)
    setHasMore(false)
    setPage(1)
    setFilter('All')
    setLoading(false)
  }

  return (
    <div>
      <FeaturedDrop drop={drop} onView={viewDropDestinations} />
      <VibeFilter value={filter} onChange={setFilter} />
      <SearchBar value={query} onChange={setQuery} />
      {error ? (
        <div className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-600">
          {error}
          <Button variant="ghost" className="ml-2" onClick={() => loadFirstPage(filter)}>Retry</Button>
        </div>
      ) : null}
      {searchLoading ? <Skeleton className="mb-3 h-10 rounded-xl" /> : null}
      {!loading && !list.length ? <div className="rounded-xl bg-white p-3 text-sm text-navy/60">No destinations matched your search.</div> : null}
      <div className="grid grid-cols-2 gap-3">
        {list.map((d) => (
          <DestinationCard
            key={d.id}
            destination={d}
            saved={user?.wishlist?.includes(d.id)}
            onToggleSave={() => toggleWishlist(d.id)}
            onOpen={() => navigate(`/destination/${d.id}`)}
          />
        ))}
      </div>
      {loading ? (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-2xl" />)}
        </div>
      ) : null}
    </div>
  )
}
