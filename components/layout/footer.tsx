'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-[#0F3460] text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8'>
          {/* Company Details */}
          <div>
            <h2 className='icon-7 mb-4'>Bajar</h2>
            <p className='mb-2'>202-Dessau Rd</p>
            <p className='mb-2'>904 Pflugerville,Texas(TX)</p>
            <p className='mb-2'>Email: hedaetul.official@gmail.com</p>
            <p className='mb-2'>Phone: (555)123-4567</p>
          </div>

          {/* Customer Care */}
          <div>
            <h2 className='text-2xl font-bold italic mb-4'>Customer Care</h2>
            <ul>
              <li className='mb-2'>
                <Link href='/returns' className='hover:underline'>
                  Returns & Exchanges
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='/shipping' className='hover:underline'>
                  Shipping Information
                </Link>
              </li>
              <li className='mb-2'>
                <Link href='/faq' className='hover:underline'>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href='/support' className='hover:underline'>
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h2 className='text-2xl font-bold italic mb-4'>About Us</h2>
            <p className='mb-4'>
              We are a leading e-commerce company providing quality products and
              exceptional service.
            </p>
            <Link href='/about' className='hover:underline'>
              Learn More
            </Link>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className='text-2xl font-bold italic mb-4'>Contact Us</h2>
            <p className='mb-2'>Have questions or feedback? Reach out to us!</p>
            <Link href='/contact' className='hover:underline'>
              Contact Form
            </Link>
          </div>
        </div>
        <div className='text-center mt-8'>
          <p className='text-sm'>
            &copy; {new Date().getFullYear()} Bajar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
