
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';

import Head from "next/head";

export default function Shop(

    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        images: existingImages,
        description: existingDescription,
        afilink: existingafilink,
        price: existingprice,
        tags: existingTags,
        status: existingStatus,
    }
) {


    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || '');
    const [afilink, setafilink] = useState(existingafilink || '');
    const [price, setprice] = useState(existingprice || "");
    const [tags, setTags] = useState(existingTags || []);
    const [status, setStatus] = useState(existingStatus || '');

    const [newTag, setNewTag] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const uploadImagesQueue = [];
    // const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    // const uploadVideosQueue = [];

    async function createProject(ev) {

        ev.preventDefault();



        if (isUploading) {
            await Promise.all(uploadImagesQueue);
        }

        const data = { title, slug, images, description, afilink, price, tags, status };

        if (_id) {
            await axios.put(`/api/shops`, { ...data, _id });
            toast.success('Project updated successfully');
        } else {
            await axios.post(`/api/shops`, data);
            toast.success('Project created successfully');
            console.log("test", data)
        }

        setRedirect(true);
    }
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

    if (redirect) {
        router.push('/shops');
        return null;
    }


    function updateImagesOrder(images) {
        setImages(images);
    }

    function handleDeleteImage(index) {

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


    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return <>
        <Head>
            <title>Add Product</title>
        </Head>


        <form className='addWebsiteform' onSubmit={createProject}>
            {/* Title */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label>Title</label>
                <input type='text' placeholder=' Add project title' value={title} onChange={ev => setTitle(ev.target.value)} />
            </div>

            {/* blog slug url */}

            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor='slug'>Slug (seo friendly url)
                </label>
                <input type='text' id='title' name='title' placeholder=' Enter slug url' value={slug} onChange={handleSlugChanger} />


            </div>

            {/* afilink Name */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor='afilink'> Afiliate link</label>
                <input type='text' placeholder=' Add Afiliate link' id="afilink" value={afilink} onChange={ev => setafilink(ev.target.value)} />
            </div>


            {/* Live Preview */}

            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor='price'> price</label>
                <input type='text'
                    id="price"
                    placeholder='price'
                    value={price}
                    onChange={ev => setprice(ev.target.value)} />
            </div>
            {/* blog image */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <div className='w-100'>
                    <label htmlFor='image'>Upload Image (first image will be shown as thumbnail)</label>
                    <input type='file' id='fileinput' className='mt-1' accept='image/*' multiple onChange={uploadImages} />
                </div>

                <div className='w-100 flex flex-left mt-1'>
                    {isUploading && (<Spinner />)}
                </div>
            </div>

            {/* image preview and image sortable with delete */}
            {!isUploading && (
                <div className="flex">
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className='flex gap-1'>
                        {images?.map((link, index) => (
                            <div key={link} className="uploading">
                                <img src={link} alt={link} className='object-cover' />
                                <button type='button' onClick={() => handleDeleteImage(index)}>Delete</button>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}

            {/* Video Upload */}
            { /*<div className='w-100 flex flex-col flex-left mb-2'>
                <label>Upload Video</label>
                <input type='file' accept='video/*' multiple onChange={ev => uploadFiles(ev, 'video')} />
                {isUploadingVideo && <Spinner />}
            </div>*/}

            {/* Video Previews */}
            {/*!isUploadingVideo && videos.length > 0 && (
                <ReactSortable list={videos} setList={list => updateOrder(list, 'video')} animation={200}>
                    {videos.map((link, index) => (
                        <div key={index} className="uploading">
                            <video src={link} controls width="200"></video>
                            <button type='button' onClick={() => handleDelete(index, 'video')}>Delete</button>
                        </div>
                    ))}
                </ReactSortable>
            )*/}


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

            {/* Dynamic Tags */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label>Tags</label>
                <div className="flex gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="tag">
                            {tag} <button type="button" onClick={() => handleRemoveTag(tag)}>x</button>
                        </span>
                    ))}
                </div>
                <div className="flex">
                    <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add a tag" />
                    <button type="button" onClick={handleAddTag}>Add</button>
                </div>
            </div>


            {/* Status */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label>Status</label>
                <select value={status} onChange={(ev) => setStatus(ev.target.value)}>
                    <option value='Draft'>Draft</option>
                    <option value='Published'>Published</option>
                </select>
            </div>

            <div className='w-100 mb-1'>
                <button type='submit' className='btn btn-primary'>Save Project</button>
            </div>
        </form>

    </>
}

