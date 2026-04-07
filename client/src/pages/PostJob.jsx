import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API from '../config'


export default function PostJob() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', company: '', description: '', location: '', type: 'full-time', salary: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user || user.role !== 'employer') {
    navigate('/')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post(`${API}/jobs`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post job')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Post a Job</h1>
      <p className="text-gray-500 text-sm mb-8">Fill in the details to attract the best candidates</p>
      {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
          <input type="text" placeholder="e.g. Senior React Developer" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <input type="text" placeholder="Your company name" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.company} onChange={e => setForm({...form, company: e.target.value})} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea placeholder="Describe the role, requirements, and benefits..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input type="text" placeholder="e.g. Remote, London" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Salary (optional)</label>
          <input type="text" placeholder="e.g. $60,000 - $80,000" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white rounded-xl py-3 text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  )
}