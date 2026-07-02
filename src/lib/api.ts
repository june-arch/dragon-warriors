const API_BASE = import.meta.env.VITE_API_URL || '/api'

const TOKEN_KEY = 'dw_admin_token'
const USER_KEY = 'dw_admin_user'

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface LoginResponse {
  access_token: string
  user: User
}

export interface SiswaResponse {
  id: string
  nama: string
  usia: number
  ttl: string
  noWalimurid: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  akteKelahiran: string | null
  kk: string | null
  nisn: string | null
  kia: string | null
  akteKelahiranUrl: string | null
  kkUrl: string | null
  nisnUrl: string | null
  kiaUrl: string | null
  createdAt: string
  updatedAt: string
}

// ── Auth helpers ──────────────────────────────────────────────

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

export function saveAuth(data: LoginResponse) {
  localStorage.setItem(TOKEN_KEY, data.access_token)
  localStorage.setItem(USER_KEY, JSON.stringify(data.user))
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

function authHeaders(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: 'Bearer ' + `${token}` } : {}
}

// ── Auth API ──────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Login gagal (${res.status})`)
  }
  return res.json()
}

export async function register(email: string, password: string, name: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Registrasi gagal (${res.status})`)
  }
  return res.json()
}

// ── Siswa API ─────────────────────────────────────────────────

export async function daftarSiswa(formData: FormData): Promise<SiswaResponse> {
  const res = await fetch(`${API_BASE}/siswa`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(errorBody || `Gagal mendaftar (${res.status})`)
  }
  return res.json()
}

export async function getSiswaList(): Promise<SiswaResponse[]> {
  const res = await fetch(`${API_BASE}/siswa`, {
    headers: { ...authHeaders() },
  })
  if (!res.ok) throw new Error(`Gagal mengambil data (${res.status})`)
  return res.json()
}
