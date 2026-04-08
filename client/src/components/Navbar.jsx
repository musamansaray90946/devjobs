import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const handleLogout = () => {
    logout()
    navigate('/')
    setOpen(false)
  }

  const close = () => setOpen(false)

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white" onClick={close}>
          Dev<span className="text-blue-600">Jobs</span>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => setDark(!dark)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            {dark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          <button onClick={() => setOpen(!open)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900">
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Jobs</Link>
          {user && <Link to="/dashboard" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Dashboard</Link>}
          {user?.role === 'employer' && <Link to="/post-job" className="text-sm text-green-600 dark:text-green-400 font-medium hover:text-green-700 transition">Post a Job</Link>}
          {user?.role === 'admin' && <Link to="/admin" className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 transition">Admin</Link>}
          <button onClick={() => setDark(!dark)} className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            {dark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Hi, {user.name}</Link>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full capitalize">{user.role}</span>
              <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 transition">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition">Login</Link>
              <Link to="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Register</Link>
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4 space-y-3">
          <Link to="/" onClick={close} className="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2">Jobs</Link>
          {user && <Link to="/dashboard" onClick={close} className="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2">Dashboard</Link>}
          {user?.role === 'employer' && <Link to="/post-job" onClick={close} className="block text-sm text-green-600 dark:text-green-400 font-medium py-2">Post a Job</Link>}
          {user?.role === 'admin' && <Link to="/admin" onClick={close} className="block text-sm text-purple-600 dark:text-purple-400 font-medium py-2">Admin</Link>}
          {user ? (
            <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <Link to="/profile" onClick={close} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 dark:text-gray-300">Hi, {user.name}</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full capitalize">{user.role}</span>
              </Link>
              <button onClick={handleLogout} className="block text-sm text-red-500 hover:text-red-600">Logout</button>
            </div>
          ) : (
            <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <Link to="/login" onClick={close} className="block text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 py-2">Login</Link>
              <Link to="/register" onClick={close} className="block w-full text-center text-sm bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}