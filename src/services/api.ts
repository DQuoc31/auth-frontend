import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Export types
export type RegisterRequest = {
  email: string
  password: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type User = {
  _id: string
  email: string
  createdAt: string
  name?: string
}

export type AuthResponse = {
  message: string
  user: User
}

export type ApiError = {
  message: string
  statusCode: number
}

// Export functions
export const authAPI = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/user/register', data)
    return response.data
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/user/login', data)
    return response.data
  },

  // Fetch user by id
  getUser: async (id: string): Promise<User> => {
    const response = await api.get(`/user/${id}`)
    return response.data
  },
}