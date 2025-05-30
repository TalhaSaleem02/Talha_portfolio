import mongooseConnect from "@/lib/mongoose";
import { Shop } from "@/models/Shop"

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === "POST") {
            // Handle POST request (Create new blog)
            const { title, slug, images, description, afilink, price, tags, status } = req.body;

            // Debugging log

            const blogDoc = await Shop.create({
                title, slug, images, description, afilink, price, tags,status,
            });
            console.log("testpostapi", blogDoc)

            return res.status(201).json(blogDoc);

        }

        if (method === "GET") {
            // Handle GET request (Fetch blog(s))
            if (req.query?.id) {
                const blog = await Shop.findById(req.query.id);
                return res.json(blog);
            } else {
                const blogs = await Shop.find().sort({ createdAt: -1 }); // Fetch all and sort by newest
                return res.json(blogs);
            }
        }

        if (method === "PUT") {
            // Handle PUT request (Update blog)
            const { _id, title, slug, images, description, afilink, price, tags, status } = req.body;

            await Project.updateOne({ _id }, {
                title, slug, images, description, afilink, price, tags, status
            });

            return res.status(200).json({ success: true, message: "Product updated successfully" });
        }

        if (method === "DELETE") {
            // Handle DELETE request (Delete blog)
            if (req.query?.id) {
                await Shop.deleteOne({ _id: req.query.id });
                return res.json({ success: true, message: "Product deleted successfully" });
            }
        }

        // If the method is not supported
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).json({ error: `Method ${method} not allowed` });

    } catch (error) {
        console.error("Error handling request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
