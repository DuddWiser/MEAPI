const Profile = ({ data }) => {
  if (!data) return <div>No profile data available</div>

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
          <p className="text-gray-600">{data.email}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex space-x-4">
            {data.links.github && (
              <a
                href={data.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                GitHub
              </a>
            )}
            {data.links.linkedin && (
              <a
                href={data.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                LinkedIn
              </a>
            )}
            {data.links.resume && (
              <a
                href={data.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                Resume
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Education */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900">{edu.institution}</h4>
                <p className="text-gray-600">{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile