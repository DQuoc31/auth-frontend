import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { RegisterRequest, LoginRequest, AuthResponse, ApiError } from '../services/api'
import { authAPI } from '../services/api'

export const useRegister = () => {
  return useMutation<AuthResponse, AxiosError<ApiError>, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => authAPI.register(data),
    onSuccess: (data) => {
      console.log('Đăng ký thành công:', data)
    },
    onError: (error) => {
      console.error('Đăng ký thất bại:', error)
    },
  })
}

export const useLogin = () => {
  return useMutation<AuthResponse, AxiosError<ApiError>, LoginRequest>({
    mutationFn: (data: LoginRequest) => authAPI.login(data),
    onSuccess: (data) => {
      console.log('Đăng nhập thành công:', data)
      localStorage.setItem('user', JSON.stringify(data.user))
    },
    onError: (error) => {
      console.error('Đăng nhập thất bại:', error)
    },
  })
}