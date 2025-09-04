import { useState, useEffect } from 'react'

const Projects = ({ data }) => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedSkill, setSelectedSkill] = useState('all')

  useEffect(() => {
    if (data && data.projects) {
      setProjects(data.projects)
      setFilteredProjects(data.projects)
    }
  }, [data])

  const handleSkillFilter = (skill) => {
    setSelectedSkill(skill)
    if (skill === 'all') {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter(project =>
        project.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      )
      setFilteredProjects(filtered)
    }
  }

  // Get all unique skills from projects
  const allSkills = [...new Set(projects.flatMap(project => project.skills))]

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        
        {/* Skill Filter */}
        <div className="flex items-center space-x-2">
          <label htmlFor="skill-filter" className="text-sm font-medium text-gray-700">
            Filter by skill:
          </label>
          <select
            id="skill-filter"
            value={selectedSkill}
            onChange={(e) => handleSkillFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All Skills</option>
            {allSkills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <p className="text-gray-500">No projects found with the selected skill.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Skills used:</h4>
                <div className="flex flex-wrap gap-2">
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
              
              {/* Links - Don't show for first project (index 0) */}
              {project.links && project.links.length > 0 && index !== 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Links:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                      >
                        View Project
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Projects