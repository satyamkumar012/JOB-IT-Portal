# Job Portal Application

A comprehensive full-stack web application designed to bridge the gap between job seekers and employers. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this platform offers a seamless experience for finding jobs and managing recruitment processes.

## 📖 About the Project

The Job Portal Application is a robust solution for the modern recruitment landscape. It serves two primary user groups: **Job Seekers** looking for their next career opportunity, and **Recruiters/Companies** seeking top talent.

The platform focuses on user experience, offering intuitive navigation, real-time updates, and a clean, responsive interface. By streamlining the application and posting process, it reduces the friction often associated with job hunting and hiring.

## 🚀 Key Features

### For Job Seekers
- **Advanced Multi-Category Filtering**: Combine multiple filters like Location, Industry, and Salary (LPA) simultaneously for highly precise job searches.
- **Embedded Resume Preview**: View your uploaded resume directly in the browser within a professional preview window—no download required.
- **Smart Global Search**: High-performance search from the Hero Section with "Enter" key support and location-aware backend matching.
- **Profile Management**: Build a professional profile with high-quality circular avatars and comprehensive experience tracking.

### For Recruiters & Companies
- **Real-time Applicant Feedback**: Update applicant status (Accepted/Rejected) with instant, color-coded visual feedback in the dashboard.
- **Inline Resume Review**: Review candidate resumes instantly via the embedded PDF viewer, streamlining the shortlisting process.
- **Company Branding**: Create and manage detailed company profiles with properly scaled and optimized logos.

### Technical Highlights
- **Premium Aesthetics**: A custom Deep Red theme with glassmorphism effects and smooth micro-animations for a high-end user experience.
- **Robust State Management**: Advanced category-aware Redux state for persistent and additive filtering logic.
- **Cloudinary Integration**: Optimized handling of images and documents (PDFs) with correct MIME-type serving for browser compatibility.
- **Defensive Engineering**: Comprehensive null-safety checks implemented across the application to handle state transitions gracefully.

## 🔄 How It Works

### For Job Seekers
1. **Register/Login**: Create an account to get started.
2. **Browse & Search**: Explore available job openings.
3. **View Details**: Click on a job to see requirements and description.
4. **Apply**: Submit your application instantly.
5. **Track**: Check your "My Applications" section for updates.

### For Recruiters
1. **Register Company**: Sign up and register your company details.
2. **Post Jobs**: specific requirements and roles.
3. **Manage**: View lists of applicants for each job.
4. **Select**: Review profiles and contact potential candidates.

## ⚡ Quick Start

To get the application running locally with a single command:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jobportal-in-mern-main
   ```

2. **Install Dependencies (Root)**
   ```bash
   npm install
   ```

3. **Start the Application**
   This command installs dependencies for both backend and frontend, builds the frontend, and starts the backend server.
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:8080`.

## 🛠️ Development Setup

If you want to run the backend and frontend separately for development:

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
```


Start the backend:
```bash
npm run dev
# Server runs on http://localhost:8080
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```

**Environment Variables (`frontend/.env.local`):**
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Start the frontend:
```bash
npm run dev
# App runs on http://localhost:5173
```

## 🏗️ Project Structure

### Backend
- **Models**: MongoDB schemas (User, Job, Company, Application).
- **Controllers**: Logic for handling API requests.
- **Routes**: API endpoints definitions.
- **Middlewares**: Auth verification, file upload handling.

### Frontend
- **Components**: Reusable UI blocks (Navbar, Footer, Cards).
- **Pages**: Main views (Home, Jobs, Browse, Profile).
- **Redux**: State slices for global data management.
- **Hooks**: Custom hooks for API interactions.

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Shadcn/ui, Redux Toolkit, Axios
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Cloudinary, Multer

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.

live:-

https://jobitportal.vercel.app