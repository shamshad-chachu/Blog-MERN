import React, { useContext, useEffect, useState } from "react";
import Blog from "../components/Blog"; 
import BlogListSkeleton from "../components/BlogSkeleton"; 
import { StoreContext } from "../Context/StoreContext";
import { Search } from "lucide-react";
import { motion } from "motion/react";
const Blogs = () => {
    const [showFilterMenue, setShowFilterMenue] = useState(false);
    const [showBlog, setShowBlog] = useState(false);
    const [searchInput, setSearchInput] = useState(""); 
    const [selectedBlog, setSelectedBlog] = useState(null);

    const {
        blogs,
        GetAllBlogs,
        fetching,
        error,
        category,
        setCategory,
        page,
        setPage,
        totalCounts,
        searchQuery,
        setSearchQuery,
    } = useContext(StoreContext);

    useEffect(() => {
        GetAllBlogs(category, page, searchQuery); 
    }, [category, page, searchQuery]); 



    const handleCategoryClick = (item) => {
        setCategory(item);
        setPage(1); 
    };

    const handleSearch = () => {
        setSearchQuery(searchInput);
        setPage(1);
    };
    
    const handleBlogClick = (blogData) => {
        setSelectedBlog(blogData);
        setShowBlog(true);
    };


    // Pagination Logic
    const itemsPerPage = 4;
    const totalPages = Math.ceil(totalCounts / itemsPerPage); 
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const categoryList = [
        "All",
        "Technology",
        "Programming",
        "Design",
        "Lifestyle",
        "Career"
    ];

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="bg-neutral-100 dark:bg-neutral-900 p-10 relative">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
                <motion.h1 
                initial={{
                    opacity:0,
                    x:-10
                }}
                whileInView={{
                    opacity:1,
                    x:0
                }}
                transition={{duration:0.3,ease:"easeIn"}}
                className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                    Blogs
                </motion.h1>
                {/* Search Input Section */}
                <div className="w-full flex items-center gap-2 justify-center">
                    <motion.div
                    initial={{
                        opacity:0,
                        scale:0.7
                    }}
                    whileInView={{
                        opacity:1,
                        scale:1
                    }}
                    transition={{duration:0.3,ease:"easeInOut"}}
                    className="flex items-center gap-3 ring-1 ring-neutral-300 dark:ring-neutral-600 dark:text-neutral-100 dark:bg-neutral-800 rounded-lg md:w-[30%] mt-4 ps-5 py-2 text-sm">
                        <i><Search size={18} /></i>
                        <input
                            type="text"
                            placeholder="search..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                            className="w-full border-none outline-none dark:text-neutral-50"
                        />
                    </motion.div>
                    <motion.button 
                    initial={{
                        opacity:0,
                        scale:0.8
                    }}
                    whileInView={{
                        opacity:1,
                        scale:1
                    }}
                    transition={{duration:0.3,ease:"easeInOut"}}
                        className="bg-blue-700 text-neutral-200 mt-4 px-6 py-px rounded-full"
                        onClick={handleSearch}
                    >
                        Search
                    </motion.button>
                </div>
            </div>

            <div className="mt-10 max-w-[80%] mx-auto">
                {error && !fetching && (
                    <p className="text-xl text-red-600 text-center dark:text-red-400 font-semibold">
                        Error: {error}
                    </p>
                )}

                {blogs === null || blogs.length === 0 && !fetching && !error && (
                    <p className="text-xl text-neutral-500 text-center dark:text-neutral-400">
                        No blogs found for the selected filter combination.
                    </p>
                )}
            </div>

            {/* Main Content: Filters and Blog List */}
            <div className="flex md:flex-row flex-col mt-10 md:gap-20 max-w-[80%] mx-auto">
                {/* Mobile Filter Menu (omitted for brevity) */}
                <div className=" block md:hidden hover:ring-1 hover:ring-neutral-300 rounded-lg p-2 bg-neutral-100 ">
                    <button
                        className="text-lg font-bold text-neutral-800 dark:text-neutral-100"
                        onClick={() => setShowFilterMenue(!showFilterMenue)}
                    >
                        Filter by ({category})
                    </button>
                    {showFilterMenue && (
                        <div className="flex flex-col gap-2 font-semibold">
                            {categoryList.map((item) => (
                                <p 
                                    key={item} 
                                    onClick={() => handleCategoryClick(item)}
                                    className={`cursor-pointer ${category === item ? 'text-blue-700 dark:text-blue-400' : 'text-blue-900 dark:text-neutral-200'}`}
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Blog List Section */}
                <div className=" flex flex-col gap-2 w-full">
                    
                    {fetching && <BlogListSkeleton count ={4} />}

                    {!fetching && !error && blogs && blogs.map((blog,idx) => (
                        <motion.div
                        initial={{
                            opacity:0,
                            filter:"blur(10px)",
                            width:"50%"
                        }}
                        whileInView={{
                            opacity:1,
                            filter:"blur(0px)",
                            width:"100%"
                        }}
                        transition={{duration:0.3,delay:idx*0.1,ease:"easeIn"}}
                            key={blog._id}
                            className="flex flex-col gap-3 justify-start md:shadow-md px-2 py-4 dark:bg-neutral-800 cursor-pointer"
                            onClick={() => handleBlogClick(blog)}
                        >
                            <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
                                {blog.title}
                            </h4>
                            <p className="text-neutral-800 text-md dark:text-neutral-200">
                                {blog.des.substring(0, 200)}....
                            </p>
                            <p className="text-blue-900 font-semibold text-md dark:text-blue-400">
                                Read More -I
                            </p>
                        </motion.div>
                    ))}

                    {/* Blog Detail Modal */}
                    {showBlog && selectedBlog && (
                        <Blog 
                            setShowBlog={setShowBlog} 
                            blogData={selectedBlog}
                            formatDate={formatDate}
                        />
                    )}
                </div>
                
                {/* Desktop Filter Menu (omitted for brevity) */}
                <div className="hidden md:block w-48 shrink-0">
                    <h2 className="text-lg font-bold text-neutral-800 mb-5 dark:text-neutral-100">
                        Filter by
                    </h2>
                    <div className="flex flex-col gap-2 font-semibold">
                        {categoryList.map((item) => (
                            <p
                                key={item}
                                onClick={() => handleCategoryClick(item)}
                                className={`cursor-pointer ${category === item ? 'text-blue-700 dark:text-blue-400' : 'text-blue-900 dark:text-neutral-200'}`}
                            >
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>


            {/* Dynamic Pagination */}
            <div className="flex justify-center gap-5 mt-5 overflow-x-auto w-full px-10 pb-3">
                {!fetching && totalPages > 1 && pageNumbers.map((p) => (
                    <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`shrink-0 ring-1 mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                            p === page
                                ? "bg-blue-700 text-neutral-100 ring-blue-700"
                                : "bg-transparent dark:bg-neutral-800 dark:ring-neutral-100 dark:text-neutral-100"
                        }`}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Blogs;