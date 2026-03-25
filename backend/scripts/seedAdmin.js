import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        const adminEmail = "admin@jobportal.com"; // Default admin email
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin user already exists.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10); // Default admin password

        await User.create({
            fullname: "System Admin",
            email: adminEmail,
            phoneNumber: 9999999999,
            password: hashedPassword,
            role: "admin",
            profile: {
                bio: "Platform Administrator",
                profilePhoto: ""
            }
        });

        console.log("Admin user created successfully!");
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: Admin@123`);
        
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
