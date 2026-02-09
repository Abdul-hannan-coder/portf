# Portfolio Backend API Documentation

## Overview

This document outlines the specifications for a backend API system designed to power the Abdul Hannan Portfolio website. The backend will replace the current static `portfolio.json` file with a dynamic, scalable REST API that supports CRUD operations and includes an admin panel for content management.

## Current Architecture

The frontend is built with:
- **Framework**: Next.js 16.1.6 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 12.23.24
- **Language**: TypeScript 5
- **Data Source**: Static JSON file (`data/portfolio.json`)

## Proposed Backend Stack

### Recommended Technology Stack

#### Option 1: Node.js/Express (Recommended)
```
- Runtime: Node.js 20+
- Framework: Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: JWT (JSON Web Tokens)
- Image Upload: Multer + AWS S3 or Cloudinary
- Validation: Joi or Zod
- Security: Helmet, CORS, Rate Limiting
```

#### Option 2: Python/FastAPI
```
- Runtime: Python 3.11+
- Framework: FastAPI
- Database: PostgreSQL with SQLAlchemy
- Authentication: OAuth2 with JWT
- Image Upload: AWS S3 SDK
- Validation: Pydantic
- Security: CORS middleware, Rate limiting
```

## Database Schema

### Collections/Tables

#### 1. Personal Information
```json
{
  "_id": "ObjectId",
  "name": "String",
  "initials": "String",
  "title": "String",
  "subtitle": "String",
  "tagline": "String",
  "profileImage": "String (URL)",
  "heroImage": "String (URL)",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

#### 2. About
```json
{
  "_id": "ObjectId",
  "title": "String",
  "highlightedTitle": "String",
  "paragraphs": ["String"],
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

#### 3. Navigation
```json
{
  "_id": "ObjectId",
  "label": "String",
  "icon": "String",
  "href": "String",
  "order": "Number",
  "isActive": "Boolean",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

#### 4. Timeline (Work & Education)
```json
{
  "_id": "ObjectId",
  "type": "String (enum: ['work', 'education'])",
  "icon": "String",
  "iconColor": "String",
  "title": "String",
  "location": "String",
  "period": "String",
  "description": ["String"],
  "skills": ["String"],
  "order": "Number",
  "isActive": "Boolean",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

#### 5. Projects
```json
{
  "_id": "ObjectId",
  "slug": "String (unique, indexed)",
  "platform": "String",
  "featured": "Boolean",
  "rating": "Number (1-5)",
  "title": "String",
  "category": "String",
  "date": "String",
  "client": {
    "name": "String",
    "feedback": "String",
    "description": ["String"]
  },
  "tags": ["String"],
  "description": "String",
  "objectives": ["String"],
  "detailedDescription": "String",
  "image": "String (URL)",
  "technologies": ["String"],
  "isActive": "Boolean",
  "views": "Number",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

#### 6. Certifications
```json
{
  "_id": "ObjectId",
  "title": "String",
  "issuer": "String",
  "date": "String",
  "credentialId": "String",
  "credentialUrl": "String (optional)",
  "icon": "String",
  "iconColor": "String",
  "image": "String (URL)",
  "skills": ["String"],
  "description": "String",
  "order": "Number",
  "isActive": "Boolean",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

#### 7. Social Links
```json
{
  "_id": "ObjectId",
  "name": "String",
  "href": "String (URL)",
  "icon": "String",
  "order": "Number",
  "isActive": "Boolean",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

#### 8. Footer
```json
{
  "_id": "ObjectId",
  "title": "String",
  "subtitle": "String (HTML allowed)",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

#### 9. Users (Admin Panel)
```json
{
  "_id": "ObjectId",
  "email": "String (unique)",
  "password": "String (hashed)",
  "name": "String",
  "role": "String (enum: ['admin', 'editor'])",
  "isActive": "Boolean",
  "lastLogin": "DateTime",
  "createdAt": "DateTime",
  "updatedAt": "DateTime"
}
```

#### 10. Analytics (Optional)
```json
{
  "_id": "ObjectId",
  "type": "String (enum: ['page_view', 'project_view', 'contact_submission'])",
  "path": "String",
  "projectId": "ObjectId (optional)",
  "userAgent": "String",
  "ipAddress": "String",
  "referrer": "String",
  "timestamp": "DateTime"
}
```

## API Endpoints

### Base URL
```
Development: http://localhost:5000/api/v1
Production: https://api.abdulhannan.com/api/v1
```

### Public Endpoints (No Authentication Required)

#### Personal Information
```
GET    /personal              - Get personal information
```

#### About
```
GET    /about                 - Get about information
```

#### Navigation
```
GET    /navigation            - Get all navigation items (active only)
```

#### Timeline
```
GET    /timeline              - Get all timeline items (active only)
GET    /timeline/:id          - Get specific timeline item
```

#### Projects
```
GET    /projects              - Get all projects (with pagination & filters)
GET    /projects/:slug        - Get single project by slug
GET    /projects/featured     - Get featured projects only
```

Query Parameters for `/projects`:
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 50)
- `category` (string): Filter by category
- `platform` (string): Filter by platform
- `featured` (boolean): Filter featured projects
- `search` (string): Search in title, description, tags
- `sort` (string): Sort by field (createdAt, rating, views)
- `order` (string): asc or desc

#### Certifications
```
GET    /certifications        - Get all certifications (active only)
GET    /certifications/:id    - Get specific certification
```

#### Social Links
```
GET    /social                - Get all social links (active only)
```

#### Footer
```
GET    /footer                - Get footer information
```

#### Contact
```
POST   /contact               - Submit contact form
```

Request Body:
```json
{
  "name": "string (required)",
  "email": "string (required, email format)",
  "subject": "string (required)",
  "message": "string (required, min 10 chars)"
}
```

#### Analytics
```
POST   /analytics/page-view   - Track page view
POST   /analytics/project-view - Track project view
```

### Admin Endpoints (Authentication Required)

#### Authentication
```
POST   /auth/login            - Admin login
POST   /auth/logout           - Admin logout
POST   /auth/refresh          - Refresh access token
GET    /auth/me               - Get current user info
```

#### Personal Information Management
```
PUT    /admin/personal        - Update personal information
POST   /admin/personal/upload-image - Upload profile/hero image
```

#### About Management
```
PUT    /admin/about           - Update about information
```

#### Navigation Management
```
GET    /admin/navigation      - Get all navigation items (including inactive)
POST   /admin/navigation      - Create navigation item
PUT    /admin/navigation/:id  - Update navigation item
DELETE /admin/navigation/:id  - Delete navigation item
PUT    /admin/navigation/reorder - Reorder navigation items
```

#### Timeline Management
```
GET    /admin/timeline        - Get all timeline items (including inactive)
POST   /admin/timeline        - Create timeline item
PUT    /admin/timeline/:id    - Update timeline item
DELETE /admin/timeline/:id    - Delete timeline item
PUT    /admin/timeline/reorder - Reorder timeline items
```

#### Projects Management
```
GET    /admin/projects        - Get all projects (including inactive)
POST   /admin/projects        - Create project
PUT    /admin/projects/:id    - Update project
DELETE /admin/projects/:id    - Delete project
POST   /admin/projects/:id/upload-image - Upload project image
```

#### Certifications Management
```
GET    /admin/certifications  - Get all certifications (including inactive)
POST   /admin/certifications  - Create certification
PUT    /admin/certifications/:id - Update certification
DELETE /admin/certifications/:id - Delete certification
POST   /admin/certifications/:id/upload-image - Upload certification image
PUT    /admin/certifications/reorder - Reorder certifications
```

#### Social Links Management
```
GET    /admin/social          - Get all social links (including inactive)
POST   /admin/social          - Create social link
PUT    /admin/social/:id      - Update social link
DELETE /admin/social/:id      - Delete social link
PUT    /admin/social/reorder  - Reorder social links
```

#### Footer Management
```
PUT    /admin/footer          - Update footer information
```

#### Users Management
```
GET    /admin/users           - Get all users
POST   /admin/users           - Create user
PUT    /admin/users/:id       - Update user
DELETE /admin/users/:id       - Delete user
```

#### Analytics
```
GET    /admin/analytics/overview - Get analytics overview
GET    /admin/analytics/projects - Get project views stats
GET    /admin/analytics/traffic  - Get traffic stats
```

## Authentication & Authorization

### JWT Token Structure
```json
{
  "userId": "ObjectId",
  "email": "string",
  "role": "string",
  "iat": "timestamp",
  "exp": "timestamp"
}
```

### Token Types
- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to obtain new access tokens

### Headers Required
```
Authorization: Bearer <access_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2026-02-09T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {} // Optional validation errors
  },
  "timestamp": "2026-02-09T10:30:00Z"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "timestamp": "2026-02-09T10:30:00Z"
}
```

## Error Codes

```
400 - Bad Request (Validation errors)
401 - Unauthorized (Missing or invalid token)
403 - Forbidden (Insufficient permissions)
404 - Not Found (Resource doesn't exist)
409 - Conflict (Duplicate resource)
422 - Unprocessable Entity (Invalid data)
429 - Too Many Requests (Rate limit exceeded)
500 - Internal Server Error
503 - Service Unavailable
```

## Security Considerations

### 1. Authentication
- Use bcrypt for password hashing (salt rounds: 12)
- Implement JWT with short expiration times
- Store refresh tokens securely (httpOnly cookies recommended)

### 2. Input Validation
- Validate all input data using Joi/Zod
- Sanitize HTML inputs to prevent XSS
- Implement request size limits

### 3. Rate Limiting
- Public endpoints: 100 requests/15 minutes per IP
- Admin endpoints: 1000 requests/15 minutes per user
- Contact form: 5 submissions/hour per IP

### 4. CORS Configuration
```javascript
{
  origin: [
    'http://localhost:3000',
    'https://abdulhannan.com',
    'https://www.abdulhannan.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

### 5. File Upload Security
- Maximum file size: 5MB for images
- Allowed types: jpg, jpeg, png, webp
- Scan for malware
- Generate unique filenames
- Store in cloud storage (AWS S3/Cloudinary)

### 6. Environment Variables
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
FRONTEND_URL=https://abdulhannan.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
ADMIN_EMAIL=abdulhannan.personal@gmail.com
```

## Project Structure

```
portfolio-backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   └── env.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Certification.js
│   │   ├── Timeline.js
│   │   ├── Navigation.js
│   │   ├── Social.js
│   │   └── Personal.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   ├── certification.controller.js
│   │   ├── timeline.controller.js
│   │   ├── contact.controller.js
│   │   └── admin.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── public.routes.js
│   │   └── admin.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── error.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── upload.middleware.js
│   ├── utils/
│   │   ├── email.js
│   │   ├── jwt.js
│   │   ├── logger.js
│   │   └── helpers.js
│   ├── validators/
│   │   ├── project.validator.js
│   │   ├── certification.validator.js
│   │   ├── timeline.validator.js
│   │   └── contact.validator.js
│   ├── services/
│   │   ├── email.service.js
│   │   ├── upload.service.js
│   │   └── analytics.service.js
│   └── app.js
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Admin Panel Features

### Dashboard
- Overview statistics (total projects, certifications, page views)
- Recent contact form submissions
- Recent project views
- Quick actions (add project, add certification)

### Content Management
- **Projects**: Full CRUD with image upload, drag-and-drop reordering
- **Certifications**: Full CRUD with image upload, reordering
- **Timeline**: Full CRUD with reordering
- **About**: Rich text editor for content
- **Navigation**: Add/edit/reorder menu items
- **Social Links**: Manage social media links

### Media Management
- Image library with upload, delete, and search
- Bulk upload support
- Image optimization and compression
- CDN integration

### Analytics
- Page view tracking
- Project view tracking
- Contact form submission tracking
- Traffic sources
- Popular projects

### Settings
- Personal information
- Footer content
- User management
- Email notification settings

## Frontend Integration Changes

### 1. Environment Variables
```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.abdulhannan.com/api/v1
```

### 2. API Client Setup
```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  const result = await response.json();
  return result.data;
}
```

### 3. Data Fetching Example
```typescript
// app/page.tsx
import { fetchData } from '@/lib/api';

export default async function Home() {
  const personal = await fetchData('/personal');
  const about = await fetchData('/about');
  const timeline = await fetchData('/timeline');
  const certifications = await fetchData('/certifications');
  
  return (
    <div>
      <Hero personal={personal} />
      <About about={about} personal={personal} />
      <Timeline timeline={timeline} />
      <Certifications certifications={certifications} />
    </div>
  );
}
```

## Migration Plan

### Phase 1: Backend Development (Week 1-2)
1. Setup project structure
2. Configure database and environment
3. Create models and schemas
4. Implement authentication
5. Build public API endpoints
6. Build admin API endpoints
7. Add validation and error handling
8. Implement file upload
9. Write tests

### Phase 2: Admin Panel Development (Week 3-4)
1. Setup admin frontend (React/Next.js)
2. Implement authentication flow
3. Build dashboard
4. Create CRUD interfaces
5. Add image upload functionality
6. Implement analytics views
7. Add user management

### Phase 3: Frontend Integration (Week 5)
1. Update frontend to use API
2. Replace static JSON with API calls
3. Add error handling
4. Implement caching strategy (ISR)
5. Test all features
6. Performance optimization

### Phase 4: Deployment (Week 6)
1. Setup production database
2. Configure cloud storage
3. Deploy backend API
4. Deploy admin panel
5. Update frontend environment variables
6. DNS configuration
7. SSL certificates
8. Monitoring and logging

## Deployment Options

### Backend
- **VPS**: DigitalOcean, Linode, AWS EC2
- **PaaS**: Heroku, Render, Railway
- **Serverless**: AWS Lambda, Vercel Functions

### Database
- **Cloud**: MongoDB Atlas, AWS RDS
- **Self-hosted**: Docker container on VPS

### File Storage
- **AWS S3**: Best for scalability
- **Cloudinary**: Built-in image optimization
- **DigitalOcean Spaces**: Cost-effective

### Frontend (Already on Vercel)
- Keep Next.js frontend on Vercel
- Update environment variables for API

## Monitoring & Maintenance

### Logging
- Use Winston or Pino for structured logging
- Log levels: error, warn, info, debug
- Store logs in files and/or cloud service

### Monitoring
- **Application**: PM2, New Relic, or Datadog
- **Server**: Netdata, Prometheus + Grafana
- **Uptime**: UptimeRobot, Pingdom

### Backups
- Daily automated database backups
- Store in separate cloud storage
- Retention: 30 days

### Security Updates
- Regular dependency updates
- Security audit monthly
- Automated vulnerability scanning

## Cost Estimation (Monthly)

### Development Environment
- Free tier services: $0

### Production Environment
- **VPS** (2GB RAM, 1 vCPU): $10-15/month
- **Database** (MongoDB Atlas M0): $0 (Free tier)
- **Cloud Storage** (Cloudinary free tier): $0
- **Domain SSL**: $0 (Let's Encrypt)
- **Total**: ~$10-15/month

### Scaled Environment
- **VPS** (4GB RAM, 2 vCPU): $20-30/month
- **Database** (MongoDB Atlas M10): $57/month
- **Cloud Storage** (Cloudinary Basic): $0-89/month
- **Monitoring**: $0-50/month
- **Total**: ~$77-226/month

## API Testing

### Tools
- **Postman**: API testing and documentation
- **Jest/Mocha**: Unit and integration tests
- **Supertest**: HTTP assertions

### Sample Test
```javascript
describe('Projects API', () => {
  it('should fetch all projects', async () => {
    const response = await request(app)
      .get('/api/v1/projects')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
```

## Future Enhancements

1. **Blog System**: Add blog posts with categories and tags
2. **Comments**: Allow comments on projects
3. **Newsletter**: Email subscription management
4. **Multi-language**: Internationalization support
5. **Search**: Full-text search with Elasticsearch
6. **Notifications**: Real-time notifications for admin
7. **API Versioning**: Support multiple API versions
8. **GraphQL**: Alternative to REST API
9. **Webhooks**: External integrations
10. **AI Integration**: ChatGPT integration for visitor Q&A

## Support & Maintenance

### Documentation
- API documentation with Swagger/OpenAPI
- Admin panel user guide
- Deployment guide
- Troubleshooting guide

### Version Control
- Git repository with branching strategy
- Semantic versioning (v1.0.0)
- Changelog maintenance

## Contact for Backend Development

**Abdul Hannan**
- Email: abdulhannan.personal@gmail.com
- GitHub: https://github.com/Abdul-hannan-coder
- LinkedIn: https://www.linkedin.com/in/abdul-hannan-bhatti/

---

## Quick Start (For Developers)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd portfolio-backend
npm install
cp .env.example .env
# Edit .env with your configurations
```

### 2. Database Setup
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas cloud database
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Tests
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
npm start
```

## API Documentation

Once deployed, interactive API documentation will be available at:
```
https://api.abdulhannan.com/api-docs
```

## License

This project is private and proprietary. All rights reserved.

---

**Last Updated**: February 9, 2026
**Version**: 1.0.0
**Status**: Planning Phase
