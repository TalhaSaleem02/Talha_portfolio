import mongooseConnect from "@/lib/mongoose";
import { Project } from "@/models/Project";

export default async function handler(req, res) {
  try {
    // Ensure the database is connected
    await mongooseConnect();

    if (req.method === "GET") {
      // Fetch projects from the database
      const projects = await Project.find();
      res.status(200).json(projects);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in /api/projects:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
