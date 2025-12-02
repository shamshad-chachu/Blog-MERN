import React from "react";

const BlogSkeleton = () => (
  <div className="flex flex-col gap-3 justify-start md:shadow-md px-4 py-4 dark:bg-neutral-800 bg-white rounded-lg animate-pulse">
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>

    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-11/12"></div>

    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>

    <div className="h-3 bg-blue-500 rounded w-1/4 mt-2"></div>
  </div>
);

const BlogListSkeleton = ({ count }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <BlogSkeleton key={index} />
      ))}
    </div>
  );
};

export default BlogListSkeleton;
