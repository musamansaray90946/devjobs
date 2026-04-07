import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setOpen(false)
  }

  const close = () => setOpen(false)

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-900" onClick={close}>
          Dev<span className="text-blue-600">Jobs</span>
        </Link>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600 hover:text-gray-900">
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition">Jobs</Link>
          {user && (
            <Link to="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 transition">Dashboard</Link>
          )}
          {user?.role === 'employer' && (
            <Link to="/post-job" className="text-sm text-green-600 font-medium hover:text-green-700 transition">Post a Job</Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-sm text-purple-600 font-medium hover:text-purple-700 transition">Admin</Link>
          )}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">{user.role}</span>
              <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 transition">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 transition">Login</Link>
              <Link to="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Register</Link>
            </div>
          )}
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 space-y-3">
          <Link to="/" onClick={close} className="block text-sm text-gray-600 hover:text-gray-900 py-2">Jobs</Link>
          {user && (
            <Link to="/dashboard" onClick={close} className="block text-sm text-gray-600 hover:text-gray-900 py-2">Dashboard</Link>
          )}
          {user?.role === 'employer' && (
            <Link to="/post-job" onClick={close} className="block text-sm text-green-600 font-medium py-2">Post a Job</Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" onClick={close} className="block text-sm text-purple-600 font-medium py-2">Admin</Link>
          )}
          {user ? (
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Hi, {user.name}</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">{user.role}</span>
              </div>
              <button onClick={handleLogout} className="block text-sm text-red-500 hover:text-red-600">Logout</button>
            </div>
          ) : (
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <Link to="/login" onClick={close} className="block text-sm text-gray-600 hover:text-gray-900 py-2">Login</Link>
              <Link to="/register" onClick={close} className="block w-full text-center text-sm bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition">Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}