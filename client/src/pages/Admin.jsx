import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import API from '../config'

export default function Admin() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'admin') return navigate('/')
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    const res = await axios.get(`${API}/jobs`)
    setJobs(res.data)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return
    await axios.delete(`${API}/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchJobs()
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Panel</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">All Jobs ({jobs.length})</h2>
        <div className="space-y-3">
          {jobs.map(job => (
            <div key={job.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="font-medium text-gray-900 text-sm">{job.title}</p>
                <p className="text-gray-400 text-xs">{job.company} · {job.location} · {job.type}</p>
              </div>
              <button onClick={() => handleDelete(job.id)} className="text-xs text-red-400 hover:text-red-600">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}