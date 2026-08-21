"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import BrandMark from "./brand";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card pb-6 pt-12 text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div>
            <div className="mb-4">
              <BrandMark />
            </div>
            <p className="mb-2 text-muted-foreground">202-Dessau Rd</p>
            <p className="mb-2 text-muted-foreground">
              904 Pflugerville, Texas (TX)
            </p>
            <p className="mb-2 text-muted-foreground">
              Email: hedaetul.official@gmail.com
            </p>
            <p className="mb-2 text-muted-foreground">Phone: (555)123-4567</p>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold">Customer Care</h2>
            <ul>
              <li className="mb-2">
                <Link href="/returns" className="text-muted-foreground hover:text-primary hover:underline">
                  Returns & Exchanges
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/shipping" className="text-muted-foreground hover:text-primary hover:underline">
                  Shipping Information
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/faq" className="text-muted-foreground hover:text-primary hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary hover:underline">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold">About Us</h2>
            <p className="mb-4 text-muted-foreground">
              Mira Haat is a marketplace providing quality products and
              exceptional service.
            </p>
            <Link href="/about" className="text-primary hover:underline">
              Learn More
            </Link>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold">Contact Us</h2>
            <p className="mb-2 text-muted-foreground">
              Have questions or feedback? Reach out to us!
            </p>
            <Link href="/contact" className="text-primary hover:underline">
              Contact Form
            </Link>
            <div className="mt-4 flex gap-4">
              <Link href="#" aria-label="Facebook">
                <FaFacebook className="text-2xl text-muted-foreground transition-colors duration-200 hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <FaTwitter className="text-2xl text-muted-foreground transition-colors duration-200 hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <FaInstagram className="text-2xl text-muted-foreground transition-colors duration-200 hover:text-accent-foreground" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Mira Haat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
