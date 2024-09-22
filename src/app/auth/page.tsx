"use client"
import { useState } from 'react';
import { FaGithub, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

import Image from 'next/image';
import logoIcon from '../../../public/logos/logoIcon.png'
const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword:''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (isSignUp) {
      console.log('Sign Up:', formData);
      // Implement sign up logic here
    } else {
      console.log('Sign In:', { email: formData.email, password: formData.password });
      // Implement sign in logic here
    }
  };

  const authWithGoogle = () => {
    console.log('Authenticating with Google');
    // Implement Google authentication logic here
  };

  const authWithGithub = () => {
    console.log('Authenticating with GitHub');
    // Implement GitHub authentication logic here
  };

  return (
    <div className="bg-background min-h-screen flex items-center  justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md">
        <div className="text-2xl font-bold mb-6 text-center text-textPrimary">
        <Image
            src={logoIcon}
            alt="Panaversity Logo"
            className="mx-auto h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain"
            height={150}
            width={150}
            
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-textSecondary">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-textSecondary">
              Email
            </label>
            <input

              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <div className="space-y-2">
  <label htmlFor="password" className="block text-sm font-medium text-textSecondary">
    Password
  </label>
  
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-200"
    />
    <div
      className="absolute right-3 top-3 cursor-pointer"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <FaEye className="text-black" />
      ) : (
        <FaEyeSlash className="text-black" />
      )}
    </div>
  </div>
</div>

          

          {isSignUp && (
            <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-textSecondary">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-200 "
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEye className="text-black" />
                ) : (
                  <FaEyeSlash className="text-black" />
                )}
              </div>
            </div>
          </div>
          )}

          {!isSignUp && (
          <div className="flex justify-between items-center text-sm mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={keepMeLoggedIn}
                onChange={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
              />
              Keep me logged in
            </label>
            <a href="#" className="text-accent py-2 ">
              Forgot password
            </a>
          </div>
        )}

          <button
            type="submit"
            className="w-full bg-accent hover:bg-[#17c982] font-bold text-white py-2 rounded-2xl hover:bg-opacity-90 transiton transition-all duration-500 ease-in-out "
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-textSecondary">or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <div className="mt-4 space-y-2">
          <button
            onClick={authWithGoogle}
            className="x-4 py-2 border-gray-300 justify-center text-center items-center border flex gap-2  text-black text-md hover:bg-gray-100 transition-all duration-500 ease-in-out rounded-2xl w-full  mb-5"
            type="submit"
          >
            <Image 
          className="w-6 h-6" 
          src="https://www.svgrepo.com/show/475656/google-color.svg" 
          loading="lazy" 
          alt="google logo"
          width={100}
          height={100}
          />
          
          <span className="px-2">
            Sign up with Google
          </span>
          </button>

          <button
            onClick={authWithGithub}
            className="x-4 py-2 border-gray-300 justify-center text-center items-center border flex gap-2  text-black text-md hover:bg-gray-100 transition-all duration-500 ease-in-out rounded-2xl w-full  mb-5"
          >
            <FaGithub className="mr-2" />
            Continue with GitHub
          </button>

        </div>
        <p className="mt-4 text-center text-sm text-textSecondary">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-accent font-bold hover:underline ml-1"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;