import mongooseConnect from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === "POST") {
            // Handle POST request (Create new blog)
            const { name, lname, email, company, phone, country, price, description, project } = req.body;

            const blogDoc = await Contact.create({
                name, lname, email, company, phone, country, price, description, project
            });

            return res.status(201).json(blogDoc);
        }

        if (method === "GET") {
            // Handle GET request (Fetch blog(s))
            if (req.query?.id) {
                const blog = await ContactfindById(req.query.id);
                return res.json(blog);
            } else {
                const blogs = await Contact.find().sort({ createdAt: -1 }); // Fetch all and sort by newest
                return res.json(blogs);
            }
        }

        if (method === "PUT") {
            // Handle PUT request (Update blog)
            const { _id, name, lname, email, company, phone, country, price, description, project } = req.body;

            await Contact.updateOne({ _id }, {
                name, lname, email, company, phone, country, price, description, project
            });

            return res.status(200).json({ success: true, message: "contact updated successfully" });
        }

        if (method === "DELETE") {
            // Handle DELETE request (Delete blog)
            if (req.query?.id) {
                await Contact.deleteOne({ _id: req.query.id });
                return res.json({ success: true, message: "contact deleted successfully" });
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
