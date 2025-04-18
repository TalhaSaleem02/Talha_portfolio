import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { allyDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function ProjectSlug() {
    const router = useRouter();
    const { slug } = router.query; // Extract the slug from the URL query
    const { alldata, loading } = useFetchData(`/api/projects?slug=${slug}`); // Fetch the project data using the slug

    if (loading) return <div>Loading...</div>; // Loading state

    // Find the correct project based on the slug
    const project = alldata?.find(p => p.slug === slug); // Find the project by slug

    if (!project) return <div>Project not found.</div>; // If no project is found

    return (
        <>
            <Head>
                <title>{project?.title}</title> {/* Dynamic title for each project */}
            </Head>

            <div className="projectslug">
                <div className="projectslugimg">
                    <div className="container">
                        <div className="proslugimg">
                            <video
                                src={project?.videos[0]}
                                alt={project?.title}
                                controls
                            />
                        </div>

                        <div className="projectsluginfo">
                            {/* Left Info */}
                            <div className="leftmainproinfo">
                                <h1>{project?.projectCategory?.join(", ")}</h1>
                                <h2>{project?.title}</h2>
                                <p>{project?.description}</p>

                                {/* Conditionally render live preview link */}
                                {project?.livePreview && project.livePreview.trim() !== "" && (
                        <a
                            href={project.livePreview}  // Directly use the livePreview URL
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#0070f3", textDecoration: "underline" }}
                        >
                            🔗 Live Preview
                        </a>
                    )}
                            </div>

                            {/* Right Info */}
                            <div className="rightmainproinfo">
                                <div>
                                    <h3>Category</h3>
                                    <h2>{project?.projectCategory?.join(", ")}</h2>
                                </div>
                                <div>
                                    <h3>Client</h3>
                                    <h2>{project?.client}</h2>
                                </div>
                            </div>
                        </div>

                        {/* Swiper for images */}
                        <div className="projectslugsliderimg">
                            <Swiper
                                slidesPerView={"auto"}
                                spaceBetween={30}
                                freeMode={true}
                                grabCursor={true}
                                modules={[FreeMode]}
                                className="mySwiper"
                            >
                                {project?.images?.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={image} alt="project" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
