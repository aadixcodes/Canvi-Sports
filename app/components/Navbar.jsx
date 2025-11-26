// "use client";
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Team", href: "/team" },
//     { name: "Standing", href: "/standing" },
//     { name: "Fixtures", href: "/fixtures" },
//     { name: "Gallery", href: "/gallery" },
//     { name: "Blogs", href: "/blogs" },
//     { name: "Events", href: "/events" },
//     { name: "CPKL TV", href: "/cpkltv" },
//     { name: "Contact", href: "/contact" },
//   ];

//   // Split navLinks as requested: 6 on left, 4 on right
//   const leftNavLinks = navLinks.slice(0, 6); // First 6 links
//   const rightNavLinks = navLinks.slice(6); // Last 4 links

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   const isActiveLink = (href) => {
//     if (href === "/") {
//       return pathname === "/";
//     }
//     return pathname.startsWith(href);
//   };

//   return (
//     <>
//       {/* Continuous Running Line */}
//       <div className="bg-[#29066d] py-2 overflow-hidden relative">
//         <div className="marquee-wrapper">
//           <div className="marquee-content whitespace-nowrap text-white font-sub text-sm md:text-base">
//             CPKL Season 2 • Dubai mein bajega Kabaddi ka danka! • The roar of
//             kabaddi goes global! • 8 powerhouse teams • Legendary icons like
//             Pardeep Narwal • Fresh rising stars • Kabaddi like the world has
//             never seen before •
//           </div>
//         </div>
//       </div>

//       {/* Top Pattern */}
//       <div
//         className="w-full h-4 bg-repeat-x bg-cover"
//         style={{ backgroundImage: "url('/assets/patternm.png')" }}
//       ></div>

//       {/* Main Navbar */}
//       <nav className="w-full bg-[#29066d] relative mb-1.5 z-60">
//         <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             {/* Left Navigation Links - 6 links with proper spacing */}
//             <div className="hidden xl:flex items-center space-x-2 2xl:space-x-4 flex-1 justify-end mr-8 2xl:mr-12">
//               {leftNavLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   className={`transition-colors duration-300 font-medium text-sm xl:text-sm 2xl:text-base px-2 xl:px-2 py-2 rounded whitespace-nowrap italic ${
//                     isActiveLink(link.href)
//                       ? "text-gray-300 font-semibold border-b-2 border-white"
//                       : "text-white hover:text-gray-300"
//                   }`}
//                   style={{ fontFamily: "var(--font-poppins)" }}
//                 >
//                   {link.name}
//                 </a>
//               ))}
//             </div>

//             {/* Logo - Centered for all screens except mobile - Increased z-index */}
//             <div className="flex-shrink-0 mx-4 lg:mx-8 xl:mx-12 2xl:mx-16 z-40">
//               <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full hidden md:flex items-center justify-center shadow-lg border-4 border-white">
//                 <img
//                   src="/assets/Logo CPKL.png"
//                   alt="Logo"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               </div>
//             </div>

//             {/* Right Navigation Links + Button - 4 links with button */}
//             <div className="hidden xl:flex items-center space-x-2 2xl:space-x-4 flex-1 justify-start ml-8 2xl:ml-12">
//               {/* Right Navigation Links - 4 links */}
//               <div className="flex items-center space-x-2 2xl:space-x-4 mr-4 2xl:mr-6">
//                 {rightNavLinks.map((link) => (
//                   <a
//                     key={link.name}
//                     href={link.href}
//                     className={`transition-colors duration-300 font-medium text-sm xl:text-sm 2xl:text-base px-2 xl:px-2 py-2 rounded whitespace-nowrap italic ${
//                       isActiveLink(link.href)
//                         ? "text-gray-300 font-semibold border-b-2 border-white"
//                         : "text-white hover:text-gray-300"
//                     }`}
//                     style={{ fontFamily: "var(--font-poppins)" }}
//                   >
//                     {link.name}
//                   </a>
//                 ))}
//               </div>

//               {/* Register Now Button - Smaller on medium screens */}
//               <div className="flex items-center">
//                 <a
//                   href="/registration"
//                   className="bg-white text-[#29066d] font-bold px-3 xl:px-4 py-2 rounded-lg shadow-xl relative overflow-hidden group animate-bounce-slow whitespace-nowrap border-2 border-white/50 min-w-[120px] xl:min-w-[140px] text-center text-xs xl:text-sm"
//                   style={{ fontFamily: "var(--font-poppins)" }}
//                 >
//                   {/* Moving shine effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>

//                   {/* Pulsing glow effect */}
//                   <div className="absolute inset-0 rounded-lg bg-white/30 animate-pulse-glow"></div>

//                   {/* Button text */}
//                   <span className="relative z-10 font-semibold italic">
//                     Register Now
//                   </span>
//                 </a>
//               </div>
//             </div>

//             {/* Tablet View (lg to xl) - Centered logo with menu button */}
//             <div className="hidden lg:flex xl:hidden items-center justify-end flex-1">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-white hover:text-gray-300 p-3 rounded-lg bg-white/10 backdrop-blur-sm transition-all duration-300 mr-2 z-50"
//                 aria-label="Toggle menu"
//               >
//                 <svg
//                   className="h-7 w-7"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Mobile Header - Show on screens smaller than lg */}
//             <div className="flex lg:hidden items-center justify-between w-full px-2">
//               {/* Mobile Logo */}
//               <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white -ml-4">
//                 <img
//                   src="/assets/Logo CPKL.png"
//                   alt="Logo"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               </div>

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-white hover:text-gray-300 p-3 rounded-lg bg-white/10 backdrop-blur-sm transition-all duration-300 mr-3 z-50"
//                 aria-label="Toggle menu"
//               >
//                 <svg
//                   className="h-7 w-7"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu Overlay - Fixed for tablet screens */}
//         {isOpen && (
//           <>
//             {/* Backdrop Blur - Now works for both mobile and tablet */}
//             <div
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//               onClick={() => setIsOpen(false)}
//             />

//             {/* Mobile Menu Panel - Now works for both mobile and tablet */}
//             <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#1a034a] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
//               {/* Header with Close Button */}
//               <div className="flex items-center justify-between p-6 border-b border-gray-600 bg-[#29066d]">
//                 <h2
//                   className="text-white text-xl font-semibold italic"
//                   style={{ fontFamily: "var(--font-poppins)" }}
//                 >
//                   Menu
//                 </h2>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="text-white hover:text-gray-300 p-2 rounded-full bg-white/10 transition-all duration-300"
//                   aria-label="Close menu"
//                 >
//                   <svg
//                     className="h-7 w-7"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Navigation Links */}
//               <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
//                 {navLinks.map((link) => (
//                   <a
//                     key={link.name}
//                     href={link.href}
//                     className={`block px-4 py-4 text-lg font-medium rounded-lg transition-all duration-200 italic ${
//                       isActiveLink(link.href)
//                         ? "text-white bg-white/20 font-semibold border-l-4 border-white"
//                         : "text-white hover:text-gray-300 hover:bg-white/10"
//                     }`}
//                     style={{ fontFamily: "var(--font-poppins)" }}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {link.name}
//                   </a>
//                 ))}

//                 {/* Register Now Button in Mobile Menu */}
//                 <div className="pt-8 mt-6 border-t border-gray-600">
//                   <a
//                     href="/registration"
//                     className="block w-full px-4 py-2 text-lg font-bold bg-white text-[#29066d] rounded-lg text-center relative overflow-hidden animate-bounce-slow border-2 border-white/50 italic"
//                     style={{ fontFamily: "var(--font-poppins)" }}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
//                     <span className="relative z-10">Register Now</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </nav>

//       <style jsx>{`
//         .marquee-wrapper {
//           width: 100%;
//           overflow: hidden;
//           position: relative;
//         }
//         .marquee-content {
//           display: inline-block;
//           animation: marquee 30s linear infinite;
//           padding-left: 100%;
//         }
//         @keyframes marquee {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-100%);
//           }
//         }
//         @keyframes bounce-slow {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-3px);
//           }
//         }
//         @keyframes pulse-glow {
//           0%,
//           100% {
//             opacity: 0.3;
//           }
//           50% {
//             opacity: 0.6;
//           }
//         }
//         .animate-bounce-slow {
//           animation: bounce-slow 3s ease-in-out infinite;
//         }
//         .animate-pulse-glow {
//           animation: pulse-glow 2s ease-in-out infinite;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;



"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Standing", href: "/standing" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blogs", href: "/blogs" },
    { name: "Events", href: "/events" },
    { name: "CPKL TV", href: "/cpkltv" },
    { name: "Contact", href: "/contact" },
  ];

  // Split navLinks as requested: 6 on left, 4 on right
  const leftNavLinks = navLinks.slice(0, 6); // First 6 links
  const rightNavLinks = navLinks.slice(6); // Last 4 links

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Continuous Running Line */}
      <div className="bg-[#29066d] py-2 overflow-hidden relative">
        <div className="marquee-wrapper">
          <div className="marquee-content whitespace-nowrap text-white font-sub text-sm md:text-base">
            CPKL Season 2 • Dubai mein bajega Kabaddi ka danka! • The roar of
            kabaddi goes global! • 8 powerhouse teams • Legendary icons like
            Pardeep Narwal • Fresh rising stars • Kabaddi like the world has
            never seen before •
          </div>
        </div>
      </div>

      {/* Top Pattern */}
      <div
        className="w-full h-4 bg-repeat-x bg-cover"
        style={{ backgroundImage: "url('/assets/patternm.png')" }}
      ></div>

      {/* Main Navbar */}
      <nav className="w-full bg-[#29066d] relative mb-1.5 z-60">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Navigation Links - 6 links with proper spacing */}
            <div className="hidden xl:flex items-center space-x-2 2xl:space-x-4 flex-1 justify-end mr-8 2xl:mr-12">
              {leftNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`transition-colors duration-300 font-medium text-sm xl:text-sm 2xl:text-base px-2 xl:px-2 py-2 rounded whitespace-nowrap italic ${
                    isActiveLink(link.href)
                      ? "text-gray-300 font-semibold border-b-2 border-white"
                      : "text-white hover:text-gray-300"
                  }`}
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Logo - Centered for all screens except mobile - Increased z-index */}
            <div className="flex-shrink-0 mx-4 lg:mx-8 xl:mx-12 2xl:mx-16 z-40">
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full hidden md:flex items-center justify-center shadow-lg border-4 border-white">
                <img
                  src="/assets/Logo CPKL.png"
                  alt="Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Right Navigation Links + Button - 4 links with button */}
            <div className="hidden xl:flex items-center space-x-2 2xl:space-x-4 flex-1 justify-start ml-8 2xl:ml-12">
              {/* Right Navigation Links - 4 links */}
              <div className="flex items-center space-x-2 2xl:space-x-4 mr-4 2xl:mr-6">
                {rightNavLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`transition-colors duration-300 font-medium text-sm xl:text-sm 2xl:text-base px-2 xl:px-2 py-2 rounded whitespace-nowrap italic ${
                      isActiveLink(link.href)
                        ? "text-gray-300 font-semibold border-b-2 border-white"
                        : "text-white hover:text-gray-300"
                    }`}
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Register Now Button - White Blinking Highlight Effect */}
              <div className="flex items-center">
                <a
                  href="/registration"
                  className="bg-white text-[#29066d] font-bold px-3 xl:px-4 py-2 rounded-lg shadow-xl relative overflow-hidden group whitespace-nowrap border-2 border-white/50 min-w-[120px] xl:min-w-[140px] text-center text-xs xl:text-sm animate-white-blink"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {/* White Blinking Overlay */}
                  <div className="absolute inset-0 rounded-lg bg-white/80 animate-blink-overlay z-0"></div>
                  
                  {/* Moving shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 z-10"></div>

                  {/* Button text */}
                  <span className="relative z-20 font-semibold italic">
                    Register Now
                  </span>
                </a>
              </div>
            </div>

            {/* Tablet View (lg to xl) - Centered logo with menu button */}
            <div className="hidden lg:flex xl:hidden items-center justify-end flex-1">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-300 p-3 rounded-lg bg-white/10 backdrop-blur-sm transition-all duration-300 mr-2 z-50"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Header - Show on screens smaller than lg */}
            <div className="flex lg:hidden items-center justify-between w-full px-2">
              {/* Mobile Logo */}
              <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white -ml-4">
                <img
                  src="/assets/Logo CPKL.png"
                  alt="Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-300 p-3 rounded-lg bg-white/10 backdrop-blur-sm transition-all duration-300 mr-3 z-50"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay - Fixed for tablet screens */}
        {isOpen && (
          <>
            {/* Backdrop Blur - Now works for both mobile and tablet */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel - Now works for both mobile and tablet */}
            <div className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#1a034a] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-gray-600 bg-[#29066d]">
                <h2
                  className="text-white text-xl font-semibold italic"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Menu
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-300 p-2 rounded-full bg-white/10 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="p-6 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`block px-4 py-4 text-lg font-medium rounded-lg transition-all duration-200 italic ${
                      isActiveLink(link.href)
                        ? "text-white bg-white/20 font-semibold border-l-4 border-white"
                        : "text-white hover:text-gray-300 hover:bg-white/10"
                    }`}
                    style={{ fontFamily: "var(--font-poppins)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}

                {/* Register Now Button in Mobile Menu with White Blinking Effect */}
                <div className="pt-8 mt-6 border-t border-gray-600">
                  <a
                    href="/registration"
                    className="block w-full px-4 py-2 text-lg font-bold bg-white text-[#29066d] rounded-lg text-center relative overflow-hidden border-2 border-white/50 italic animate-white-blink"
                    style={{ fontFamily: "var(--font-poppins)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* White Blinking Overlay */}
                    <div className="absolute inset-0 rounded-lg bg-white/80 animate-blink-overlay z-0"></div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500 z-10"></div>
                    <span className="relative z-20">Register Now</span>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      <style jsx>{`
        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        .marquee-content {
          display: inline-block;
          animation: marquee 30s linear infinite;
          padding-left: 100%;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        /* White Blinking Animation - No Scaling */
        .animate-white-blink {
          animation: white-blink 2s ease-in-out infinite;
        }
        
        /* Blinking Overlay Effect */
        .animate-blink-overlay {
          animation: blink-overlay 2s ease-in-out infinite;
        }
        
        @keyframes white-blink {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.8),
                       0 0 0 8px rgba(255, 255, 255, 0.4),
                       0 0 0 12px rgba(255, 255, 255, 0.2);
          }
        }
        
        @keyframes blink-overlay {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;