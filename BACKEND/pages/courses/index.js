import Blog from "@/components/Blog";
import useFetchData from "@/hooks/useFetchData";
import { FaEdit } from "react-icons/fa";
import { SiBloglovin } from "react-icons/si";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link"; 

export default function gallery() {


     // Pagination
     const [currentPage, setCurrentPage] = useState(1);
     const [perPage] = useState(7);
 
     // Search 
     const [searchQuery, setSearchQuery] = useState(''); 
 
     // Fetch all blogs
     const { alldata, loading } = useFetchData('/api/courses');
 
 
 
     // Function to handle page change
     const paginate = (pageNumber) => {
         setCurrentPage(pageNumber);
     };
 
     // Total number of blogs
     const allBlogs = alldata.length;
 
     // Filter all data based on search query
     const filteredBlogs = searchQuery.trim() === ''
         ? alldata
         : alldata.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));
 
     // Calculate the index of the first and last blog displayed
     const indexOfFirstBlog = (currentPage - 1) * perPage;
     const indexOfLastBlog = currentPage * perPage;
 
     // Get the current page's blogs
     const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
 
     // Filter only published blogs
     const publishedBlogs = currentBlogs.length > 0
         ? currentBlogs.filter(blog => blog.status?.toLowerCase() === 'published')
         : [];
 
 
 
 
     // Generate page numbers
     const pageNumbers = Array.from({ length: Math.ceil(allBlogs / perPage) }, (_, i) => i + 1);
 
 
 

    return <>
      
      <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All Published <span>Courses</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin /> <span>/</span> <span>Courses</span>
                </div>
            </div>

            {/* Search Input */}
            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Courses:</h2>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Blogs Table */}
                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>video</th>
                            <th>Title</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5}>Loading...</td>
                            </tr>
                        ) : publishedBlogs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className = "text-center">No Courses found</td>
                            </tr>
                        ) : (
                            publishedBlogs.map((blog, index) => (
                                <tr key={blog._id}>
                                    <td>{indexOfFirstBlog + index + 1}</td>
                                    <td>
                                        <img src={blog.images[0]} width={100} alt={blog.title} />
                                    </td>
                                    <td>
                                        {blog.videos.length > 0 && (
                                            <video src={blog.videos[0]} controls width={200}></video>
                                        )}
                                    </td>
                                    <td>
                                        <h3>{blog.title}</h3>
                                    </td>
                                    <td>
                                        <div className="flex gap-2 flex-center">
                                            <Link href={`/courses/edit/${blog._id}`}>
                                                <button>
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <Link href={`/courses/delete/${blog._id}`}>
                                                <button>
                                                    <FaTrash />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
               {/* Pagination */}
               {publishedBlogs.length === 0 ? ("") : (
                    <div className="blogpagination">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                            <button key={number}
                                onClick={() => paginate(number)}
                                className={`${currentPage === number ? 'active' : ''}`}>
                                {number}
                            </button>
                        ))}
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>
                    </div>
                )}
            </div>
        </div>

    </>

}