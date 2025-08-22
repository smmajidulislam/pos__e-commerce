"use client";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-50 mt-8">
      <div className="px-4 py-6 flex flex-wrap ">
        {/* Logo */}
        <div className="w-full md:w-1/4 sm:1/2 lg:1/4">
          <img
            src="/logo.png"
            alt="logo"
            className="w-20 mb-3 mx-auto md:mx-0"
          />
          <p className="text-sm text-gray-600">
            Your trusted partner for modern, AI powered digital solutions. Built
            for speed, scale, and impact.
          </p>
        </div>

        {/* Links */}
        <div className="w-full md:w-1/4 sm:1/2 lg:1/4">
          <h4 className="!font-bold mb-2 text-2xl">Useful Links</h4>
          <ul className="space-y-1 text-sm">
            <li>Home</li>
            <li>About Us</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-full md:w-1/4 sm:1/2 lg:1/4">
          <h4 className="!font-bold mb-2 text-2xl">Contact Us</h4>
          <p className="text-sm">555 4th St NW, Washington</p>
          <p className="text-sm">+88 01750 000 000</p>
          <p className="text-sm">info@gmail.com</p>
        </div>

        {/* Newsletter */}
        <div className="w-full md:w-1/4 sm:1/2 lg:1/4">
          <h4 className="!font-bold mb-2 text-xl">Stay in the Loop</h4>
          <input
            type="email"
            placeholder="Enter your email"
            className="border px-3 py-2 rounded-md w-full"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t py-3 flex flex-col md:flex-row justify-between items-center px-4 text-sm text-gray-600">
        <p>© 2025 Md Webinion Ali. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0 text-xl text-green-700">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedin />
        </div>
      </div>
    </footer>
  );
}
