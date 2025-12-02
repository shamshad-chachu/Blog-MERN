import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import BlogListSkeleton from "../../components/BlogSkeleton";
import Blog from "../../components/Blog";
import CreateForm from "../components/CreateForm";
import { Plus } from "lucide-react";

const UserBlogs = () => {
  const { UserBlogs, GetUserBlog, UserBlogFetching, UserBlogError,token } =
    useContext(StoreContext);

  const [showBlog, setShowBlog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const[showForm,setShowForm] = useState(false)
  const Naviget = useNavigate()

  useEffect(() => {
    GetUserBlog(); 
    if(!token){
      Naviget("/")
    }
  }, [token]);


  const handleBlogClick = (blogData) => {
    setSelectedBlog(blogData);
    setShowBlog(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-neutral-100 min-h-screen px-5 py-8 relative">
      <div className=" grid grid-cols-3 gap-4">
        {UserBlogFetching && (
          <BlogListSkeleton count ={8} />
        )}

        {UserBlogError && !UserBlogFetching && (
          <p className="text-xl text-red-600 dark:text-red-400 font-semibold">
            Error fetching latest posts: {UserBlogError}
          </p>
        )}
        {!UserBlogFetching &&
        !UserBlogError &&(
          <div
          onClick={()=>setShowForm(true)}
           className="absolute rounded-lg right-10 top-5 bg-blue-700 text-neutral-100 "
           ><Plus size={60} /></div>
        )}

        {!UserBlogFetching &&
        !UserBlogError &&
        UserBlogs &&
        UserBlogs.length > 0
          ?
          UserBlogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => handleBlogClick(blog)}
                className="flex flex-col gap-3 justify-start shadow-md dark:bg-neutral-800 px-2 py-4"
              >
                <h4 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                  {blog.title}
                </h4>
                <p className="text-neutral-800 dark:text-neutral-200 text-md">
                  {blog.des.substring(0, 200)}...
                </p>
                <p className="text-blue-700 dark:text-blue-400 font-semibold text-md">
                  Read More
                </p>
              </div>
            ))
          :
            !UserBlogFetching &&
            !UserBlogError && (
              <p className="text-lg text-neutral-500 dark:text-neutral-400">
                No blogs exist for this User.
              </p>
            )}

        {/* Blog Detail Modal */}
        {showBlog && selectedBlog && (
          <Blog
            setShowBlog={setShowBlog}
            blogData={selectedBlog}
            formatDate={formatDate}
          />
        )}

        {/* Create Form Modal */}
        {showForm && (
          <CreateForm
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
