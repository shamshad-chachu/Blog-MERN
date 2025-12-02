import React, { useContext, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const CreateForm = ({ setShowForm }) => {
    const { CreateBlog, blogSubmiting, blogError } = useContext(StoreContext);
    const [localError, setLocalError] = useState('');

    const [formData, setFormData] = useState({
        title: "",
        category: "Technology",
        des: "",
        createdBy:"",
    });

    // Minimum word count constant
    const MIN_WORD_COUNT = 200;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setLocalError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        //  Check for empty fields
        if (!formData.title.trim() || !formData.des.trim()) {
            setLocalError("Title and Description cannot be empty.");
            return;
        }
        
        // Check for minimum word count
        const wordCount = formData.des.trim().split(/\s+/).filter(word => word.length > 0).length;

        if (wordCount < MIN_WORD_COUNT) {
            setLocalError(`Description must be at least ${MIN_WORD_COUNT} words. Current count: ${wordCount} words.`);
            return;
        }

        const result = await CreateBlog(formData);

        if (result.success) {
            // Success: Clear form and close modal
            setFormData({ title: "", category: "Technology", des: "" });
            setShowForm(false);
        }
    };

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
                    onClick={() => setShowForm(false)}
                    aria-label="Close form"
                >
                    &times;
                </button>
                <h2 className='text-2xl font-semibold mb-4 text-neutral-800'>Create a New Blog</h2>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {/* Title Input */}
                    <div className='flex flex-col'>
                        <label htmlFor="title" className='font-medium text-neutral-700'>Title</label>
                        <input 
                            id="title"
                            name="title"
                            type="text" 
                            placeholder="Enter blog title"
                            value={formData.title}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>

                    {/* Category Select */}
                    <div className='flex flex-col'>
                        <label htmlFor="category" className='font-medium text-neutral-700'>Category</label>
                        <select 
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none'
                        >
                            {categoryList.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Description Textarea */}
                    <div className='flex flex-col'>
                        <label htmlFor="des" className='font-medium text-neutral-700'>Description (Minimum {MIN_WORD_COUNT} words)</label>
                        <textarea 
                            id="des"
                            name="des"
                            placeholder='Write your blog content here...'
                            value={formData.des}
                            onChange={handleChange}
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
                        disabled={blogSubmiting}
                        className={`py-2 mt-2 font-semibold text-white rounded transition-colors ${
                            blogSubmiting 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {blogSubmiting ? 'Submitting...' : 'Submit Blog'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateForm;