import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import API from '../config'

export default function Dashboard() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return navigate('/login')
    fetchData()
  }, [])

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` }
    if (user.role === 'seeker') {
      const res = await axios.get(`${API}/applications/my`, { headers })
      setData(res.data)
    } else if (user.role === 'employer') {
      const res = await axios.get(`${API}/jobs/my`, { headers })
      setData(res.data)
    }
    setLoading(false)
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    reviewed: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm capitalize">{user.role} account — {user.name}</p>
        </div>
        {user.role === 'employer' && (
          <Link to="/post-job" className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
            Post New Job
          </Link>
        )}
      </div>

      {user.role === 'seeker' && (
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">My Applications ({data.length})</h2>
          {data.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-400 mb-4">No applications yet</p>
              <Link to="/" className="text-blue-600 hover:underline text-sm">Browse jobs</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {data.map(app => (
                <div key={app.id} className="bg-white rounded-2xl border border-gray-100 p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">{app.job.title}</h3>
                    <p className="text-gray-500 text-sm">{app.job.company} · {app.job.location}</p>
                    <p className="text-gray-400 text-xs mt-1">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {user.role === 'employer' && (
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">My Job Postings ({data.length})</h2>
          {data.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-400 mb-4">No jobs posted yet</p>
              <Link to="/post-job" className="text-blue-600 hover:underline text-sm">Post your first job</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {data.map(job => (
                <div key={job.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-500 text-sm">{job.location} · {job.type}</p>
                    </div>
                    <span className="text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      {job.applications.length} applicants
                    </span>
                  </div>
                  <Link to={`/jobs/${job.id}/applicants`} className="text-blue-600 text-sm hover:underline">
                    View applicants →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}