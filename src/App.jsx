
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import Games from './pages/Games';
import GameDetail from './pages/GameDetail';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminGames from './pages/admin/AdminGames';
import AdminGameForm from './pages/admin/AdminGameForm';
import AdminMembers from './pages/admin/AdminMembers';

function App() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* หน้าทั่วไป */}
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/about" element={<About />} />

            {/* Login / Register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* หน้าสำหรับสมาชิก */}
            <Route
              path="/me/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* หน้า Admin */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="games" element={<AdminGames />} />
              <Route path="games/new" element={<AdminGameForm />} />
              <Route path="games/:id/edit" element={<AdminGameForm />} />
              <Route path="members" element={<AdminMembers />} />
            </Route>

            {/* ไม่พบหน้า */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
