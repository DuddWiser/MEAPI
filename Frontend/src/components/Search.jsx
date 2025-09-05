import { useState } from 'react'

const Search = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://meapi-8qly.onrender.com/api/user/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error('Search failed')
      }
      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err.message)
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Search</h2>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for skills, projects, education..."
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Results */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {results && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Search Results for "{query}"</h3>
          
          {/* Profile Results */}
          {results.profile && results.profile.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Profile Matches:</h4>
              <ul className="list-disc list-inside pl-2">
                {results.profile.map((field, index) => (
                  <li key={index} className="text-gray-600">{field}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Education Results */}
          {results.education && results.education.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Education Matches:</h4>
              <div className="space-y-3">
                {results.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <h5 className="font-medium text-gray-900">{edu.institution}</h5>
                    <p className="text-gray-600">{edu.degree}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Results */}
          {results.skills && results.skills.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Skill Matches:</h4>
              <div className="flex flex-wrap gap-2">
                {results.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects Results */}
          {results.projects && results.projects.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Project Matches:</h4>
              <div className="space-y-4">
                {results.projects.map((project, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="text-lg font-medium text-gray-900">{project.title}</h5>
                    <p className="text-gray-600">{project.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Results */}
          {results.work && results.work.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">Work Experience Matches:</h4>
              <div className="space-y-3">
                {results.work.map((job, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <h5 className="font-medium text-gray-900">{job.company}</h5>
                      <p className="text-sm text-gray-500">{job.duration}</p>
                    </div>
                    <p className="text-gray-600">{job.position}</p>
                    {job.description && (
                      <p className="mt-1 text-gray-700">{job.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {Object.values(results).every(arr => arr.length === 0) && (
            <p className="text-gray-500">No results found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
