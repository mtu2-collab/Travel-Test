import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, updateUser } from '../api/users'
import { deleteTrip, saveTrip } from '../api/trips'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res.data)
      setLoading(false)
    })
  }, [])

  const refreshUser = async () => {
    const res = await getCurrentUser()
    if (res.data) setUser(res.data)
    return res
  }

  const toggleWishlist = async (destinationId) => {
    if (!user) return
    if (user.wishlist.includes(destinationId)) {
      await deleteTrip(destinationId)
    } else {
      await saveTrip(destinationId)
    }
    await refreshUser()
  }

  const patchUser = async (data) => {
    const res = await updateUser(data)
    if (res.data) setUser(res.data)
    return res
  }

  const value = useMemo(() => ({ user, loading, toggleWishlist, patchUser, refreshUser }), [user, loading])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
