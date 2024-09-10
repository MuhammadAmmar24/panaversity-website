import logo from "../../public/logos/logo2.png"
import Image from "next/image"

export default function footer1() {
    return (
    <footer className="bg-[#031811]  text-white  py-12 px-4 md:px-6">
      <div className="container mx-auto flex    ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Image
            src={logo}
            alt="logo"
            width={150}
            height={150}
            className="  mr-2"
    />        
            </h2>
            <p className="mb-4  text-grey-200 pr-4">Power AI is an Content generator powered by Artificial Intelligence.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">Facebook </a>
              <a href="#" className="hover:text-gray-300">Instagram</a>
              <a href="#" className="hover:text-gray-300">Twitter </a>
              <a href="#" className="hover:text-gray-300">Linkedin </a>
            </div>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Our Mission</a></li>
              <li><a href="#" className="hover:text-gray-300">Company History</a></li>
              <li><a href="#" className="hover:text-gray-300">Testimonials</a></li>
              <li><a href="#" className="hover:text-gray-300">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-300">Terms Conditions</a></li>
              <li><a href="#" className="hover:text-gray-300">Cookies</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQ</a></li>
            </ul>
          </div>
        </div>  
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
          <form className="flex flex-col sm:flex-row gap-4 ">

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#031811] border-2 text-white rounded-md "
            />
            <button type="submit" className="   hover:scale-105  transition duration-30text-white">
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-sm text-gray-400">
            We will send you weekly updates for your better Product management.
          </p>
        </div>
       
      </div>
      <div className="mt-12 text-center text-sm text-gray-400">
          © Copyright 2024 PowerAI, Inc.
        </div>
    </footer>
    )
}
