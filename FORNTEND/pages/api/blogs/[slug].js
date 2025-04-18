import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { Comment } from '@/models/Comment';
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { allyDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function BlogSlug() {
    const router = useRouter();
    const { slug } = router.query;
    const { alldata, loading } = useFetchData(`/api/blogs?slug=${slug}`);
    const blog = alldata && alldata[0];

    if (loading) {
        return <div>Loading blog post...</div>;
    }

    if (!blog) {
        return <div>Blog post not found.</div>;
    }

    return (
        <>
            <Head>
                <title>{blog.title}</title>
                <meta name="description" content={blog.description} />
            </Head>

            <div className="blog-slug-page">
                <div className="container">
                    <div className="blog-header">
                        <h1>{blog.title}</h1>
                        <div className="blog-meta">
                            <span>Published: {new Date(blog.createdAt).toLocaleDateString()}</span>
                            {blog.blogcategory && blog.blogcategory.length > 0 && (
                                <span>Category: {blog.blogcategory.join(', ')}</span>
                            )}
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="blog-tags">
                                    Tags: {blog.tags.map((tag, index) => (
                                        <span key={index}>{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        {blog.images && blog.images.length > 0 && (
                            <div className="blog-featured-image">
                                <img src={blog.images[0]} alt={blog.title} />
                            </div>
                        )}
                    </div>

                    <div className="blog-content">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={allyDark}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {blog.description}
                        </ReactMarkdown>
                    </div>

                    {blog.comments && blog.comments.length > 0 && (
                        <div className="blog-comments">
                            <h3>Comments</h3>
                            <ul>
                                {blog.comments.map((comment, index) => (
                                    <li key={index}>
                                        <div className="comment-author">{comment.author || 'Anonymous'}</div>
                                        <div className="comment-text">{comment.text}</div>
                                        <div className="comment-date">{new Date(comment.createdAt || blog.createdAt).toLocaleDateString()}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Add comment form here if needed */}
                </div>
            </div>
        </>
    );
}