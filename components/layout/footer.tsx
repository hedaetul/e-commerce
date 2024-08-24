"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F3460] pb-6 pt-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Company Details */}
          <div>
            <Link href="/" className="icon-7 mb-4 block text-2xl font-bold">
              Bajar
            </Link>
            <p className="mb-2">202-Dessau Rd</p>
            <p className="mb-2">904 Pflugerville, Texas (TX)</p>
            <p className="mb-2">Email: hedaetul.official@gmail.com</p>
            <p className="mb-2">Phone: (555)123-4567</p>
          </div>

          {/* Customer Care Section */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Customer Care</h2>
            <ul>
              <li className="mb-2">
                <Link href="/returns" className="hover:underline">
                  Returns & Exchanges
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/shipping" className="hover:underline">
                  Shipping Information
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/faq" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:underline">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h2 className="mb-4 text-xl font-bold">About Us</h2>
            <p className="mb-4">
              We are a leading e-commerce company providing quality products and
              exceptional service.
            </p>
            <Link href="/about" className="hover:underline">
              Learn More
            </Link>
          </div>

          {/* Contact Us Section */}
          <div>
            <h2 className="mb-4 text-xl font-bold">Contact Us</h2>
            <p className="mb-2">Have questions or feedback? Reach out to us!</p>
            <Link href="/contact" className="hover:underline">
              Contact Form
            </Link>
            <div className="mt-4 flex gap-4">
              <Link href="#" aria-label="Facebook">
                <FaFacebook className="text-2xl hover:text-blue-400 transition-colors duration-200" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <FaTwitter className="text-2xl hover:text-blue-400 transition-colors duration-200" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <FaInstagram className="text-2xl hover:text-pink-400 transition-colors duration-200" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Bajar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
