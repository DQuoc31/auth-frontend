import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { authAPI } from '../services/api'
import { getStoredUser } from '../lib/auth'

const Home = () => {
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user')
    navigate('/login', { replace: true })
  }, [navigate])

  function AccountInfo() {
    const stored = getStoredUser()
    const id = stored?._id

    const { data: freshUser, isLoading, isError } = useQuery({
      queryKey: ['user', id],
      queryFn: async () => authAPI.getUser(id || ''),
      enabled: !!id,
    })

    // Prefer fresh backend data but fall back to stored user so UI still has a value
    const user = (freshUser as any) ?? stored

    // If we're loading from backend but have a stored user, show stored user instead
    if (isLoading && !stored) return <span>Đang tải thông tin tài khoản…</span>
    // Only show an error when no stored fallback exists
    if (isError && !stored) return <span>Lỗi khi tải thông tin</span>

    if (!user) return <span className="italic">Không có thông tin tài khoản</span>

    const displayName = user.name ?? user.email
    const createdAt = user.createdAt ? new Date(user.createdAt).toLocaleString() : '—'

    return (
      <>
        <span>Tài khoản: <strong className="text-gray-900">{displayName}</strong></span>
        <span className="mx-2">•</span>
        <span>Ngày tạo tài khoản: <strong className="text-gray-900">{createdAt}</strong></span>
      </>
    )
  }
  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center overflow-hidden font-sans">
      {/* --- Background Decor (Blobs) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/30 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />

      {/* --- Main Container (Glass Effect) --- */}
      <div className="relative z-10 w-full max-w-5xl px-4">
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 md:p-12 overflow-hidden">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Chào mừng đến với <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Phần mềm xác thực
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Hệ thống được xây dựng trên nền tảng React và NestJS.
            </p>
            {/* Account info (name + created at) */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
              <AccountInfo />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Feature 1 */}
            <div className="group bg-white/60 hover:bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bảo mật tối đa</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Mật khẩu được mã hóa Bcrypt.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/60 hover:bg-white border border-gray-100 hover:border-green-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-green-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trải nghiệm mượt mà</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Giao diện Responsive, tối ưu UX với Tailwind CSS v4.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/60 hover:bg-white border border-gray-100 hover:border-purple-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hiệu suất cao</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tích hợp React Query để quản lý cache, giảm tải server và tăng tốc độ phản hồi.
              </p>
            </div>
          </div>

          {/* Footer / Action */}
          <div className="border-t border-gray-100 pt-8 flex justify-center">
            <button
              onClick={handleLogout}
              className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              <span>Đăng xuất</span>
              <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

        </div>
        
        {/* Footer text */}
        <p className="text-center text-gray-400 text-sm mt-6">
          &copy; 2025 Auth App System. All rights reserved.
        </p>
      </div>
    </div>
  );
};
export default Home