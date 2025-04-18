import mongooseConnect from "@/lib/mongoose";
import { Profile } from "@/models/Profile";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await Profile.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await Profile.create({
            email,
            password: hashedPassword, // Store hashed password
        });

        return res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
