import { FaInstagram, FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Teams", href: "/teams" },
    { name: "Standings", href: "/standings" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events", href: "/events" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <footer className="bg-secondary-dark text-primary">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile & Tablet Layout */}
        <div className="block md:hidden">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Logo - Much Larger for Mobile */}
            <div className="w-32 h-32 rounded-full flex items-center justify-center">
              <img
                src="/assets/CanviSports.png"
                alt="Logo"
                className="w-32 h-32 object-contain"
              />
            </div>

            {/* Paragraph - Centered */}
            <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
              Canvi Sports Federation Pvt Ltd is India's fast-growing sports and
              entertainment company. Recently we have achieved some great
              achievements by organizing a league and connecting with the youth
              on social media through our owned and managed IP...
            </p>

            {/* Social Media Icons - Centered */}
            <div className="flex space-x-6 pt-2 md:pt-4 justify-center">
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

            {/* Quick Links & Contact Us in 2 Columns */}
            <div className="flex justify-center items-center w-full max-w-md mx-auto mt-4">
              {/* Quick Links Column */}
              {/* <div className="flex flex-col text-center">
                <h3 className="font-jaturat text-lg mb-6 text-white">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  {navLinks.slice(0, 4).map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block text-gray-300 hover:text-primary transition-colors duration-300 text-sm hover:translate-x-1 transform"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div> */}

              {/* Contact Us Column */}
              <div className="flex flex-col text-center">
                <h3 className="font-jaturat font-bold text-lg mb-6 text-white">
                  Contact Us
                </h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="space-y-1">
                    <p className="font-medium text-white">Address</p>
                    <p>Sanganer, Jaipur</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-white">Email</p>
                    <p>info@canvisports.com</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-white">Phone</p>
                    <p>+91-8696143069</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Quick Links Row */}
            <div className="w-full max-w-md mx-auto">
              <div className="flex flex-wrap justify-center gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop & Laptop Layout - Same as before but with larger logo */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24 items-start">
          {/* First Column - Logo & Info */}
          <div className="flex flex-col space-y-4 text-left">
            {/* Logo - Larger for Desktop */}
            <div className="w-24 h-24 rounded-full flex items-center justify-center">
              <img
                src="/assets/CanviSports.png"
                alt="Logo"
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* Paragraph */}
            <p className="text-sm text-gray-300 leading-relaxed">
              Canvi Sports Federation Pvt Ltd is India's fast-growing sports and
              entertainment company. Recently we have achieved some great
              achievements by organizing a league and connecting with the youth
              on social media through our owned and managed IP...
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
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

          {/* Second Column - Quick Links */}
          <div className="flex flex-col text-left md:mx-auto">
            <h3 className="font-jaturat text-lg mb-6 text-white">
              Quick Links
            </h3>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-primary transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Third Column - Contact Us */}
          <div className="flex flex-col text-left md:ml-auto">
            <h3 className="font-jaturat text-lg mb-6 text-white">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="space-y-1">
                <p className="font-medium text-white">Address</p>
                <p>Sanganer, Jaipur</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-white">Email</p>
                <p>info@canvisports.com</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-white">Phone</p>
                <p>+91-8696143069</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section with Pattern */}
      <div
        className="w-full h-12 bg-repeat-x bg-cover border-t border-gray-600"
        style={{ backgroundImage: "url('/copyright-pattern.png')" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
          <div className="text-xs text-gray-300">
            Design and Developed by - Mysnatic Sports | ©{" "}
            {new Date().getFullYear()} CPKL. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
