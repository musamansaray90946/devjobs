import { useState, useEffect } from 'react'
import axios from 'axios'
import JobCard from '../components/JobCard'
import API from '../config'

const TYPES = ['all', 'full-time', 'part-time', 'contract']
const JOBS_PER_PAGE = 6

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchJobs()
  }, [type])

  const fetchJobs = async () => {
    setLoading(true)
    const params = {}
    if (search) params.search = search
    if (location) params.location = location
    if (type !== 'all') params.type = type
    const res = await axios.get(`${API}/jobs`, { params })
    setJobs(res.data)
    setPage(1)
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs()
  }

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE)
  const paginatedJobs = jobs.slice((page - 1) * JOBS_PER_PAGE, page * JOBS_PER_PAGE)

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/20">
            Trusted by 10,000+ developers worldwide
          </span>
          <h1 className="text-5xl font-bold mb-4 leading-tight tracking-tight">
            Find Your Dream <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Developer Job</span>
          </h1>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">Thousands of jobs from top tech companies. Your next career move starts here.</p>
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-3 flex gap-3 shadow-xl max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder="Job title or keyword..." className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <input type="text" placeholder="Location..." className="w-48 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-500/25">Search</button>
          </form>
          <div className="flex justify-center gap-8 mt-10 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>{jobs.length}+ Jobs</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <span>500+ Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Remote Friendly</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          {TYPES.map(t => (
            <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition ${type === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-300'}`}>
              {t === 'all' ? 'All Jobs' : t}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{jobs.length} jobs found</span>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <p className="text-gray-400 text-lg">No jobs found</p>
            <p className="text-gray-300 text-sm mt-1">Try different keywords or filters</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedJobs.map(job => <JobCard key={job.id} job={job} />)}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-30">Previous</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i + 1} onClick={() => setPage(i + 1)} className={`w-10 h-10 rounded-lg text-sm font-medium transition ${page === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>{i + 1}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition disabled:opacity-30">Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}