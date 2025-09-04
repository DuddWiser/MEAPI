const express = require('express');
const router = express.Router();
const {
  getUser,
  updateUser,
  getProjectsBySkill,
  getTopSkills,
  search
} = require('../controllers/userController');

// GET /api/user - Get user profile
router.get('/', getUser);

// PUT /api/user - Create or update user profile
router.put('/', updateUser);

// GET /api/user/projects?skill=python - Get projects by skill
router.get('/projects', getProjectsBySkill);

// GET /api/user/skills/top - Get top skills
router.get('/skills/top', getTopSkills);

// GET /api/user/search?q=python - Search across all fields
router.get('/search', search);

module.exports = router;