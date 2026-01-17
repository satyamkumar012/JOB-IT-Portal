# Job Portal Application

A comprehensive full-stack web application designed to bridge the gap between job seekers and employers. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this platform offers a seamless experience for finding jobs and managing recruitment processes.

## 📖 About the Project

The Job Portal Application is a robust solution for the modern recruitment landscape. It serves two primary user groups: **Job Seekers** looking for their next career opportunity, and **Recruiters/Companies** seeking top talent.

The platform focuses on user experience, offering intuitive navigation, real-time updates, and a clean, responsive interface. By streamlining the application and posting process, it reduces the friction often associated with job hunting and hiring.

## 🚀 Key Features

### For Job Seekers
- **Smart Job Search**: Filter jobs by keywords, location, and categories to find the perfect match.
- **Easy Application**: Apply to jobs with a single click after setting up your profile.
- **Application Tracking**: Monitor the status of your applications in real-time.
- **Profile Management**: Build a professional profile to showcase your skills and experience.

### For Recruiters & Companies
- **Job Posting**: Easily create and manage job listings with detailed descriptions.
- **Applicant Management**: Review applicants, view their profiles, and manage the hiring pipeline.
- **Company Branding**: Create a company profile to attract the best candidates.

### Technical Highlights
- **Secure Authentication**: Robust JWT-based auth system for users and admins.
- **Cloud Storage**: Integrated Cloudinary for efficient handling of profile pictures and logos.
- **Responsive Design**: Mobile-first approach using Tailwind CSS and Shadcn/ui.
- **State Management**: Scalable frontend state management with Redux Toolkit.

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

https://jobitportal.vercel.app/