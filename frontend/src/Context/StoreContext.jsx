import { createContext, useCallback, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || ""); 
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));
    const [dark, setDark] = useState(
        () => localStorage.getItem("theme") === "dark"
    );
    const [blogs, setBlogs] = useState(null);
    const [totalCounts, setTotalCounts] = useState(0);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("All");
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    // state for latest blogs fetching/error/data
    const [latestBlogs, setLatestBlogs] = useState(null);
    const [latestFetching, setLatestFetching] = useState(false);
    const [latestError, setLatestError] = useState(null);
    const [latestCategory, setLatestCategory] = useState("All");

    const [showLoginForm,setShowLoginForm] = useState(false)


  //state for userBlog page and functions
  const [UserBlogs,setUserBlogs] = useState(null);
  const [UserBlogFetching,setUserBlogFetching] = useState(false);
  const [UserBlogError,setUserBlogError] = useState(null);

  // state for blog creation
const [blogSubmiting, setBlogSubmiting] = useState(false);
const [blogError, setBlogError] = useState(null);


const URL = "https://blog-mern-5p0e.onrender.com"
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------//

            //USER METHODS 
        //GET ALL BLOGS
  const GetUserBlog = useCallback(async () => {
    if (!token) {
        setUserBlogError("User is not logged in. Please log in to view your blogs.");
        setUserBlogs(null);
        return; 
    }

    try {
        setUserBlogFetching(true);
        setUserBlogError(null);

        let url = `${URL}/api/v1/user/blog`||`http://localhost:5000/api/v1/user/blog`;
        
        const data = await fetch(url, {
            method: "GET", 
            headers: {
                "authorization": `Bearer ${token}` 
            }
        });

        if (!data.ok) {
            if (data.status === 401) {
                throw new Error("Unauthorized. Your session may have expired. Please log in again.");
            }
            throw new Error(`HTTP error! status: ${data.status}`);
        }

        const result = await data.json();
        
        setUserBlogs(result.blogs);
        setTotalCounts(result.counts); 
        setUserBlogFetching(false);

    } catch (err) {
        console.error("Fetch Error:", err);
        setUserBlogError(err.message || "Failed to fetch blogs. Please check the server connection.");
        setUserBlogs(null);
        setUserBlogFetching(false);
    }
  },[token])


        // CRATIE A BLOG
  const CreateBlog =async (formData) => {
    if (!token) {
        setBlogError("Unauthorized: Please log in to create a blog.");
        return { success: false, message: "Unauthorized." };
    }

    try {
        setBlogSubmiting(true);
        setBlogError(null);

        let url = `${URL}/api/v1/user/blog`||`http://localhost:5000/api/v1/user/blog`;
        
        const response = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            await GetUserBlog();
            setBlogSubmiting(false);
            return { success: true, message: "Blog created successfully!" };
        } else {
            // Failure: Setting the error message from the API response
            setBlogError(result.msg || "Failed to create blog.");
            setBlogSubmiting(false);
            return { success: false, message: result.msg || "Failed to create blog." };
        }
        
    } catch (err) {
        console.error("Create Blog Error:", err);
        setBlogError("Network error. Could not connect to the server.");
        setBlogSubmiting(false);
        return { success: false, message: "Network error. Please try again." };
    }
};

        // GET A SING BLOG
const getBlogById = useCallback(async (id) => {
    if (!token) {
        return { success: false, message: "Unauthorized." };
    }
    setBlogError(null); // Clear previous error

    try {
        let url = `${URL}/api/v1/user/blog/${id}` || `http://localhost:5000/api/v1/user/blog/${id}`;
        
        const response = await fetch(url, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}` 
            },
        });
        
        const result = await response.json();
        console.log(result);

        if (response.ok) {
            return { success: true, blog: result.blog };
        } else {
            setBlogError(result.msg || `Failed to fetch blog with ID ${id}.`);
            return { success: false, message: result.msg || `Failed to Fetch blog with ID ${id}.` };
        }
    } catch (error) {
        console.error("Fetch Blog By Id Error:", error);
        setBlogError("Network error during fetch.");
        return { success: false, message: "Network error. Please try again." };
    }
},[token])


        //UPDATE BLOG
const UpdateBlog =useCallback(async (id, formData) => {
    if (!token) {
        setBlogError("Unauthorized: Please log in to update a blog.");
        return { success: false, message: "Unauthorized." };
    }

    try {
        setBlogSubmiting(true);
        setBlogError(null);

        let url =`${URL}/api/v1/user/blog/${id}` || `http://localhost:5000/api/v1/user/blog/${id}`;
        
        const response = await fetch(url, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            // Success: Re-fetch the user's blogs to show the update
            await GetUserBlog();
            setBlogSubmiting(false);
            return { success: true, message: "Blog updated successfully!" };
        } else {
            setBlogError(result.msg || "Failed to update blog.");
            setBlogSubmiting(false);
            return { success: false, message: result.msg || "Failed to update blog." };
        }
        
    } catch (err) {
        console.error("Update Blog Error:", err);
        setBlogError("Network error. Could not connect to the server.");
        setBlogSubmiting(false);
        return { success: false, message: "Network error. Please try again." };
    }
},[token,GetUserBlog])

        //DELETE A BLOG
const DeleteBlog = useCallback(async (id) => {
    if (!token) {
        return { success: false, message: "Unauthorized." };
    }

    try {
        setBlogSubmiting(true); // Reusing submiting state for operation tracking
        setBlogError(null);

        let url =`${URL}/api/v1/user/blog/${id}` || `http://localhost:5000/api/v1/user/blog/${id}`;
        
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}` 
            },
        });


        if (response.ok) {
            await GetUserBlog(); // Re-fetch to show the blog list update
            setBlogSubmiting(false);
            return { success: true, message: "Blog deleted successfully!" };
        } else {
            setBlogError(result.msg || "Failed to delete blog.");
            setBlogSubmiting(false);
            return { success: false, message: result.msg || "Failed to delete blog." };
        }
        
    } catch (err) {
        console.error("Delete Blog Error:", err);
        setBlogError("Network error during deletion.");
        setBlogSubmiting(false);
        return { success: false, message: "Network error. Please try again." };
    }
},[GetUserBlog])

  //user state and function ends

    //------------------------------------------------------------------------------------------------------//
    //------------------------------------------------------------------------------------------------------//
    //------------------------------------------------------------------------------------------------------//

    //All Public methods 
                //Get All Blogs
    const GetAllBlogs = async (currentCategory = category, currentPage = page, currentSearchQuery = searchQuery) => {
        try {
            setFetching(true);
            setError(null);

            let url = `${URL}/api/v1/blog?category=${currentCategory}&page=${currentPage}`
            ||
             `http://localhost:5000/api/v1/blog?category=${currentCategory}&page=${currentPage}`;
            
            if (currentSearchQuery) {
                url += `&search=${currentSearchQuery}`;
            }
            
            const data = await fetch(url);

            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }

            const result = await data.json();
            
            setBlogs(result.blogs);
            setTotalCounts(result.counts);
            setFetching(false);

        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Failed to fetch blogs. Please check the server connection.");
            setBlogs(null);
            setFetching(false);
        }
    };

                    //Get Latest Blogs
    const GetLatestBlog = async(currentCategory = latestCategory)=>{
        try {
            setLatestFetching(true); 
            setLatestError(null);

            let url = `${URL}/api/v1/blog/latest?category=${currentCategory}`
                        ||
                     `http://localhost:5000/api/v1/blog/latest?category=${currentCategory}`;
            const data = await fetch(url);
            
            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }
            
            const result = await data.json();

            setLatestBlogs(result.blogs);
            setLatestFetching(false);

        } catch (err) {
            console.error("Fetch Error:", err);
            setLatestError("Failed to fetch latest blogs. Please check the server connection.");
            setLatestBlogs(null);
            setLatestFetching(false);
        }
    }

    //Login

   const Login = async (formData) => {
    try {
        const response = await fetch(`${URL}/api/v1/user/login`||"http://localhost:5000/api/v1/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), 
        });

        const result = await response.json();

        if (response.ok) {
            const authToken = result.token;
            if (authToken) {
                setToken(authToken);
                localStorage.setItem("token", authToken);
                setIsLogin(true); 
                setShowLoginForm(false);
                return { success: true, message: "Login successful!" };
            }
        }
        return { success: false, message: result.msg || "Login failed." };

    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, message: "Network error. Please try again." };
    }
};

        //Register New User

const Register = async (formData) => {
    try {
        const response = await fetch(`${URL}/api/v1/user/register`||"http://localhost:5000/api/v1/user/register", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        
        if (response.ok) {
            const authToken = result.token;
            if (authToken) {
                setToken(authToken);
                localStorage.setItem("token", authToken);
                setIsLogin(true); 
                setShowLoginForm(false);
                return { success: true, message: "Registration successful!" };
            }
        }
        return { success: false, message: result.msg || "Registration failed." };

    } catch (error) {
        console.error("Register Error:", error);
        return { success: false, message: "Network error. Please try again." };
    }
};

            //Logout the User
const Logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsLogin(false);
};


const contextValue = {
    token,
    isLogin,
    setIsLogin,
    dark,
    setDark,
    blogs,
    setBlogs,
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

// FOR LATEST BLOG PAGE 
    latestBlogs,
    GetLatestBlog,
    latestFetching,
    latestError,
    latestCategory,
    setLatestCategory,

// FOR LOGIN / REGISTER FORM
    showLoginForm,
    setShowLoginForm,
// AUTH FUNCTIONS 
    Login,
    Register,
    Logout,

// USER BLOG PAGE 
    //GETTING ALL BLOGS
    UserBlogs, GetUserBlog, UserBlogFetching, UserBlogError,
    
    //CRAETING BLOGS
    CreateBlog,
    blogSubmiting,
    blogError,

    //EDIT / DELETE Blog
    getBlogById,
    UpdateBlog,
    DeleteBlog, 
};

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;