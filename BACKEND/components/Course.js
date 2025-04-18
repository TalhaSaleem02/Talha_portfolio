import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';
import Head from 'next/head';

export default function Photo(
  {
    _id,
    title: existingTitle,
    slug: existingSlug,
    images: existingImages,
    videos: existingVideos,
    description: existingDescription,
    instructor: existingInstructor,
    projectCategory: existingProjectCategory,
    tags: existingTags,
    livePreview: existingLivePreview,
    status: existingStatus,
  }
) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [images, setImages] = useState(existingImages || []);
  const [videos, setVideos] = useState(existingVideos || []);
  const [description, setDescription] = useState(existingDescription || '');
  const [instructor, setInstructor] = useState(existingInstructor || '');
  const [projectCategory, setProjectCategory] = useState(existingProjectCategory || []);
  const [tags, setTags] = useState(existingTags || []);
  const [livePreview, setLivePreview] = useState(existingLivePreview || '');
  const [status, setStatus] = useState(existingStatus || '');

  const [newTag, setNewTag] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const uploadVideosQueue = [];

  const categories = ['Data Science', 'Artificial intelligence', 'Next Js', 'Mongo Db', 'Express Js', 'Javascript'];

  async function createProject(ev) {
    ev.preventDefault();

    if (isUploading) await Promise.all(uploadImagesQueue);
    if (isUploadingVideo) await Promise.all(uploadVideosQueue);

    const data = { title, slug, images, videos, description, instructor, projectCategory, tags, livePreview, status };

    if (_id) {
      await axios.put(`/api/courses`, { ...data, _id });
      toast.success('Courses updated successfully');
    } else {
      await axios.post(`/api/courses`, data);
      toast.success('Courses created successfully');
      console.log("test", data);
    }

    setRedirect(true);
  }

  async function uploadFiles(ev, type) {
    const files = ev.target.files;
    if (!files.length) return toast.error(`No ${type} selected`);

    const setUploading = type === 'images' ? setIsUploading : setIsUploadingVideo;
    const setMedia = type === 'images' ? setImages : setVideos;

    setUploading(true);

    for (const file of files) {
      const data = new FormData();
      data.append('file', file);

      const uploadQueue = type === 'images' ? uploadImagesQueue : uploadVideosQueue;
      uploadQueue.push(
        axios.post('/api/upload', data).then(res => {
          setMedia(prev => [...prev, ...res.data.links]);
        })
      );
    }

    await Promise.all(type === 'images' ? uploadImagesQueue : uploadVideosQueue);
    setUploading(false);
    toast.success(`${type === 'images' ? 'Images' : 'Videos'} uploaded successfully`);
  }

  if (redirect) {
    router.push('/courses');
    return null;
  }

  function updateOrder(list, type) {
    type === 'images' ? setImages(list) : setVideos(list);
  }

  function handleDelete(index, type) {
    if (type === 'images') {
      setImages(prev => prev.filter((_, i) => i !== index));
      toast.success('Image deleted successfully');
    } else {
      setVideos(prev => prev.filter((_, i) => i !== index));
      toast.success('Video deleted successfully');
    }
  }

  const handleSlugChanger = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    setSlug(newSlug);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <>
      <Head>
        <title>{_id ? 'Edit Course' : 'Add Course'}</title>
      </Head>

      <form className='addWebsiteform' onSubmit={createProject}>
        {/* Title */}
        <div className='w-100 flex flex-col flex-left mb-2'>
          <label>Title</label>
          <input type='text' placeholder=' Add courses title' value={title} onChange={ev => setTitle(ev.target.value)} />
        </div>

        {/* blog slug url */}
        <div className='w-100 flex flex-col flex-left mb-2'>
          <label htmlFor='slug'>Slug (seo friendly url)</label>
          <input type='text' id='title' name='title' placeholder=' Enter slug url' value={slug} onChange={handleSlugChanger} />
        </div>

        {/* Project client Name */}
        <div className='w-100 flex flex-col flex-left mb-2'>
          <label htmlFor='instructor'>Instructor Name</label>
          <input type='text' placeholder=' Add Instructor Name' id="instructor" value={instructor} onChange={ev => setInstructor(ev.target.value)} />
        </div>

        {/* Live Preview */}
        <div className='w-100 flex flex-col flex-left mb-2'>
          <label htmlFor='livePreview'> livePreview url</label>
          <input
            type='text'
            id="livePreview"
            placeholder='live Preview url'
            value={livePreview}
            onChange={ev => setLivePreview(ev.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div className='w-100 flex flex-col flex-left mb-2'>
          <label>Upload Image</label>
          <input type='file' accept='image/*' multiple onChange={ev => uploadFiles(ev, 'images')} />
          {isUploading && <Spinner />}
        </div>

        {/* Image Previews */}
        {!isUploading && images.length > 0 && (
          <ReactSortable list={images} setList={list => updateOrder(list, 'images')} animation={200}>
            {images.map((link, index) => (
              <div key={index} className="uploading">
                <img src={link} alt={`uploaded-img-${index}`} className='object-cover' />
                <button type='button' onClick={() => handleDelete(index, 'images')}>Delete</button>
              </div>
            ))}
          </ReactSortable>
        )}

        {/* Video Upload */}
        <div className='w-100 flex flex-col flex-left mb-2'>
          <label>Upload Video</label>
          <input type='file' accept='video/*' multiple onChange={ev => uploadFiles(ev, 'video')} />
          {isUploadingVideo && <Spinner />}
        </div>

        {/* Video Previews */}
        {!isUploadingVideo && videos.length > 0 && (
          <ReactSortable list={videos} setList={list => updateOrder(list, 'video')} animation={200}>
            {videos.map((link, index) => (
              <div key={index} className="uploading">
                <video src={link} controls width="200"></video>
                <button type='button' onClick={() => handleDelete(index, 'video')}>Delete</button>
              </div>
            ))}
          </ReactSortable>
        )}

        {/* Category */}
        <div className='w-100 flex flex-col flex-left mb-2'>
          <label htmlFor='projectCategory'>Select Category (for multiple select press ctr + mouse left key)</label>
          <select
            onChange={(e) => setProjectCategory(Array.from(e.target.selectedOptions, (option) => option.value))}
            value={projectCategory}
            name='category'
            id='category'
            multiple
          >
            <option value='FullStack Web Development'>FullStack Web Development</option>
            <option value='Data Analyst'>Data Analyst</option>
            <option value='Data Science'>Data Science</option>
            <option value='Machine Learning'>Machine Learning</option>
            <option value='Artificial Intelligence Saas'>Artificial Intelligence SaaS</option>
          </select>
        </div>

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
          <button type='submit' className='btn btn-primary'>Save Course</button>
        </div>
      </form>
    </>
  );
}