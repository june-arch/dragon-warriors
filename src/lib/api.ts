const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

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
  const res = await fetch(`${API_BASE}/siswa`)
  if (!res.ok) throw new Error(`Gagal mengambil data (${res.status})`)
  return res.json()
}
