import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

import API from '../config'

export default function JobDetail() {
  const { id } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [coverLetter, setCoverLetter] = useState('')
  const [loading, setLoading] = useState(false)
  const [applied, setApplied] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get(`${API}/jobs/${id}`).then(res => setJob(res.data))
  }, [id])

  const handleApply = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/login')
    setLoading(true)
    try {
      await axios.post(`${API}/applications/${id}`, { coverLetter }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setApplied(true)
      setMessage('Application submitted successfully!')
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to apply')
    }
    setLoading(false)
  }

  if (!job) return <div className="text-center py-20 text-gray-400">Loading...</div>

  const typeColors = {
    'full-time': 'bg-green-100 text-green-700',
    'part-time': 'bg-yellow-100 text-yellow-700',
    'contract': 'bg-purple-100 text-purple-700'
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
                <p className="text-gray-500">{job.company}</p>
              </div>
              <span className={`text-sm font-medium px-3 py-1 rounded-full capitalize ${typeColors[job.type] || 'bg-gray-100 text-gray-600'}`}>
                {job.type}
              </span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500 mb-6">
              <span>📍 {job.location}</span>
              {job.salary && <span>💰 {job.salary}</span>}
              <span>🕒 {new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
            <h2 className="font-semibold text-gray-900 mb-3">Job Description</h2>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </div>
        </div>

        <div>
          {user?.role === 'seeker' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Apply for this job</h2>
              {message && (
                <p className={`text-sm mb-4 p-3 rounded-lg ${applied ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message}
                </p>
              )}
              {!applied && (
                <form onSubmit={handleApply} className="space-y-4">
                  <textarea
                    placeholder="Write your cover letter..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-40"
                    value={coverLetter}
                    onChange={e => setCoverLetter(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
              {!user && (
                <button onClick={() => navigate('/login')} className="w-full bg-blue-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-blue-700 transition">
                  Login to Apply
                </button>
              )}
            </div>
          )}

          {user?.role === 'employer' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-2">Posted by</h2>
              <p className="text-gray-600 text-sm">{job.employer.name}</p>
              <p className="text-gray-400 text-sm">{job.employer.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}