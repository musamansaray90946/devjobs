import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  const typeColors = {
    'full-time': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    'part-time': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    'contract': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    'remote': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
  }

  return (
    <Link to={`/jobs/${job.id}`} className="block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{job.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{job.company}</p>
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${typeColors[job.type] || 'bg-gray-100 text-gray-600'}`}>{job.type}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">{job.description}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>📍 {job.location}</span>
        {job.salary && <span>💰 {job.salary}</span>}
        <span>🕒 {new Date(job.createdAt).toLocaleDateString()}</span>
      </div>
    </Link>
  )
}