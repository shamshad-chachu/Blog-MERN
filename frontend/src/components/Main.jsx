import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";
import Blog from "./Blog";
import BlogListSkeleton from "./BlogSkeleton";
import { motion } from "motion/react";


const Main = () => {
    // 🌟 Destructure new context values
    const { 
        latestBlogs, 
        GetLatestBlog,
        latestFetching, 
        latestError,
        latestCategory,
        setLatestCategory,
    } = useContext(StoreContext);

    const [showBlog, setShowBlog] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const categoryList = [
        "All",
        "Technology",
        "Programming",
        "Design",
        "Lifestyle",
        "Career"
    ];

    useEffect(() => {
        GetLatestBlog(latestCategory);
    }, [latestCategory]);

    const handleCategoryFilter = (item) => {
        setLatestCategory(item);
    };

    const handleBlogClick = (blogData) => {
      setSelectedBlog(blogData);
      setShowBlog(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

    return (
        <div className="py-10">
            <div className="mx-auto w-[95%] flex flex-col md:flex-row gap-10 md:gap-20">
                {/* section 1 */}
                <div
                
                className="flex flex-col gap-10 md:gap-5 md:w-[60%]">
                    <h2 className="font-bold text-2xl text-neutral-900 dark:text-neutral-100">
                        Latest Posts ({latestCategory})
                    </h2>
                    
                    {/*Conditional Rendering based on state */}
                    {latestFetching && (
                        <BlogListSkeleton count ={3} />
                    )}

                    {latestError && !latestFetching && (
                        <p className="text-xl text-red-600 dark:text-red-400 font-semibold">
                            Error fetching latest posts: {latestError}
                        </p>
                    )}

                    {!latestFetching && !latestError && latestBlogs && latestBlogs.length > 0 ? (
                        latestBlogs.map((blog,idx) => (
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
                             onClick={() => handleBlogClick(blog)}
                             className="flex flex-col gap-3 justify-start shadow-md dark:bg-neutral-800 px-2 py-4 overflow-hidden">
                                <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">{blog.title}</h4>
                                <p className="text-neutral-800 dark:text-neutral-200 text-md">
                                    {blog.des.substring(0, 200)}... 
                                </p>
                                <p className="text-blue-700 dark:text-blue-400 font-semibold text-md">
                                    Read More
                                </p>
                            </motion.div>
                        ))
                    ) : (
                        !latestFetching && !latestError && <p className="text-lg text-neutral-500 dark:text-neutral-400">No blogs exist for this category.</p>
                    )}

                    {/* Blog Detail Modal */}
                    {showBlog && selectedBlog && (
                        <Blog 
                            setShowBlog={setShowBlog} 
                            blogData={selectedBlog}
                            formatDate={formatDate}
                        />
                    )}

                </div>
                
                {/* section 2: Sidebar */}
                <div className="flex flex-col gap-10 md:w-[30%]">
                    {/* About Me Section */}
                    <div>
                        <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-5">
                            About Me
                        </h2>
                        <p className="text-neutral-800 dark:text-neutral-200 text-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo,
                            sunt. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Vitae, corporis.
                        </p>
                    </div>
                    
                    {/* Categories Section (Filter) */}
                    <div>
                        <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-5">
                            Categories
                        </h2>
                        <div className="flex flex-col gap-2 text-blue-900 font-semibold">
                            {categoryList.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handleCategoryFilter(item)}
                                    className={`text-left ${latestCategory === item 
                                        ? 'text-blue-700 dark:text-blue-400' 
                                        : 'dark:text-neutral-200 text-neutral-800'}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;