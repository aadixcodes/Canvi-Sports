import Layout from '../components/Layout'
import BannerSection from '../components/BannerSection'
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactPage = () => {
  return (
    <>
         <section className="relative w-full bg-white">
        <div className="relative w-full h-[20vh] md:h-[60vh]">
          <div 
            className="absolute inset-0 bg-no-repeat"
            style={{ 
              backgroundImage: "url('/assets/allpb.png')",
              backgroundSize: "100% 100%",
              backgroundPosition: "center"
            }}
          ></div>
          
          {/* Content with left positioning */}
          <div className="absolute inset-0 z-10 flex items-center transform -translate-y-4 md:-translate-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-8xl text-primary font-bold font-galantic absolute left-[12%] md:left-[19%]">
              CONTACT US 
            </h1>
          </div>
        </div>
      </section>
      
      {/* Main Contact Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Big Center Div with 70vw width and split background */}
          <div className="w-full  mx-auto overflow-hidden mb-16 relative min-h-[600px]">
            
            {/* Background Sections */}
            <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-10">
              {/* Left Side - 60% Dark Background */}
              <div className="lg:col-span-6 bg-[#29066d]"></div>
              
              {/* Right Side - 40% Background Image with top-right border radius */}
              <div className="lg:col-span-4 bg-cover bg-center rounded-tr-[100px]" 
                   style={{ backgroundImage: "url('/assets/contact.png')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-tr-[100px]"></div>
              </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 md:gap-8 lg:gap-10  h-full">
                
                {/* Left Side - Contact Information */}
                <div className="lg:col-span-5 text-white flex flex-col justify-center text-center">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-main mb-4 text-white">
                    Contact Us
                  </h2>
                  <p className="text-gray-200 text-sm md:text-base mb-6 leading-relaxed">
                    Get in touch with CPKL for any inquiries, partnerships, or information about 
                    upcoming tournaments and events.
                  </p>
                  
                  {/* Contact Details */}
                  <div className="space-y-4">
                    {/* Office Address */}
                    <div>
                      <h3 className="text-lg font-jaturat mb-2 text-white">Office Address</h3>
                      <p className="text-gray-200 text-xs md:text-sm">
                        CPKL Headquarters<br />
                        Sanganer, Jaipur<br />
                        Rajasthan, India
                      </p>
                    </div>
                    
                    {/* Training Fields */}
                    <div>
                      <h3 className="text-lg font-jaturat mb-2 text-white">Training Fields</h3>
                      <p className="text-gray-200 text-xs md:text-sm">
                        Raipur Sports Academy<br />
                        Bilaspur Stadium<br />
                        Durg Kabaddi Ground<br />
                        Rajnandgaon Arena
                      </p>
                    </div>
                    
                    {/* Contact Details */}
                    <div>
                      <h3 className="text-lg font-jaturat mb-2 text-white">Contact Details</h3>
                      <p className="text-gray-200 text-xs md:text-sm">
                        Phone: +91 86961 43069<br />
                        Email: info@canvisports.com
                      </p>
                    </div>
                    
                    {/* Social Media */}
                    <div className='text-center'>
                      <h3 className="text-lg font-jaturat mb-2 text-white">Social Media</h3>
                      <div className="flex justify-center space-x-3">
                        {/* Facebook */}
                        <a 
                          href="https://www.facebook.com/61580250114834/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer group text-[#180341] text-xl hover:text-white"
                        >
                          <FaFacebook />
                        </a>
                        
                        {/* Twitter/X */}
                        <a 
                          href="https://x.com/cpkleague" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-black transition-colors cursor-pointer group text-[#180341] text-xl hover:text-white"
                        >
                          <FaXTwitter />
                        </a>
                        
                        {/* LinkedIn */}
                        <a 
                          href="https://www.linkedin.com/company/cpkl-official" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer group text-[#180341] text-xl hover:text-white"
                        >
                          <FaLinkedin />
                        </a>
                        
                        {/* Instagram */}
                        <a 
                          href="https://www.instagram.com/cpklofficial" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white text-[#180341] text-xl hover:text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer group"
                        >
                          <FaInstagram />
                        </a>
                        
                        {/* YouTube */}
                        <a 
                          href="https://m.youtube.com/@Cpkl.official" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer group text-[#180341] text-xl hover:text-white"
                        >
                          <FaYoutube />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Contact Form (Spanning over both backgrounds) */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg w-full">
                    <h3 className="text-xl md:text-2xl font-jaturat text-[#29066d] mb-4 pb-3 border-b-2 border-gray-200">
                      Send a Message
                    </h3>
                    
                    <form className="space-y-4">
                      {/* First Name & Last Name - Side by Side */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all"
                            placeholder="Enter first name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all"
                            placeholder="Enter last name"
                          />
                        </div>
                      </div>
                      
                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all"
                          placeholder="Enter phone number"
                        />
                      </div>
                      
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all"
                          placeholder="Enter email address"
                        />
                      </div>
                      
                      {/* Message Textarea */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Message
                        </label>
                        <textarea 
                          rows="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent transition-all resize-none"
                          placeholder="Type your message here..."
                        ></textarea>
                      </div>
                      
                      {/* Submit Button */}
                      <button 
                        type="submit"
                        className="w-full bg-[#29066d] text-white py-3 px-6 rounded-lg hover:bg-[#180444] transition-colors duration-300 font-semibold text-lg mt-2"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Google Maps Section */}
          <div className="w-full mx-auto rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-300">
            <div className="h-64 md:h-80 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.78323487002!2d75.7677229759967!3d26.81246847670915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc91d4f3b7f7d%3A0x6e6542e2e1e3e3e3!2sSanganer%2C%20Jaipur%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CPKL Headquarters Location - Sanganer, Jaipur"
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="bg-[#29066d] text-white p-4 text-center">
              <p className="text-sm md:text-base font-semibold">
                CPKL Headquarters - Sanganer, Jaipur, Rajasthan, India
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage