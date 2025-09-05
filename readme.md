Me-API Playground 🚀
A personal API showcase built with the MERN stack that displays my profile, skills, and projects through a RESTful API and React frontend.

🌐 Live Demo
Frontend: https://meapi-frontend.onrender.com/

Health Check: https://meapi-8qly.onrender.com/health

GitHub Repository: https://github.com/DuddWiser/MEAPI

Resume: https://drive.google.com/file/d/1oerVbfR8H9_WOQ143YU9cOmI5O_jewNz/view?usp=drive_link

🛠 Tech Stack
Client: React, JavaScript, TailwindCSS, Vite
Server: Node.js, Express.js, MongoDB, Mongoose, CORS
Deployment: Render (Frontend & Backend), MongoDB Atlas

📖 Project Description
A personal API playground designed to showcase my developer profile, skills, and projects through a RESTful API interface. The platform serves as a dynamic portfolio that can be accessed programmatically, demonstrating backend API development skills and modern frontend implementation with a sleek glassmorphism UI design.

🏗 Architecture
System Architecture
text
Client (React Frontend) → API Gateway (Express.js) → MongoDB Database
Frontend Architecture
Framework: React 18 with Vite

Styling: Tailwind CSS with custom glassmorphism design

State Management: React Hooks

HTTP Client: Native Fetch API

Build Tool: Vite

Backend Architecture
Runtime: Node.js

Framework: Express.js

Database: MongoDB with Mongoose ODM

CORS: Configured for cross-origin requests

Environment: dotenv for configuration management

🚀 Setup Instructions
Local Development
Prerequisites
Node.js 16+

MongoDB Atlas account or local MongoDB

Git

Backend Setup
bash
# Clone repository
git clone https://github.com/Nishant-NITG/Me-API-Playground.git
cd Me-API-Playground/backend

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Edit .env with your MongoDB URI:
# DB_CONNECT_STRING=your_mongodb_connection_string
# PORT=5000

# Start development server
npm run dev
Frontend Setup
bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
Production Deployment
Backend Deployment (Render)
Connect GitHub repository to Render

Set root directory to backend

Add environment variables:

DB_CONNECT_STRING: Your MongoDB Atlas connection string

PORT: 5000

NODE_ENV: production

Frontend Deployment (Render)
Create static site on Render

Set root directory to frontend

Build command: npm run build

Publish directory: dist

Environment variable: VITE_API_URL: your-backend-url.onrender.com

🗄 Database Schema
User Collection Schema
javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  education: [{
    institution: String,
    degree: String,
    year: String
  }],
  skills: [String],
  projects: [{
    title: String,
    description: String,
    links: [String],
    skills: [String]
  }],
  work: [{
    company: String,
    position: String,
    duration: String,
    description: String
  }],
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  },
  createdAt: Date,
  updatedAt: Date
}
Indexes
email: Unique index for user identification

📡 API Endpoints
Base URL: https://me-api-playground-backend-4n1g.onrender.com/api
Method	Endpoint	Description	Parameters
GET	/user	Get complete user profile	None
PUT	/user	Create or update user profile	User data in body
GET	/user/projects	Get projects filtered by skill	skill (query parameter)
GET	/user/skills/top	Get top skills by usage	None
GET	/user/search	Search across all user data	q (query parameter)
cURL Examples
Health Check:

bash
curl https://meapi-8qly.onrender.com/health
Get User Profile:

bash
curl https://meapi-8qly.onrender.com/api/user
Get Projects by Skill:

bash
curl "https://meapi-8qly.onrender.com/api/user/projects?skill=javascript"
Search Across Data:

bash
curl "https://meapi-8qly.onrender.com/api/user/search?q=react"
Get Top Skills:

bash
curl https://meapi-8qly.onrender.com/api/user/skills/top
Postman Collection
Import the following JSON into Postman:

json
{
  "info": {
    "name": "Me-API Playground",
    "description": "API endpoints for personal portfolio",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "https://me-api-playground-backend-4n1g.onrender.com/health",
          "protocol": "https",
          "host": ["me-api-playground-backend-4n1g", "onrender", "com"],
          "path": ["health"]
        }
      }
    },
    {
      "name": "Get User Profile",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "https://me-api-playground-backend-4n1g.onrender.com/api/user",
          "protocol": "https",
          "host": ["me-api-playground-backend-4n1g", "onrender", "com"],
          "path": ["api", "user"]
        }
      }
    },
    {
      "name": "Get Projects by Skill",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "https://me-api-playground-backend-4n1g.onrender.com/api/user/projects?skill=javascript",
          "protocol": "https",
          "host": ["me-api-playground-backend-4n1g", "onrender", "com"],
          "path": ["api", "user", "projects"],
          "query": [
            {
              "key": "skill",
              "value": "javascript"
            }
          ]
        }
      }
    },
    {
      "name": "Search Data",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "https://me-api-playground-backend-4n1g.onrender.com/api/user/search?q=react",
          "protocol": "https",
          "host": ["me-api-playground-backend-4n1g", "onrender", "com"],
          "path": ["api", "user", "search"],
          "query": [
            {
              "key": "q",
              "value": "react"
            }
          ]
        }
      }
    },
    {
      "name": "Get Top Skills",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "https://me-api-playground-backend-4n1g.onrender.com/api/user/skills/top",
          "protocol": "https",
          "host": ["me-api-playground-backend-4n1g", "onrender", "com"],
          "path": ["api", "user", "skills", "top"]
        }
      }
    }
  ]
}
⚠ Known Limitations
Authentication: No authentication mechanism for write operations

Rate Limiting: No rate limiting implemented

Pagination: Large datasets are not paginated

Data Validation: Limited input validation on API endpoints

Error Handling: Basic error handling without comprehensive logging

Testing: Limited test coverage

Caching: No response caching implemented

Image Uploads: No support for profile image uploads

📞 Contact 
Kunal Maka
📧 makakunal072004@gmail.com
🔗 LinkedIn Profile
🐙 GitHub Profile


📄 License
MIT License - see LICENSE file for details.
