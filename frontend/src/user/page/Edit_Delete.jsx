import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
import EditForm from "../components/EditForm";
import BlogListSkeleton from "../../components/BlogSkeleton";
import { SquarePen, Trash2 } from "lucide-react";

const Edit_Delete = () => {
  const {
    UserBlogs,
    GetUserBlog,
    UserBlogFetching,
    UserBlogError,
    token,
    DeleteBlog,
    blogSubmiting,
  } = useContext(StoreContext);

  const [showForm, setShowform] = useState(false);
  const [showEditForm, setShowEditform] = useState(false);
  const [BlogId, setBlogId] = useState(null);

  const Naviget = useNavigate();

  useEffect(() => {
    GetUserBlog();
    if (!token) {
      Naviget("/");
    }
  }, [token, Naviget, GetUserBlog]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      setBlogId(id);
      const result = await DeleteBlog(id);

      if (result.success) {
        console.log("Deleted successfully:", result.message);
      } else {
        alert(`Deletion failed: ${result.message}`);
      }
      setBlogId(null);
    }
  };

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 min-h-screen px-5 py-8 relative">
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
        {UserBlogFetching && <BlogListSkeleton count={8} />}

        {UserBlogError && !UserBlogFetching && (
          <p className="text-xl text-red-600 dark:text-red-400 font-semibold">
            Error fetching latest posts: {UserBlogError}
          </p>
        )}

        {!UserBlogFetching &&
        !UserBlogError &&
        UserBlogs &&
        UserBlogs.length > 0
          ? UserBlogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col gap-3 justify-start shadow-md dark:bg-neutral-800 px-2 py-4 relative"
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
                <div className="absolute right-2 flex-col flex gap-2 top-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      setShowform(true);
                      setShowEditform(true);
                      setBlogId(blog._id);
                    }}
                    disabled={blogSubmiting}
                    className="bg-green-500 hover:bg-green-600 text-neutral-100 py-1 px-2 rounded-md text-sm transition-colors disabled:bg-gray-400 flex justify-center"
                  >
                    <SquarePen size={28} />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={blogSubmiting}
                    className="bg-red-500 hover:bg-red-600 text-neutral-100 py-1 px-2 rounded-md text-sm transition-colors disabled:bg-gray-400 flex justify-center"
                  >
                    <Trash2 size={28} />
                  </button>
                </div>
              </div>
            ))
          : !UserBlogFetching &&
            !UserBlogError && (
              <p className="text-lg text-neutral-500 dark:text-neutral-400">
                No blogs exist for this User.
              </p>
            )}

        {/* 💡 Conditional rendering of EditForm */}
        {showForm && showEditForm && (
          <EditForm
            BlogId={BlogId}
            setShowEditform={setShowEditform}
            setShowform={setShowform}
          />
        )}
      </div>
    </div>
  );
};

export default Edit_Delete;
