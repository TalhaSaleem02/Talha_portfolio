import mongooseConnect from "@/lib/mongoose";
import { Courses } from "@/models/courses";

export default async function handler(req, res) {
  try {
    await mongooseConnect(); // Connect to MongoDB

    if (req.method === "GET") {
      // If an ID is provided, return a single course
      if (req.query?.id) {
        const course = await Courses.findById(req.query.id);
        if (!course) {
          return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json(course);
      }

      // Otherwise, return all courses
      const courses = await Courses.find().sort({ createdAt: -1 });
      return res.status(200).json(courses);
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}