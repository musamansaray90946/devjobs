import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

import API from '../config'

export default function Applicants() {
  const { jobId } = useParams()
  const { token } = useAuth()
  const [applications, setApplications] = useState([])
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` }
    const [appsRes, jobRes] = await Promise.all([
      axios.get(`${API}/applications/job/${jobId}`, { headers }),
      axios.get(`${API}/jobs/${jobId}`)
    ])
    setApplications(appsRes.data)
    setJob(jobRes.data)
    setLoading(false)
  }

  const updateStatus = async (appId, status) => {
    await axios.put(`${API}/applications/${appId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setApplications(prev =>
      prev.map(app => app.id === appId ? { ...app, status } : app)
    )
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    reviewed: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700'
  }

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link to="/dashboard" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Dashboard
      </Link>

      {job && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-500 text-sm">{job.company} · {job.location}</p>
        </div>
      )}

      <h2 className="font-semibold text-gray-900 mb-4">
        Applicants ({applications.length})
      </h2>

      {applications.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400">No applications yet for this job</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app.id} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{app.seeker.name}</h3>
                  <p className="text-gray-500 text-sm">{app.seeker.email}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Applied {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColors[app.status]}`}>
                  {app.status}
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700 font-medium mb-1">Cover Letter</p>
                <p className="text-sm text-gray-600 leading-relaxed">{app.coverLetter}</p>
              </div>

              <div className="flex gap-2">
                {['reviewed', 'accepted', 'rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => updateStatus(app.id, status)}
                    disabled={app.status === status}
                    className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition disabled:opacity-30 ${
                      status === 'accepted'
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : status === 'rejected'
                        ? 'bg-red-50 text-red-700 hover:bg-red-100'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    {status === 'reviewed' ? 'Mark Reviewed' : status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}