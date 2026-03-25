import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

// Get all users (Students & Recruiters)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select("-password");
        return res.status(200).json({
            users,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: "Cannot delete an admin user", success: false });
        }

        await User.findByIdAndDelete(userId);
        
        // Optionally delete jobs and applications associated with this user
        if (user.role === 'recruiter') {
            await Job.deleteMany({ created_by: userId });
        } else if (user.role === 'student') {
            await Application.deleteMany({ applicant: userId });
        }

        return res.status(200).json({
            message: "User and associated data deleted successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('created_by', 'fullname email').populate('company', 'name');
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Delete a job (e.g. fake jobs)
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        await Job.findByIdAndDelete(jobId);
        // Delete applications for this job
        await Application.deleteMany({ job: jobId });

        return res.status(200).json({
            message: "Job and associated applications deleted successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// Get system stats
export const getSystemStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalRecruiters = await User.countDocuments({ role: 'recruiter' });
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();

        return res.status(200).json({
            stats: {
                totalUsers,
                totalStudents,
                totalRecruiters,
                totalJobs,
                totalApplications
            },
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
