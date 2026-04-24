import { Navigate, Route, Routes } from 'react-router-dom'
import { BottomNav } from './components/layout/BottomNav'
import { PageWrapper } from './components/layout/PageWrapper'
import { DestinationDetailPage } from './pages/DestinationDetailPage'
import { ExplorePage } from './pages/ExplorePage'
import { PlanPage } from './pages/PlanPage'
import { ProfilePage } from './pages/ProfilePage'
import { TripsPage } from './pages/TripsPage'

export default function App() {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/destination/:id" element={<DestinationDetailPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="*" element={<Navigate to="/explore" replace />} />
      </Routes>
      <BottomNav />
    </PageWrapper>
  )
}
