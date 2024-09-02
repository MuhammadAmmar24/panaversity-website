import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Dribbble } from 'lucide-react'

export default function Component() {
  return (
    <footer className="bg-[#000033] text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          {/* Company Info */}
          <div className="space-y-4  ">
            <Link href="/" className="flex items-center space-x-2 -mt-7">
              <Image src="/Green Panaverse-03.png" alt="" width={120} height={50}/>
            </Link>
            <p className="text-sm text-gray-300">
              We will likely assistance organizations keep up accomplish best class positions their separate enterprises & our group works happen that delights need to be discovered.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Dribbble size={20} />
              </Link>
            </div>
          </div>

          {/* Latest Work */}
<div>
  <h3 className="text-lg font-semibold mb-4">Latest Work</h3>
  <div className="grid grid-cols-2 gap-2 pr-4">
    {[
      { src: '/images (1).jpeg', alt: 'Work 1' },
      { src: '/images (1).jpeg', alt: 'Work 2' },
      { src: '/images (1).jpeg', alt: 'Work 3' },
      { src: '/images (1).jpeg', alt: 'Work 4' },
    ].map((work, i) => (
      <div key={i} className="bg-blue-900 rounded-lg overflow-hidden">
        <Image src={work.src} alt={work.alt} width={140} height={100} />
      </div>
    ))}
  </div>
</div>


          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              {['Home', 'About us', 'Our Team', 'Our Courses', 'Career'].map((link, i) => (
                <li key={i}>
                  <Link href="#" className="text-gray-300 hover:text-white text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-blue-400">Office Location</span><br />
                124, Queens walk 2nd cross Denmark
              </p>
              <p className="text-sm">
                <span className="text-blue-400">Phone No.</span><br />
                +00-888-27-240
              </p>
              <p className="text-sm">
                <span className="text-blue-400">Email Address</span><br />
                support@info.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-4 border-t border-gray-700 flex flex-wrap justify-between items-center">
          <p className="text-sm text-gray-400">Copyright © Bithlo, All Rights Reserved.</p>
          <div className="space-x-4">
            <Link href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}