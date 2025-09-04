const User = require('../models/User');

// Get user profile
const getUser = async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update user profile
const updateUser = async (req, res) => {
  try {
    // Since we're storing only one profile, we'll upsert
    const user = await User.findOneAndUpdate(
      {}, 
      req.body, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get projects by skill
const getProjectsBySkill = async (req, res) => {
  try {
    const { skill } = req.query;
    if (!skill) {
      return res.status(400).json({ message: 'Skill parameter is required' });
    }
    
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const filteredProjects = user.projects.filter(project => 
      project.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    );
    
    res.status(200).json(filteredProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top skills
const getTopSkills = async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Count skill occurrences across all projects and profile
    const skillCount = {};
    
    // Count skills from profile
    user.skills.forEach(skill => {
      const key = skill.toLowerCase();
      skillCount[key] = (skillCount[key] || 0) + 1;
    });
    
    // Count skills from projects
    user.projects.forEach(project => {
      project.skills.forEach(skill => {
        const key = skill.toLowerCase();
        skillCount[key] = (skillCount[key] || 0) + 1;
      });
    });
    
    // Convert to array and sort by count
    const topSkills = Object.entries(skillCount)
      .sort((a, b) => b[1] - a[1])
      .map(([skill]) => skill);
    
    res.status(200).json(topSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search across all fields
const search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
    
    const user = await User.findOne();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const searchTerm = q.toLowerCase();
    const results = {
      profile: [],
      education: [],
      skills: [],
      projects: [],
      work: []
    };
    
    // Search in profile fields
    if (user.name.toLowerCase().includes(searchTerm)) results.profile.push('name');
    if (user.email.toLowerCase().includes(searchTerm)) results.profile.push('email');
    
    // Search in education
    user.education.forEach(edu => {
      if (edu.institution.toLowerCase().includes(searchTerm) || 
          edu.degree.toLowerCase().includes(searchTerm)) {
        results.education.push(edu);
      }
    });
    
    // Search in skills
    user.skills.forEach(skill => {
      if (skill.toLowerCase().includes(searchTerm)) {
        results.skills.push(skill);
      }
    });
    
    // Search in projects
    user.projects.forEach(project => {
      if (project.title.toLowerCase().includes(searchTerm) || 
          project.description.toLowerCase().includes(searchTerm)) {
        results.projects.push(project);
      }
    });
    
    // Search in work experience
    user.work.forEach(work => {
      if (work.company.toLowerCase().includes(searchTerm) || 
          work.position.toLowerCase().includes(searchTerm) || 
          work.description.toLowerCase().includes(searchTerm)) {
        results.work.push(work);
      }
    });
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUser,
  updateUser,
  getProjectsBySkill,
  getTopSkills,
  search
};