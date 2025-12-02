import React, { useContext, useState } from "react";
import Hero from "../components/Hero";
import Main from "../components/Main";
import { StoreContext } from "../Context/StoreContext";

const Home = () => {
    const { 
        showLoginForm, 
        setShowLoginForm,
        Login,
        Register 
    } = useContext(StoreContext);

    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [validationError, setValidationError] = useState({});

    const handleChange = (e) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (validationError[e.target.name]) {
             setValidationError({ ...validationError, [e.target.name]: "" });
        }
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateForm = (isLoginView) => {
        let errors = {};
        const { name, email, password, confirmPassword } = formData;
        
        if (!validateEmail(email)) {
            errors.email = "Invalid email format.";
        }
        if (password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
        
        if (!isLoginView) {
            if (!name) {
                errors.name = "User name is required.";
            }
            if (password !== confirmPassword) {
                errors.confirmPassword = "Passwords do not match.";
            }
        }

        setValidationError(errors);
        return Object.keys(errors).length === 0;
    };


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const loginData = { email: formData.email, password: formData.password };
        if (validateForm(true)) {
            const result = await Login(loginData);
            if (!result.success) {
                setValidationError({ api: result.message });
            }
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const registerData = { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password 
        };

        if (validateForm(false)) {
            const result = await Register(registerData);
            if (!result.success) {
                setValidationError({ api: result.message });
            }
        }
    };

    const modalClasses = "bg-black/50 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center";
    const formBoxClasses = "bg-neutral-200 dark:bg-neutral-800 w-[90%] sm:w-[50%] md:w-[35%] lg:w-[30%] rounded-xl shadow-2xl p-6 md:p-10 relative";
    const inputClasses = "outline-none ring ring-neutral-500 px-3 py-2 text-sm text-neutral-900 w-full rounded-md dark:bg-neutral-700 dark:text-neutral-100 dark:ring-neutral-600";
    const labelClasses = "text-md font-semibold text-neutral-800 dark:text-neutral-200";
    const errorClasses = "text-red-500 text-xs italic";


    return (
        <div className="bg-neutral-100 dark:bg-neutral-900 relative min-h-screen">
            {showLoginForm && (
                <div className={modalClasses}>
                    {isLogin ? (
                        /* LOGIN FORM */
                        <div className={formBoxClasses}>
                            <p
                                className="absolute right-3 top-3 text-2xl font-semibold text-neutral-900 dark:text-neutral-200 cursor-pointer"
                                onClick={() => {
                                  setIsLogin(true)
                                  setShowLoginForm(false)}}
                            >
                                &times;
                            </p>
                            <h2 className="text-neutral-900 dark:text-neutral-100 text-2xl font-bold text-center mb-6">
                                Login
                            </h2>
                            <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
                                
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className={labelClasses}>Email:</label>
                                    <input
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        type="email"
                                        onChange={handleChange}
                                        placeholder="enter email"
                                        className={inputClasses}
                                    />
                                    {validationError.email && <p className={errorClasses}>{validationError.email}</p>}
                                </div>
                                
                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className={labelClasses}>Password:</label>
                                    <input
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        type="password"
                                        onChange={handleChange}
                                        placeholder="enter password"
                                        className={inputClasses}
                                    />
                                    {validationError.password && <p className={errorClasses}>{validationError.password}</p>}
                                </div>
                                
                                {/* API Error Display */}
                                {validationError.api && <p className={errorClasses}>{validationError.api}</p>}
                                
                                <button type="submit" className="font-semibold bg-blue-700 hover:bg-blue-800 text-neutral-100 mt-5 px-10 py-2 text-lg rounded-lg transition duration-200">
                                    Login
                                </button>
                            </form>
                            <p className="text-neutral-800 dark:text-neutral-300 text-sm mt-4 text-center">
                                Don't have an account? Please Register
                                <span
                                    className="text-blue-700 dark:text-blue-400 font-semibold cursor-pointer ml-1"
                                    onClick={() => {
                                        setIsLogin(false);
                                        setValidationError({});
                                        setFormdata({ name: "", email: "", password: "", confirmPassword: "" });
                                    }}
                                >
                                    Click me
                                </span>
                            </p>
                        </div>
                    ) : (
                        /* REGISTER FORM */
                        <div className={formBoxClasses}>
                            <p
                                className="absolute right-3 top-3 text-2xl font-semibold text-neutral-900 dark:text-neutral-200 cursor-pointer"
                                onClick={() =>{
                                  setIsLogin(true)
                                   setShowLoginForm(false)}}
                            >
                                &times;
                            </p>
                            <h2 className="text-neutral-900 dark:text-neutral-100 text-2xl font-bold text-center mb-6">
                                Register
                            </h2>
                            <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
                                
                                {/* User Name */}
                                <div>
                                    <label htmlFor="name" className={labelClasses}>User Name:</label>
                                    <input
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="enter your name"
                                        className={inputClasses}
                                    />
                                    {validationError.name && <p className={errorClasses}>{validationError.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className={labelClasses}>Email:</label>
                                    <input
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        type="email"
                                        onChange={handleChange}
                                        placeholder="enter email"
                                        className={inputClasses}
                                    />
                                    {validationError.email && <p className={errorClasses}>{validationError.email}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className={labelClasses}>Password:</label>
                                    <input
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        type="password"
                                        onChange={handleChange}
                                        placeholder="enter password"
                                        className={inputClasses}
                                    />
                                    {validationError.password && <p className={errorClasses}>{validationError.password}</p>}
                                </div>
                                
                                {/* Confirm Password */}
                                <div>
                                    <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password:</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        type="password"
                                        onChange={handleChange}
                                        placeholder="confirm password"
                                        className={inputClasses}
                                    />
                                    {validationError.confirmPassword && <p className={errorClasses}>{validationError.confirmPassword}</p>}
                                </div>
                                
                                {/* API Error Display */}
                                {validationError.api && <p className={errorClasses}>{validationError.api}</p>}

                                <button type="submit" className="font-semibold bg-blue-700 hover:bg-blue-800 text-neutral-100 mt-5 px-10 py-2 text-lg rounded-lg transition duration-200">
                                    Register
                                </button>
                            </form>
                            <p className="text-neutral-800 dark:text-neutral-300 text-sm mt-4 text-center">
                                Already have an account? Please Login
                                <span
                                    className="text-blue-700 dark:text-blue-400 font-semibold cursor-pointer ml-1"
                                    onClick={() => {
                                        setIsLogin(true);
                                        setValidationError({});
                                        setFormdata({ name: "", email: "", password: "", confirmPassword: "" }); 
                                    }}
                                >
                                    Click me
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            )}
            <Hero />
            <Main />
        </div>
    );
};

export default Home;