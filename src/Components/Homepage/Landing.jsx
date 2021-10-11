import React from 'react'
import City from "src/Assets/cityroad.jpeg";
import Logo from "src/Assets/logo.png";
import ManilaCity from "src/Assets/manila.jpg";
import Outside from "src/Assets/outside.jpg";
import Teamvalen from "src/Assets/valen.jpg";
import ViceG from "src/Assets/vice.jpg";
import JhongH from "src/Assets/jhong.jpg";
import KarylleG from "src/Assets/Karylle.jpg";
import Teamrenato from "src/Assets/renato.jpg";
import Teamzener from "src/Assets/zener.jpg";
import Teamklyde from "src/Assets/klyde.jpg";
import Blog1 from "src/Assets/blog1.jpg";
import Blog2 from "src/Assets/blog2.jpg";
import Blog3 from "src/Assets/blog3.jpg";
import Blog5 from "src/Assets/blog5.jpg";
import Blog6 from "src/Assets/blog6.jpg";
import Teamlee from "src/Assets/lee.jpg";
import Teamkenneth from "src/Assets/kenneth.jpg";
import PWA3 from "src/Assets/pwa3.png";
import PWA4 from "src/Assets/pwa4.png";
import { Link } from "react-router-dom";




const Landing = () => {
  return (
    <div>
      {/*Hero Section*/}
      <nav className="bg-white">
        <div className="container px-6 py-2 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-start">
            <img src={Logo} alt="" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
            <div className="ml-3 text-2xl font-bold text-tiffany">Cloud Shipping</div>
          </div>
          <div className="items-center md:flex">
            <div className="flex flex-col md:flex-row md:mx-6">
              <Link to="/" className="text-lg my-1 text-tiffany  dark:text-gray-200 hover:text-indigo-600  md:mx-4 md:my-0"
              >Home</Link
              >
              <Link to="/service" className="text-lg my-1 text-tiffany hover:text-indigo-600  md:mx-4 md:my-0"
              >Service</Link
              >
              <Link to="/contact" className="text-lg my-1 text-tiffany  hover:text-indigo-600  md:mx-4 md:my-0"
              >Contact</Link
              >
              <Link to="/team" className="text-lg my-1 text-tiffany  hover:text-indigo-600 md:mx-4 md:my-0"
              >Team</Link
              >
              <Link to="/become-a-partner" className="text-lg my-1 text-tiffany hover:text-indigo-600  md:mx-4 md:my-0"
              >Partner</Link
              >
            </div>
          </div>
        </div>
      </nav>
      <div className="md:flex items-center justify-center relative h-screen">
        <img src={City} alt="" className="absolute h-full w-full object-cover" />
        <div className="px-5 py-24 mb-24 text-center justify-center relative">
          <p className="text-4xl text-tiffany font-bold tracking-normal "> Transforming the Shipping and Business Industry for the Next Generation</p>
          <p className="mb-10 text-1xl pt-6 text-tiffany tracking-normal ">Cloud Shipping provides services that fulfills individuals, business owners, and large organizations shipping transaction in a delightful experience through managing transactions and automate all your shipping needs</p>
          <Link to="/sign-in" className=" mr-8 mx-auto text-white bg-tiffany border border-tiffany hover:border-transparent rounded py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Sign In</Link>
          <Link to="/sign-up" className="mx-auto text-white bg-transparent border border-tiffany py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Sign Up</Link>
        </div>
      </div>


      {/*Service Section*/}

      <section className="bg-dark-gray">
        <div className="container px-5 py-28 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <p className="text-5xl font-medium title-font mb-4 text-tiffany-light tracking-widest">SERVICES</p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-tiffany">Cloud shipping provides affordable, reliable and same day delivery service in your area.</p>
          </div>
          <div className="flex flex-wrap -mx-4 -mb-10 text-center">
            <div className="sm:w-1/2 mb-10 px-4">
              <div className=" h-64 overflow-hidden">
                <img src={ManilaCity} alt="" className="object-contain h-100 W w-full" />
              </div>
              <h2 className="title-font text-2xl font-medium text-tiffany-light mt-6 mb-3">Delivery within Manila</h2>
              <p className="leading-relaxed text-base mb-8 text-tiffany">The fastest door-to-door delivery service will come to your area. </p>
              <Link to="/services" class="text-tiffany-light bg-transparent border border-tiffany py-2 px-8 focus:outline-none hover:bg-tiffany rounded text-lg">
                Learn More</Link>
            </div>
            <div className="sm:w-1/2 mb-10 px-4">
              <div className=" h-64 overflow-hidden">
                <img src={Outside} alt="" className="object-contain h-100 W w-full" />
              </div>
              <h2 className="title-font text-2xl font-medium  mt-6 mb-3 text-tiffany-light">Delivery outside Manila</h2>
              <p className="leading-relaxed text-base mb-8 text-tiffany">On time delivery, we won't keep you waiting for long.</p>
              <Link to="/services" className="text-tiffany-light bg-transparent border border-tiffany py-2 px-8 focus:outline-none hover:bg-tiffany rounded text-lg">
                Learn More</Link>
            </div>
          </div>
        </div>
      </section>


      {/*Working Process Section*/}

      <section className="bg-tiffany-light">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <p className="text-5xl font-medium title-font mb-4 text-gray-900 tracking-widest">WORKING PROCESS</p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Below is the overview of the Cloud shipping service.</p>
          </div>
          <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-tiffany w-12 h-12" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Registration</h2>
                <p className="leading-relaxed">First thing customer should do is to create an account. Once customer's account has been confirm, customer can now book or place order. </p>
              </div>
            </div>
          </div>
          <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-tiffany  h2 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Order</h2>
                <p className="leading-relaxed"> After finalizing
                  the delivery details. Cloud shipping will process the information gathered and begin preparing the order to be shipped.</p>
              </div>
            </div>
          </div>
          <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-tiffany h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Check Order Status</h2>
                <p className="leading-relaxed">Once the order and delivery has been shipped, cloud shipping will provide unique tracking number. Customer will now be able to track the locaton as well as its current status. </p>
              </div>
            </div>
          </div>
          <div className="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
            <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
              <div className="flex-shrink-0 w-24 h-24 bg-indigo-100 text-indigo-500 rounded-full inline-flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="text-tiffany w-12 h-12" viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
              </div>
              <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Delivered</h2>
                <p className="leading-relaxed">Customer received the parcel on the same delivery day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Team Section*/}

      <section className="bg-dark-gray">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full mb-20">
            <p className="text-5xl font-medium title-font mb-4 text-tiffany-light tracking-widest">TEAM</p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-tiffany text-base">Teamwork is the ability to work together toward a common vision. The ability to direct individual accomplishments toward organizational objectives.
              It is the fuel that allows common people to attain uncommon results.
              ~ Andrew Carnegie</p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img src={Teamklyde} alt="" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" />
                <div className="flex-grow sm:pl-8">
                  <p className="title-font font-medium text-lg text-tiffany-light">Klyde Guevarra</p>
                  <p className="text-tiffany mb-3">Leader (BE)</p>
                  <p className="mb-4 text-tiffany">Klyde is a 4th year Information Technology Student of the Adventist University of the Philippines.</p>
                  <span className="inline-flex">
                    <a href="https://www.facebook.com/guevarra.klyde" className="text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a href="https://github.com/Klylylydeee" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img src={Teamzener} alt="" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" />
                <div className="flex-grow sm:pl-8">
                  <p className="title-font font-medium text-lg text-tiffany-light">Zener Lavarrias</p>
                  <p className="text-tiffany mb-3">Member (BE)</p>
                  <p className="mb-4 text-tiffany">Zener is a 3rd year Information Technology Student of the Adventist University of the Philippines.</p>
                  <span className="inline-flex">
                    <a href="https://www.facebook.com/zen.naari" className="text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/cloud_shipping" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/cloud_shipping" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img src={Teamvalen} alt="" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" />
                <div className="flex-grow sm:pl-8">
                  <p className="title-font font-medium text-lg text-tiffany-light">Valen Magante</p>
                  <p className="text-tiffany mb-3">Member (FE)</p>
                  <p className="mb-4 text-tiffany">Valen is a 3rd year Information Technology Student of the Adventist University of the Philippines.</p>
                  <span className="inline-flex">
                    <a href="https://www.facebook.com/profile.php?id=100008410173116" className="text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/valeeeenx" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/valennnn.x/" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img src={Teamkenneth} alt="" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" />
                <div className="flex-grow sm:pl-8">
                  <p className="title-font font-medium text-lg text-tiffany-light">Kenneth Canedo</p>
                  <p className="text-tiffany mb-3">Member (FE)</p>
                  <p className="mb-4 text-tiffany">Kenneth is a 3rd year Information Technology Student of the Adventist University of the Philippines.</p>
                  <span class="inline-flex">
                    <a href="https://www.facebook.com/keeejac" className="text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/Keeejac?fbclid=IwAR3VcN_dJhBMmQOh8hIm--diCAH-AECBP3Emx4MY9rdGJzfdM4OJuGA5-pY" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/keeejac/?fbclid=IwAR3_rjAzZYkWjf24s-g8Fy4WWpw8xiS9JB6SpNQrnFN2vvRgEHg2RgZeluY" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img src={Teamrenato} alt="" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" />
                <div className="flex-grow sm:pl-8">
                  <p className="title-font font-medium text-lg text-tiffany-light">Rento Dinco</p>
                  <p className="text-tiffany mb-3">Member (FE)</p>
                  <p className="mb-4 text-tiffany">Renato is a 3rd year Information Technology Student of the Adventist University of the Philippines..</p>
                  <span className="inline-flex">
                    <a href="https://www.facebook.com/janjen.dinco" className="text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/cloud_shipping" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/cloud_shipping" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img src={Teamlee} alt="" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" />
                <div className="flex-grow sm:pl-8">
                  <p className="title-font font-medium text-lg text-tiffany-light">Lee</p>
                  <p className="text-tiffany mb-3">Member (FE)</p>
                  <p className="mb-4 text-tiffany">Lee is a 4th year Information Technology Student of the Adventist University of the Philippines.</p>
                  <span className="inline-flex">
                    <a href="https://www.facebook.com/tldzmfhem" className="text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/cloud_shipping" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a href="https://twitter.com/cloud_shipping" className="ml-2 text-tiffany-light">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*BLOG SECTION HERE*/}

      <section className="bg-tiffany-light ">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-5xl font-medium title-font mb-4 text-gray-900 tracking-widest">BLOG</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Check cloud shipping latest post from our blog. </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="h-full  rounded-lg overflow-hidden">
                <img src={Blog1} alt="" className="object-contain h-30 w-30 " />
                <div className="p-6">
                  <p className=" text-lg title-font font-medium font-bold text-dark-gray mb-3">Cloud Shipping Remains Open Amid COVID-19 Pandemic</p>
                  <p className="tracking-widest title-font text-xs  font-medium text-gray-900 mb-1">September 12, 2021</p>
                  <p className="leading-relaxed mb-3">We consider it a privilege to continue serving our clients even in the midst of a global health crisis. We put the safety of our drivers and our clients first.</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full  rounded-lg overflow-hidden">
                <img src={Blog2} alt="" className="object-contain h-30 w-30 " />
                <div className="p-6">
                  <p className="text-lg title-font font-medium font-bold text-dark-gray mb-3">The Importance of a Reliable Delivery Service</p>
                  <p className="tracking-widest  title-font text-xs font-medium text-gray-900 mb-1">August 12, 2021</p>
                  <p className="leading-relaxed mb-3">Your package has traveled a great distance. But due to that great distance, it may have had to switch hands once or a few times. But making sure that the last leg of the trip goes smoothly can be the most important, ensuring that your packages reach their destination quickly for a timely arrival.</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full  rounded-lg overflow-hidden">
                <img src={Blog3} alt="" className="object-contain h-30 w-30 " />
                <div className="p-6">
                  <p className=" text-lg title-font font-medium font-bold text-dark-gray mb-3">Getting Your Deliveries Safely</p>
                  <p className="tracking-widest title-font text-xs font-medium text-gray-900 mb-1">September 2, 2021</p>
                  <p className="leading-relaxed mb-3">In these uncertain times, there is greater uncertainty about how to bring your packages covid-free into  your home. What we do is we sanitize and  clean your packages, so that your home will be well-supplied, while you stay well and safe</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full rounded-lg overflow-hidden">
                <img src={Blog1} alt="" className="object-contain h-30 w-30 " />
                <div className="p-6">
                  <p className="text-lg title-font font-medium font-bold text-dark-gray mb-3">Top 3 Reasons To Choose Cloud Shipping</p>
                  <p className="tracking-widest  title-font text-xs font-medium text-gray-900 mb-1">October 1, 2021</p>
                  <p className="leading-relaxed mb-3">
                    <span className="font-bold ">Affordability; </span>cloud Shipping offer more affordable rates compared to larger companies with standardized prices.
                    <span className="font-bold "> Same-Day Delivery Options; </span> cloud shipping provide the fastest delivery service in your area. <span className="font-bold ">Reliability; </span>cloud shipping offer tracking features to give you a stronger sense of security knowing where your package is every step of the way. </p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full  rounded-lg overflow-hidden">
                <img src={Blog5} alt="" className="object-contain h-30 w-30 " />
                <div className="p-6">
                  <p className=" text-lg title-font font-medium font-bold text-dark-gray mb-3">Same-Day Delivery Services Can Save the Day</p>
                  <p className="tracking-widest title-font text-xs font-medium text-gray-900 mb-1">August 7, 2021</p>
                  <p className="leading-relaxed mb-3">There are some cases where you might find yourself short on time, but you absolutely need to get a delivery made. Maybe you have to go to work, or you have an important event that can’t be delayed, but somehow you need the shipment made without being in two places at once. That’s when a same-day rush courier can come in handy and save the day</p>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full rounded-lg overflow-hidden">
                <img src={Blog6} alt="" className="object-contain h-30 w-30 " />
                <div className="p-6">
                  <p className="text-lg title-font font-medium font-bold text-dark-gray mb-3">The Top Delivery Services in the Philippines</p>
                  <p className="tracking-widest title-font text-xs font-medium text-gray-900 mb-1">October 17, 2021</p>
                  <p className="leading-relaxed mb-3">Cloud Shipping, Toktok, Transportify, Mr. Speedy, Grab, Ninja Van. Among the delivery services offer are parcel delivery, documents delivery, and delivery of the big item, etc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Contact Section*/}

      <section className="bg-dark-gray">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-5xl font-medium title-font mb-4 text-tiffany-light tracking-widest">CONTACT</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-tiffany">We're here to help and answer any question you might have. We look forward to hearing from you!!</p>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className=" text-tiffany h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-tiffany-light text-lg title-font font-medium mb-2">For all inquires, send us an email</h2>
              <p className="leading-relaxed text-base text-tiffany">cloudshipping2@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-tiffany-light text-lg title-font font-medium mb-2">Find us here!</h2>
              <span className="flex flex-wrap inline-flex">
                <a href="https://www.facebook.com/profile.php?id=100073132796934" className="text-tiffany-light">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <p className="leading-relaxed text-base text-tiffany">@CloudShipping</p>
                <a href="https://twitter.com/cloud_shipping" className="ml-2 text-tiffany-light">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <p className="leading-relaxed text-base text-tiffany">@cloud_shipping</p>
                <a href="https://www.instagram.com/cloud.shipping/" className="ml-2 text-tiffany-light">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <p className="leading-relaxed text-base text-tiffany">@cloud.shipping</p>
              </span>
            </div>
            <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-tiffany h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-tiffany h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-tiffany-light text-lg title-font font-medium mb-2">Give us a call</h2>
              <p className="leading-relaxed text-base">
                <div className="text-tiffany ">09203335871</div>
                <div className="text-tiffany">09299602299</div>
              </p>
              <Link to="/contact" className="mt-3 text-tiffany-light  inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*Partner Section*/}

      <section className=" bg-tiffany-light">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-5xl font-medium title-font mb-4 text-gray-900 tracking-widest">PARTNERS</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Below are the brands we work with...</p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="block relative h-48 rounded overflow-hidden">
                <img src={PWA3} alt="" className="object-contain h-48 w-full" />
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="block relative h-48 rounded overflow-hidden">
                <img src={PWA3} alt="" className="object-contain h-48 w-full" />
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="block relative h-48 rounded overflow-hidden">
                <img src={Logo} alt="" className="object-contain h-30 w-30 " />
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="block relative h-48 rounded overflow-hidden">
                <img src={PWA3} alt="" className="object-contain h-48 w-full" />
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="block relative h-48 rounded overflow-hidden">
                <img src={PWA3} alt="" className="object-contain h-48 w-full" />
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="block relative h-48 rounded overflow-hidden">
                <img src={PWA3} alt="" className="object-contain h-48 w-full" />
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="block relative h-48 rounded overflow-hidden">
                <img src={PWA4} alt="" className="object-contain h-48 w-full" />
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <div className="block relative h-48 rounded overflow-hidden">
                <img src={PWA3} alt="" className="object-contain h-48 w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*REVIEW ABOUT US SECTION */}

      <section className="bg-dark-gray">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-5xl font-medium title-font mb-4 text-tiffany-light tracking-widest">REVIEW ABOUT US</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-tiffany text-base">We ask our customers to submit a review of their Cloud Shipping experience 1 week after their order was placed. Here are those reviews, good and bad, giving you an honest insight into what you can expect from Cloud Shipping.</p>
          </div>
          <div className="flex flex-wrap -mx-4 -my-8">
            <div className="py-8 px-4 lg:w-1/3">
              <div className="h-full flex items-start">
                <div className="flex-grow pl-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-tiffany-light mb-1">August 20, 2021</h2>
                  <div className="flex justify-left items-left">
                    <div className="flex items-left mt-2 mb-4">
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                    </div>
                  </div>
                  <p className="leading-relaxed mb-5 text-tiffany">Fantastic service from start to finish. So reasonable too. Parcel arrived at destination safe and sound</p>
                  <div className="inline-flex items-center">
                    <img src={ViceG} alt="" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                    <span className="flex-grow flex flex-col pl-3">
                      <span className="title-font font-medium text-tiffany">Jamie Cruz</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-8 px-4 lg:w-1/3">
              <div className="h-full flex items-start">
                <div className="flex-grow pl-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-tiffany-light mb-1">August 27, 2021</h2>
                  <div className="flex justify-left items-left">
                    <div className="flex items-left mt-2 mb-4">
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                    </div>
                  </div>
                  <p className="leading-relaxed mb-5 text-tiffany">The parcel was delivered in a totally professional manner and I will be using Parcel Monkey again.</p>
                  <div className="inline-flex items-center">
                    <img src={KarylleG} alt="" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                    <span className="flex-grow flex flex-col pl-3">
                      <span className="title-font font-medium text-tiffany">Kate Santos</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-8 px-4 lg:w-1/3">
              <div className="h-full flex items-start">
                <div className="flex-grow pl-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-tiffany-light mb-1">September 14, 2021</h2>
                  <div className="flex justify-left items-left">
                    <div className="flex items-left mt-2 mb-4">
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                    </div>
                  </div>
                  <p className="leading-relaxed mb-5 text-tiffany">Website easy to use. I will recommend it to others, very efficient. Job well done! Thankyou.</p>
                  <div className="inline-flex items-center">
                    <img src={JhongH} alt="" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                    <span className="flex-grow flex flex-col pl-3">
                      <span className="title-font font-medium text-tiffany">Lany Smith</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-8 px-4 lg:w-1/3">
              <div className="h-full flex items-start">
                <div className="flex-grow pl-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-tiffany-light mb-1">September 15, 2021</h2>
                  <div className="flex justify-left items-left">
                    <div className="flex items-left mt-2 mb-4">
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                    </div>
                  </div>
                  <p className="leading-relaxed mb-5 text-tiffany">Good service. First time using cloud shipping,very satisfied with the outcome,highly recommend Thank you</p>
                  <div className="inline-flex items-center">
                    <img src={Teamvalen} alt="" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                    <span className="flex-grow flex flex-col pl-3">
                      <span className="title-font font-medium text-tiffany">Taylor Swift</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-8 px-4 lg:w-1/3">
              <div className="h-full flex items-start">
                <div className="flex-grow pl-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-tiffany-light mb-1">September 27, 2021</h2>
                  <div class="flex justify-left items-left">
                    <div className="flex items-left mt-2 mb-4">
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                    </div>
                  </div>
                  <p className="leading-relaxed mb-5 text-tiffany">5 star everytime. Ive used Cloud Shipping quite a few times now and theyve never let me down. Will continue to use them, no question. Big thumbs up</p>
                  <div className="inline-flex items-center">
                    <img src={Teamzener} alt="" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                    <span className="flex-grow flex flex-col pl-3">
                      <span className="title-font font-medium text-tiffany">Calum Hood</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-8 px-4 lg:w-1/3">
              <div className="h-full flex items-start">
                <div className="flex-grow pl-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-tiffany-light mb-1">October 1, 2021</h2>
                  <div className="flex justify-left items-left">
                    <div className="flex items-left mt-2 mb-4">
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                      <svg className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                    </div>
                  </div>
                  <p className="leading-relaxed mb-5 text-tiffany">Brilliant service, easy to use online, great tracking and prompt delivery. Hands down!</p>
                  <div className="inline-flex items-center">
                    <img src={Teamklyde} alt="" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                    <span className="flex-grow flex flex-col pl-3">
                      <span className="title-font font-medium text-tiffany">Tom Cullen</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Footer Section*/}

      <footer className="bg-white">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col  dark:bg-gray-800">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <img src={Logo} alt="" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
              <span className="ml-3 text-xl">Cloud Shipping</span>
            </div>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">About</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-tiffany">Contact</Link>
                </li>
                <li>
                  <Link to="/team" className="text-gray-600 hover:text-tiffany">Team</Link>
                </li>
                <li>
                  <Link to="/become-a-partner" className="text-gray-600 hover:text-tiffany">Partner</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Services</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to="/service" className="text-gray-600 hover:text-tiffany">Package Delivery</Link>
                </li>
                <li>
                  <Link to="/service" className="text-gray-600 hover:text-tiffany">Delivery within Manila</Link>
                </li>

              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Social Networks</h2>
              <nav className="list-none mb-10">
                <li>
                  <a href="https://www.facebook.com/profile.php?id=100073132796934" className="text-gray-600 hover:text-tiffany">Facebook</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/cloud.shipping/" className="text-gray-600 hover:text-tiffany">Instagram</a>
                </li>
                <li>
                  <a href="https://twitter.com/cloud_shipping" className="text-gray-600 hover:text-tiffany">Twitter</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="font-medium text-gray-900 tracking-widest text-sm mb-3">Contacts</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-tiffany">cloudshipping2@gmail.com</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-tiffany">09299602299</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-tiffany">09203335871</Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-lg text-center sm:text-left">© 2021 Cloudshipping — @cloudshipping</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing




