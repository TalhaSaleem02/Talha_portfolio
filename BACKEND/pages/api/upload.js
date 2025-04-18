import mongooseConnect from "@/lib/mongoose";
import cloudinary from 'cloudinary';
import multiparty from 'multiparty';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
    // Connect to database
    await mongooseConnect();

    const form = new multiparty.Form();

    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });

    const links = [];
    for (const file of files.file) {
        const fileType = file.headers['content-type'];

        // Check if file is a video
        const isVideo = fileType.startsWith('video/');

        const folderName = isVideo ? 'project-videos' : 'blog-images';
        const resourceType = isVideo ? 'video' : 'auto';

        const result = await cloudinary.v2.uploader.upload(file.path, {
            folder: folderName,
            public_id: `file_${Date.now()}`,
            resource_type: 'auto',// This allows both image and video uploads
            folder: 'project-media'
        });

        links.push(result.secure_url);
    }

    return res.json({ links });
}

export const config = { 
    api: { bodyParser: false }
};