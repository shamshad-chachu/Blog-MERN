import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext';

const EditForm = ({ BlogId, setShowEditform, setShowform }) => { 
    const { UpdateBlog, getBlogById, blogError, blogSubmiting } = useContext(StoreContext); 
    
    const [formData, setFormData] = useState({
        title: "",
        category: "", 
        des: "", 
    }); 
    const [localError, setLocalError] = useState('');
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        const getBlogdata = async () => {
            if (!BlogId) return;

            setFetchLoading(true);
            setLocalError('');

            const result = await getBlogById(BlogId);

            if (result.success && result.blog) {
                setFormData({
                    title: result.blog.title || "",
                    category: result.blog.category || "Technology",
                    des: result.blog.des || "",
                });
            } else {
                setLocalError(result.message || "Failed to load blog data.");
            }
            setFetchLoading(false);
        };
        getBlogdata();
    }, [BlogId, getBlogById]); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setLocalError('');
    };

    const handelFormSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (!formData.title.trim() || !formData.des.trim()) {
            setLocalError("Title and Description cannot be empty.");
            return;
        }

        const result = await UpdateBlog(BlogId, formData); 

        if (result.success) {
            setShowEditform(false);
            setShowform(false);
        }
    }

    const categoryList = [
        "Technology",
        "Programming",
        "Design",
        "Lifestyle",
        "Career"
    ];

    return (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
            <div className='bg-neutral-200 relative px-5 py-8 w-full max-w-lg rounded-lg shadow-xl' >
                <button 
                    className='absolute right-4 top-3 text-xl font-bold text-gray-700 hover:text-red-500 transition-colors' 
                    onClick={() => { setShowEditform(false); setShowform(false); }} // Close both forms
                    aria-label="Close form"
                >
                    &times;
                </button>
                <h2 className='text-2xl font-semibold mb-4 text-neutral-800'>Update Blog</h2>

                {fetchLoading ? (
                    <p className='text-lg text-blue-600'>Loading blog data...</p>
                ) : (
                    <form onSubmit={handelFormSubmit} className='flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="title" className='font-medium text-neutral-700'>Title</label>
                            <input 
                                id="title" name="title" type="text" 
                                placeholder="Enter blog title"
                                value={formData.title} onChange={handleChange}
                                className='p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="category" className='font-medium text-neutral-700'>Category</label>
                            <select 
                                id="category" name="category"
                                value={formData.category} onChange={handleChange}
                                className='p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none'
                            >
                                {categoryList.map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className='flex flex-col'>
                            <label htmlFor="des" className='font-medium text-neutral-700'>Description</label>
                            <textarea 
                                id="des" name="des"
                                placeholder='Write your blog content here...'
                                value={formData.des} onChange={handleChange}
                                rows="6"
                                className='p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none'
                                required
                            ></textarea>
                        </div>
                        
                        {/* Error Display */}
                        {(localError || blogError) && (
                            <p className="text-sm text-red-600 font-medium">
                                {localError || `Error: ${blogError}`}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={blogSubmiting || fetchLoading}
                            className={`py-2 mt-2 font-semibold text-white rounded transition-colors ${
                                blogSubmiting 
                                    ? 'bg-blue-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {blogSubmiting ? 'Updating...' : 'Update Blog'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditForm;