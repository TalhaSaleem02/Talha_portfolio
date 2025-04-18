import mongooseConnect from "@/lib/mongoose"; // default import
import { Blog } from "@/models/Blog";         // keep as named if you're exporting Blog that way

export default async function handler(req, res) {
  await mongooseConnect(); // connect to MongoDB
  const { method, query } = req;

  if (method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let blogS;

    if (query.id) {
      blogS = await Blog.findById(query.id);
    } else if (query.tags) {
      const tagArray = Array.isArray(query.tags)
        ? query.tags
        : query.tags.split(',').map(tag => tag.trim());
      blogS = await Blog.find({ tags: { $in: tagArray } });
    } else if (query.blogcategory) {
      blogS = await Blog.find({ blogcategory: query.blogcategory });
    } else if (query.slug) {
      blogS = await Blog.findOne({ slug: query.slug });
    } else {
      blogS = await Blog.find();
    }

    return res.status(200).json(blogS);
  } catch (error) {
    console.error("API Error in /api/blogs:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
// This code handles GET requests to fetch blog posts from a MongoDB database.
// It uses the mongoose library to connect to the database and perform queries.