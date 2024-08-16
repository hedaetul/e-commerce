"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F3460] pb-6 pt-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-4">
          {/* Company Details */}
          <div>
            <Link href="/" className="icon-7 mb-4">
              Bajar
            </Link>
            <p className="mb-2">202-Dessau Rd</p>
            <p className="mb-2">904 Pflugerville,Texas(TX)</p>
            <p className="mb-2">Email: hedaetul.official@gmail.com</p>
            <p className="mb-2">Phone: (555)123-4567</p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold italic">Customer Care</h2>
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

          <div>
            <h2 className="mb-4 text-2xl font-bold italic">About Us</h2>
            <p className="mb-4">
              We are a leading e-commerce company providing quality products and
              exceptional service.
            </p>
            <Link href="/about" className="hover:underline">
              Learn More
            </Link>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold italic">Contact Us</h2>
            <p className="mb-2">Have questions or feedback? Reach out to us!</p>
            <Link href="/contact" className="hover:underline">
              Contact Form
            </Link>
            <div className="flex gap-2">
              <Link href="#">
                <FaFacebook className="text-2xl" />
              </Link>
              <Link href="#">
                <FaTwitter className="text-2xl" />
              </Link>
              <Link href="#">
                <FaInstagram className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
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
