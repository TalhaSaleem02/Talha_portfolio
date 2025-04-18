
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';


export default function Blog(

    { _id,
      title: existingtitle,
      slug: existingslug,
      images: existingimages,
      description: existingdescription,
      blogcategory: existingblogcategory,
      tags: existingtags,
      status: existingstatus,

     }
) {


    const [redirct, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState( existingtitle || '');
    const [slug, setSlug] = useState(existingslug || '');
    const [images, setImages] = useState(existingimages || []);
    const [description, setDescription] = useState(existingdescription || '');
    const [blogcategory, setBlogcategory] = useState(existingblogcategory || []);
    const [tags, setTags] = useState(existingtags || []);
    const [status, setStatus] = useState(existingstatus || '');

    // for image uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadImagesQueue = [];

    async function createBlog(ev) {

        ev.preventDefault();


        if (isUploading) {
            await Promise.all(uploadImagesQueue);
        }

        const data = { title, slug, images, description, blogcategory, tags, status };

        if (_id) {
            await axios.put(`/api/blogs`, { ...data, _id });
            toast.success('Blog updated successfully');

        } else {
            await axios.post(`/api/blogs`, data);
            toast.success('Blog created successfully');

        }



        setRedirect(true);
    };

    async function uploadImages(ev) {
        const files = ev.target.files;
        if (files?.length > 0) {
            setIsUploading(true);
            for (const file of files) {
                const data = new FormData();
                data.append('file', file);
            
                // use the axios.post method and push the promise to the queue 
                uploadImagesQueue.push(
                    axios.post('/api/upload', data).then(res => {
                        setImages(oldImages => [...oldImages, ...res.data.links]);
                    })
                );
            }

        // wait for all images to finish uploading
        await Promise.all(uploadImagesQueue);

        setIsUploading(false);
        toast.success('Images uploaded successfully');
    } else {

        toast.error('No images selected');
     }
    }

if (redirct) {
    router.push('/blogs');
    return null;
}


function updateImagesOrder(images){
    setImages(images);
}

function handleDeleteImage(index){

    const updateImages = [...images];
    updateImages.splice(index, 1);  
    setImages(updateImages);
    toast.success('Image deleted successfully');
}

// for slug url
const handleSlugChanger = (ev) => {

    const inputValue = ev.target.value;
    const newSlug = inputValue.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    setSlug(newSlug);
}


return <>
    <form className='addWebsiteform' onSubmit={createBlog}>
        {/* blog title */}
        <div className='w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' placeholder=' Enter small title' value={title} onChange={ev => setTitle(ev.target.value)} />
        </div>

        {/* blog slug url */}

        <div className='w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='slug'>Slug (seo friendly url)
            </label>
            <input type='text' id='title' name='title' placeholder=' Enter slug url' value={slug} onChange={handleSlugChanger} />


        </div>


        {/* blog category*/}

        <div className='w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='category'>Select Category (for multiple select press ctr + mouse left key)</label>

            <select onChange={(e) => setBlogcategory(Array.from(e.target.selectedOptions, (option) => option.value))} value={blogcategory} name='category' id='category' multiple>
                <option value='Data Science'> Data Science</option>
                <option value='Artificial intelligence'> Artificial intelligence</option>
                <option value='Next Js'> Next Js</option>
                <option value='Mongo Db'> Mongo Db</option>
                <option value='Express Js'> Express Js</option>
                <option value='Javascript'> Javascript</option>

            </select>


        </div>

        {/* blog image */}

        <div className='w-100 flex flex-col flex-left mb-2'>
            <div className='w-100'>
                <label htmlFor='image'>Upload Image (first image will be shown as thumbnail)</label>
                <input type='file' id='fileinput' className='mt-1' accept='image/*' multiple onChange= {uploadImages} />
            </div>

            <div className='w-100 flex flex-left mt-1'>
                {isUploading && (<Spinner/>)}
            </div>


        </div>

        {/* image preview and image sortable with delete */}
        {!isUploading && (
            <div className="flex">
                <ReactSortable list = {Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} 
                className='flex gap-1'>

                    {images?.map((link, index) => (

                        <div key={link}  className = "uploading">
                            <img src={link} alt={link} className = 'object-cover'/>
                            <button type='button' onClick={() => handleDeleteImage(index)}>Delete</button>
                        </div>
                    )) }
                
                </ReactSortable>
            </div>
        )}
        {/* markdown description */}
        <div className='description w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='description'>
                Blog Content (for images: first upload and copy the link, then paste in ![alt text](link))
            </label>

            <MarkdownEditor


                value={description}
                onChange={(ev) => setDescription(ev.text)}


                style={{ width: '100%', height: '400px' }}
                renderHTML={(text) => (
                    <ReactMarkdown
                        children={text}
                        components={{
                            code: ({ inline, className, children }) => {
                                const match = /language-(\w+)/.exec(className || '');

                                if (inline) {
                                    return <code>{children}</code>;
                                } else if (match) {
                                    return (
                                        <div>
                                            {/* Additional formatting or syntax highlighting could go here */}
                                            <pre className={className}><code>{children}</code></pre>
                                        </div>
                                    );
                                } else {
                                    return <pre><code>{children}</code></pre>;
                                }
                            }
                        }}
                    />
                )}
            />
        </div>

        {/* tags */}
        <div className='w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='tags'>Tags (for multiple select press ctr + mouse left key)</label>
            <select onChange={(e) => setTags(Array.from(e.target.selectedOptions, (option) => option.value))} value={tags} name='tags' id='tags' multiple>
                <option value='Data Science'> Data Science</option>
                <option value='Artificial intelligence'> Artificial intelligence</option>
                <option value='Next Js'> Next Js</option>
                <option value='Mongo Db'> Mongo Db</option>
                <option value='Express Js'> Express Js</option>
                <option value='Javascript'> Javascript</option>
            </select>
        </div>
        {/* blog status */}

        <div className='w-100 flex flex-col flex-left mb-2'>
            <label htmlFor='status'>Select Status</label>
            <select onChange={ev => setStatus(ev.target.value)} value={status} name='status' id='status'>
                <option value=''> No Select</option>
                <option value='Draft'> Draft</option>
                <option value='Published'> Published</option>
            </select>

        </div>

        {/* submit button */}

        <div className='w-100 mb-1'>
            <button type='submit' className='btn btn-primary'>Save Blog</button>
        </div>

    </form >

</>
}

