import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'
import API from '../config'
import axios from 'axios'

export default function Admin() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [jobs, setJobs] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('jobs')

  useEffect(() => {
    if (!user || user.role !== 'admin') return navigate('/')
    fetchData()
  }, [])

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` }
    const [jobsRes, usersRes] = await Promise.all([
      axios.get(`${API}/jobs`),
      axios.get(`${API}/auth/users`, { headers })
    ])
    setJobs(jobsRes.data)
    setUsers(usersRes.data)
    setLoading(false)
  }

  const handleDeleteJob = async (id) => {
    if (!confirm('Delete this job?')) return
    try {
      await axios.delete(`${API}/jobs/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      toast.success('Job deleted')
      fetchData()
    } catch { toast.error('Failed to delete') }
  }

  const handleDeleteUser = async (id) => {
    if (!confirm('Delete this user? This will also delete their jobs and applications.')) return
    try {
      await axios.delete(`${API}/auth/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      toast.success('User deleted')
      fetchData()
    } catch { toast.error('Failed to delete user') }
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>

  const seekers = users.filter(u => u.role === 'seeker')
  const employers = users.filter(u => u.role === 'employer')

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Admin Panel</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 text-center">
          <p className="text-3xl font-bold text-blue-600">{jobs.length}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Total Jobs</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 text-center">
          <p className="text-3xl font-bold text-green-600">{users.length}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Total Users</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 text-center">
          <p className="text-3xl font-bold text-purple-600">{seekers.length}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Job Seekers</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 text-center">
          <p className="text-3xl font-bold text-orange-600">{employers.length}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Employers</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('jobs')} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${tab === 'jobs' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}>Jobs ({jobs.length})</button>
        <button onClick={() => setTab('users')} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${tab === 'users' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}>Users ({users.length})</button>
      </div>

      {tab === 'jobs' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <div className="space-y-3">
            {jobs.map(job => (
              <div key={job.id} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{job.title}</p>
                  <p className="text-gray-400 text-xs">{job.company} · {job.location} · {job.type}</p>
                </div>
                <button onClick={() => handleDeleteJob(job.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <div className="space-y-3">
            {users.map(u => (
              <div key={u.id} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-700 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">{u.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{u.name}</p>
                    <p className="text-gray-400 text-xs">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${u.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : u.role === 'employer' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'}`}>{u.role}</span>
                  {u.role !== 'admin' && <button onClick={() => handleDeleteUser(u.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}