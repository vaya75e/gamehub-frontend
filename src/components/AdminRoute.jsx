import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

// ครอบหน้าที่ต้องเป็น admin: ยังไม่ login -> /login, login แล้วแต่ไม่ใช่ admin -> หน้าแรก
// (ด่านจริงอยู่ที่ Backend ด้วย RequireRole นี่แค่กันไม่ให้ผู้ใช้เห็นหน้าที่ใช้ไม่ได้)
function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

export default AdminRoute;