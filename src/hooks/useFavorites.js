import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getWishlist, addToWishlist, removeFromWishlist } from '../api/backend';

// ดึงรายการโปรดของสมาชิก + กดหัวใจเพิ่ม/ลบ
export default function useFavorites() {
  const { isLoggedIn, token } = useAuth();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    let cancelled = false;
    if (!isLoggedIn || !token) {
      setIds([]);
      return undefined;
    }
    getWishlist(token)
      .then((items) => {
        if (cancelled) return;
        setIds(
          (Array.isArray(items) ? items : []).map((item) =>
            Number(item.gameId ?? item.game_id ?? item.game?.id ?? item.id)
          )
        );
      })
      .catch(() => { if (!cancelled) setIds([]); });
    return () => { cancelled = true; };
  }, [isLoggedIn, token]);

  const isFavorite = (gameId) => ids.includes(Number(gameId));

  // คืนค่า 'login' ถ้ายังไม่ได้เข้าสู่ระบบ
  async function toggle(gameId) {
    if (!isLoggedIn || !token) return 'login';
    const id = Number(gameId);
    try {
      if (ids.includes(id)) {
        await removeFromWishlist(id, token);
        setIds((prev) => prev.filter((x) => x !== id));
      } else {
        await addToWishlist(id, token);
        setIds((prev) => [...new Set([...prev, id])]);
      }
    } catch (err) {
      alert(err.message || 'ไม่สามารถแก้ไขรายการโปรดได้');
    }
    return 'ok';
  }

  return { isFavorite, toggle };
}