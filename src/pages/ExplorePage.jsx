import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDestinations, getFeaturedDrops, searchDestinations } from '../api/destinations'
import { DestinationCard } from '../components/explore/DestinationCard'
import { FeaturedDrop } from '../components/explore/FeaturedDrop'
import { SearchBar } from '../components/explore/SearchBar'
import { VibeFilter } from '../components/explore/VibeFilter'
import { Skeleton } from '../components/ui/Skeleton'
import { useDebounce } from '../hooks/useDebounce'
import { useUser } from '../context/UserContext'

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

  useEffect(() => { getFeaturedDrops().then((res) => setDrop(res.data?.[0])) }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    getDestinations({ filter, page: 1 }).then((res) => {
      if (!active) return
      if (res.error) setError(res.error)
      else {
        setItems(res.data.items)
        setHasMore(res.data.hasMore)
        setPage(1)
      }
      setLoading(false)
    })
    return () => { active = false }
  }, [filter])

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResults([])
      return
    }
    searchDestinations(debounced).then((res) => setSearchResults(res.data || []))
  }, [debounced])

  useEffect(() => {
    if (debounced.trim()) return
    const onScroll = async () => {
      if (!hasMore || loading) return
      if (window.innerHeight + window.scrollY < document.body.offsetHeight - 180) return
      setLoading(true)
      const next = page + 1
      const res = await getDestinations({ filter, page: next })
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

  return (
    <div>
      <FeaturedDrop drop={drop} onView={() => setFilter('Slow & Coastal')} />
      <VibeFilter value={filter} onChange={setFilter} />
      <SearchBar value={query} onChange={setQuery} />
      {error ? <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error} <button className="underline" onClick={() => setFilter((f) => f)}>Retry</button></div> : null}
      <div className="grid grid-cols-2 gap-3">
        {list.map((d) => <DestinationCard key={d.id} destination={d} saved={user?.wishlist?.includes(d.id)} onToggleSave={() => toggleWishlist(d.id)} onOpen={() => navigate(`/destination/${d.id}`)} />)}
      </div>
      {loading ? <div className="mt-3 grid grid-cols-2 gap-3">{Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-52 rounded-2xl" />)}</div> : null}
    </div>
  )
}
