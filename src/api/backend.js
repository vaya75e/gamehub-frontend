// ชั้นกลางคุยกับ Backend Go ของ GameHub (Render)
// '' = origin เดียวกับหน้าเว็บ (ตอนรันในเครื่องจะ proxy ไปพอร์ต 4000)
const BASE = process.env.REACT_APP_API_URL || '';

export async function apiFetch(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };   // 1) บอก server ว่า body เป็น JSON
  if (token) headers.Authorization = `Bearer ${token}`;      //    แนบบัตรผ่านถ้ามี

  const res = await fetch(BASE + path, {                     // 2) ยิงจริง
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;                       // 3) สำเร็จแต่ไม่มี body

  const data = await res.json()
    .catch(() => ({ error: { message: 'server ไม่ได้ตอบเป็น JSON' } }));
  if (!res.ok) {                                             // 4) 400 / 401 / 403 / 404 / 409
    const err = new Error(data.error?.message || `server ตอบกลับ ${res.status}`);
    err.status = res.status;
    err.code = data.error?.code;
    throw err;
  }
  return data;
}

// ---------- สมาชิก ----------
export function register(email, password, displayName) {
  return apiFetch('/api/auth/register', { method: 'POST', body: { email, password, displayName } });
}
export function login(email, password) {
  return apiFetch('/api/auth/login', { method: 'POST', body: { email, password } }); // { token, member }
}
export function getMe(token) {
  return apiFetch('/api/me', { token });
}
export function updateMe(displayName, token) {
  return apiFetch('/api/me', { method: 'PUT', body: { displayName }, token });
}
export function changePassword(currentPassword, newPassword, token) {
  return apiFetch('/api/me/password', { method: 'PUT', body: { currentPassword, newPassword }, token });
}

// ---------- เกม ----------
export async function getGames() {
  const data = await apiFetch('/api/games');
  return data.items;
}
export function getGame(gameId) {
  return apiFetch(`/api/games/${gameId}`);   // { id, title, image, price, players, platform, genre, rating, description, downloadUrl }
}
export async function getGenres() {
  const data = await apiFetch('/api/genres');
  return data.items;
}

// ---------- รีวิว ----------
export async function getReviews(gameId) {
  const data = await apiFetch(`/api/games/${gameId}/reviews`);
  return data.items;
}
export function postReview(gameId, text, token) {
  return apiFetch(`/api/games/${gameId}/reviews`, { method: 'POST', body: { text }, token });
}
export function deleteReview(reviewId, token) {
  return apiFetch(`/api/reviews/${reviewId}`, { method: 'DELETE', token });
}

// ---------- คะแนน ----------
export function putVote(gameId, score, token) {
  return apiFetch(`/api/games/${gameId}/vote`, { method: 'PUT', body: { score }, token });
}

// ---------- Wishlist ----------
export async function getWishlist(token) {
  const data = await apiFetch('/api/wishlist', { token });
  return data.items;
}
export function addToWishlist(gameId, token) {
  return apiFetch('/api/wishlist', { method: 'POST', body: { gameId }, token });
}
export function removeFromWishlist(gameId, token) {
  return apiFetch(`/api/wishlist/${gameId}`, { method: 'DELETE', token });
}

// ---------- Admin ----------
export function adminStats(token) {
  return apiFetch('/api/admin/stats', { token });
}
export async function adminMembers(token) {
  const data = await apiFetch('/api/admin/members', { token });
  return data.items;
}
export function adminSetRole(id, role, token) {
  return apiFetch(`/api/admin/members/${id}/role`, { method: 'PUT', body: { role }, token });
}
export function adminGetGame(id, token) {
  return apiFetch(`/api/admin/games/${id}`, { token });
}
export function adminCreateGame(game, token) {
  return apiFetch('/api/admin/games', { method: 'POST', body: game, token });
}
export function adminUpdateGame(id, game, token) {
  return apiFetch(`/api/admin/games/${id}`, { method: 'PUT', body: game, token });
}
export function adminDeleteGame(id, token) {
  return apiFetch(`/api/admin/games/${id}`, { method: 'DELETE', token });
}