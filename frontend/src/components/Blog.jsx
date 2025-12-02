import React from 'react'

const Blog = ({ setShowBlog, blogData, formatDate }) => {
    
    if (!blogData) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <p className="text-xl text-neutral-100">Error: Blog data not loaded.</p>
                <button onClick={() => setShowBlog(false)}>Close</button>
            </div>
        );
    }
    
    const { title, des, createdAt,Author } = blogData;

    // Use the formatDate utility passed from the parent
    const displayDate = formatDate(createdAt);

    return (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
            <div className="w-[80%] h-[90%] bg-neutral-100 dark:bg-neutral-900 m-auto px-10 py-10 overflow-y-scroll rounded-xl relative">
                <button
                    className="absolute top-5 right-5 bg-red-500 rounded-full px-5 py-1 text-neutral-100 text-center"
                    onClick={() => setShowBlog(false)}
                >
                    close
                </button>
                
                <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
                    {title}
                </h1>
                <div className='flex justify-between text-neutral-600 dark:text-neutral-400'>
                <p className="mt-3 text-md">
                    Created By : {Author}
                </p>
                <p className="mt-3 text-md ">
                    {displayDate}
                </p>
                </div>
                
                <p className="mt-10 whitespace-pre-line text-neutral-800 dark:text-neutral-200">
                    {des}
                </p>
            </div>
        </div>
    );
};

export default Blog;