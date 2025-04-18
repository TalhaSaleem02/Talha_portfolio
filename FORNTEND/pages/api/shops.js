import mongooseConnect from "@/lib/mongoose";
import { Shop } from "@/models/Shop";

export default async function handle(req, res) {

    await mongooseConnect();

  const method = req.method;

  try {
    if (method === 'GET') {
      if (req.query?.id) {
        // Fetch a single shop by ID
        const shop = await Shop.findById(req.query.id);
        return res.json(shop);
      } else if (req.query?.slug) {
        // Fetch shops by slug
        const shopsBySlug = await Shop.find({ slug: req.query.slug });
        return res.json(shopsBySlug.reverse());
      } else {
        // Fetch all shops
        const allShops = await Shop.find();
        return res.json(allShops.reverse());
      }
    } else {
      // Method not allowed
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
    
}