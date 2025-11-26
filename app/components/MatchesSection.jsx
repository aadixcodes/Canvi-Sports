// // MatchesSection.jsx
// 'use client';
// import { motion } from 'framer-motion';
// import { useRef, useState, useEffect } from 'react';

// const MatchesSection = () => {
//   const matches = [
//     {
//       id: 1,
//       title: "Match 1",
//       teamA: "Team A",
//       teamB: "Team B",
//       date: "MONDAY - 30 OCT 6:00 PM",
//       venue: "ABC Stadium XYZ"
//     },
//     {
//       id: 2,
//       title: "Match 2", 
//       teamA: "Team C",
//       teamB: "Team D",
//       date: "TUESDAY - 31 OCT 3:00 PM",
//       venue: "XYZ Arena Center"
//     },
//     {
//       id: 3,
//       title: "Match 3",
//       teamA: "Team E",
//       teamB: "Team F",
//       date: "WEDNESDAY - 1 NOV 5:00 PM",
//       venue: "National Stadium"
//     },
//     {
//       id: 4,
//       title: "Match 4",
//       teamA: "Team G",
//       teamB: "Team H",
//       date: "THURSDAY - 2 NOV 7:00 PM",
//       venue: "City Sports Complex"
//     },
//     {
//       id: 5,
//       title: "Match 5",
//       teamA: "Team I",
//       teamB: "Team J",
//       date: "FRIDAY - 3 NOV 4:00 PM",
//       venue: "Sports Arena Delhi"
//     },
//     {
//       id: 6,
//       title: "Match 6",
//       teamA: "Team K",
//       teamB: "Team L",
//       date: "SATURDAY - 4 NOV 8:00 PM",
//       venue: "Mumbai Ground"
//     },
//     {
//       id: 7,
//       title: "Match 7",
//       teamA: "Team M",
//       teamB: "Team N",
//       date: "SUNDAY - 5 NOV 2:00 PM",
//       venue: "Chennai Stadium"
//     },
//     {
//       id: 8,
//       title: "Match 8",
//       teamA: "Team O",
//       teamB: "Team P",
//       date: "MONDAY - 6 NOV 6:30 PM",
//       venue: "Kolkata Arena"
//     },
//     {
//       id: 9,
//       title: "Quarter Final 1",
//       teamA: "Winner A",
//       teamB: "Winner B",
//       date: "TUESDAY - 7 NOV 5:00 PM",
//       venue: "National Stadium"
//     },
//     {
//       id: 10,
//       title: "Quarter Final 2",
//       teamA: "Winner C",
//       teamB: "Winner D",
//       date: "WEDNESDAY - 8 NOV 7:00 PM",
//       venue: "City Sports Complex"
//     },
//     {
//       id: 11,
//       title: "Semi Final 1",
//       teamA: "QF Winner 1",
//       teamB: "QF Winner 2",
//       date: "FRIDAY - 10 NOV 6:00 PM",
//       venue: "ABC Stadium XYZ"
//     },
//     {
//       id: 12,
//       title: "Semi Final 2",
//       teamA: "QF Winner 3",
//       teamB: "QF Winner 4",
//       date: "SATURDAY - 11 NOV 8:00 PM",
//       venue: "XYZ Arena Center"
//     },
//     {
//       id: 13,
//       title: "GRAND FINALE",
//       teamA: "SF Winner 1",
//       teamB: "SF Winner 2",
//       date: "SUNDAY - 12 NOV 7:00 PM",
//       venue: "National Stadium"
//     }
//   ];

//   const scrollContainerRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cardWidth, setCardWidth] = useState(0);

//   // Always show 3 cards
//   const visibleCards = 3;
//   const totalPages = Math.ceil(matches.length / visibleCards);

//   // Calculate card width based on container width
//   useEffect(() => {
//     const updateCardWidth = () => {
//       if (scrollContainerRef.current) {
//         const containerWidth = scrollContainerRef.current.offsetWidth;
//         const gap = 16; // gap-4 = 16px
//         const totalGap = gap * (visibleCards - 1);
//         const calculatedWidth = (containerWidth - totalGap) / visibleCards;
//         setCardWidth(calculatedWidth);
//       }
//     };

//     updateCardWidth();
//     window.addEventListener('resize', updateCardWidth);
//     return () => window.removeEventListener('resize', updateCardWidth);
//   }, []);

//   const scrollToIndex = (index) => {
//     if (scrollContainerRef.current && cardWidth > 0) {
//       const gap = 16;
//       const scrollPosition = index * (cardWidth + gap) * visibleCards;
      
//       scrollContainerRef.current.scrollTo({
//         left: scrollPosition,
//         behavior: 'smooth'
//       });
//       setCurrentIndex(index);
//     }
//   };

//   const scrollNext = () => {
//     const nextIndex = (currentIndex + 1) % totalPages;
//     scrollToIndex(nextIndex);
//   };

//   const scrollPrev = () => {
//     const prevIndex = (currentIndex - 1 + totalPages) % totalPages;
//     scrollToIndex(prevIndex);
//   };

//   return (
//     <section className="w-full py-12 pb-0">
//       {/* Section Heading - Outside the background */}
//       <div className="w-full px-4 sm:px-6 lg:px-8 mb-8">
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-4 md:mb-6 text-center">
//           Upcoming Matches
//         </h2>
//         <div className="w-20 md:w-24 h-1 bg-secondary-light mx-auto"></div>
//       </div>

//       {/* Background Section - Full width with equal top and bottom padding */}
//       <div className="relative bg-cover bg-center bg-no-repeat w-full" style={{ 
//         backgroundImage: "url('./assets/Landing site match schedule bg img.png')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center center'
//       }}>
//         <div className="absolute inset-0"></div>
        
//         {/* Main content container with equal top and bottom padding */}
//         <div className="relative z-10 w-full px-2 sm:px-4 lg:px-8 py-12 md:py-16">
//           <div className="flex justify-center w-full">
//             <div className="relative w-full">
              
//               {/* Scrolling Container - Full width */}
//               <div 
//                 ref={scrollContainerRef}
//                 className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory w-full"
//                 style={{ 
//                   scrollbarWidth: 'none', 
//                   msOverflowStyle: 'none',
//                   overflowY: 'hidden'
//                 }}
//               >
//                 {matches.map((match, index) => (
//                   <motion.div 
//                     key={match.id}
//                     className="flex-shrink-0 relative bg-[#29066d] rounded-lg shadow-lg overflow-hidden border-2 border-white snap-center"
//                     style={{ 
//                       width: cardWidth > 0 ? `${cardWidth}px` : '300px',
//                       height: 'fit-content'
//                     }}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     viewport={{ once: true }}
//                   >
//                     {/* Pattern on top with heading */}
//                     <div className="h-12 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('./assets/Match-1.png')" }}>
//                       <h3 className="text-lg md:text-xl text-black font-bold px-2 text-center" style={{ fontFamily: 'var(--font-jaturat)' }}>{match.title}</h3>
//                     </div>
                    
//                     <div className="p-4 md:p-6">
//                       {/* Teams with logos */}
//                       <div className="flex items-center justify-between mb-6">
//                         <div className="flex flex-col items-center flex-1">
//                           <motion.div 
//                             className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2"
//                             whileHover={{ scale: 1.1 }}
//                           >
//                             <img 
//                               src="./assets/Logo CPKL.png" 
//                               alt={match.teamA} 
//                               className="w-16 h-16 object-contain"
//                             />
//                           </motion.div>
//                           <span className="text-white text-sm font-semibold text-center px-1" style={{ fontFamily: 'var(--font-poppins)' }}>{match.teamA}</span>
//                         </div>
                        
//                         {/* Special VS Design */}
//                         <div className="mx-2 flex items-center justify-center relative">
//                           <motion.div 
//                             className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-300 relative z-10"
//                             whileHover={{ scale: 1.1 }}
//                           >
//                             <span className="text-[#29066d] font-bold text-sm" style={{ fontFamily: 'var(--font-jaturat)' }}>VS</span>
//                           </motion.div>
//                         </div>
                        
//                         <div className="flex flex-col items-center flex-1">
//                           <motion.div 
//                             className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2"
//                             whileHover={{ scale: 1.1 }}
//                           >
//                             <img 
//                               src="./assets/Logo CPKL.png" 
//                               alt={match.teamB} 
//                               className="w-16 h-16 object-contain"
//                             />
//                           </motion.div>
//                           <span className="text-white text-sm font-semibold text-center px-1" style={{ fontFamily: 'var(--font-poppins)' }}>{match.teamB}</span>
//                         </div>
//                       </div>

//                       {/* Match details - Stacked layout */}
//                       <div className="text-center space-y-2" style={{ fontFamily: 'var(--font-poppins)' }}>
//                         <div className="text-white font-bold text-lg px-1">
//                           {match.date}
//                         </div>
//                         <div className="text-white text-sm px-1">{match.venue}</div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Navigation Buttons - Reduced spacing from matches cards */}
//               <div className="flex justify-center items-center gap-6 mt-8">
//                 <button 
//                   onClick={scrollPrev}
//                   className="bg-white text-[#29066d] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-300 border-2 border-[#29066d]"
//                   aria-label="Previous matches"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
                
//                 {/* Page Indicators */}
//                 <div className="flex gap-2 mx-4">
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => scrollToIndex(i)}
//                       className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                         i === currentIndex ? 'bg-[#29066d]' : 'bg-gray-400'
//                       }`}
//                       aria-label={`Go to page ${i + 1}`}
//                     />
//                   ))}
//                 </div>
                
//                 <button 
//                   onClick={scrollNext}
//                   className="bg-white text-[#29066d] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-300 border-2 border-[#29066d]"
//                   aria-label="Next matches"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Hide scrollbar for webkit browsers */}
//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// }

// export default MatchesSection;






// 'use client';
// import { useState, useEffect } from 'react';

// const MatchesSection = () => {
//   const matches = [
//     {
//       id: 1,
//       title: "Match 1",
//       teamA: "TBD",
//       teamB: "TBD",
//       teamALogo: "/assets/tbd.png",
//       teamBLogo: "/assets/tbd.png",
//       date: "Date and Day TBD",
//       venue: "Stadium TBD"
//     },
//     {
//       id: 2,
//       title: "Match 2", 
//       teamA: "TBD",
//       teamB: "TBD",
//       teamALogo: "/assets/tbd.png",
//       teamBLogo: "/assets/tbd.png",
//       date: "Date and Day TBD",
//       venue: "Stadium TBD"
//     },
//     {
//       id: 3,
//       title: "Match 3",
//       teamA: "TBD",
//       teamB: "TBD",
//       teamALogo: "/assets/tbd.png",
//       teamBLogo: "/assets/tbd.png",
//       date: "Date and Day TBD",
//       venue: "Stadium TBD"
//     },
//     {
//       id: 4,
//       title: "Match 4",
//       teamA: "TBD",
//       teamB: "TBD",
//       teamALogo: "/assets/tbd.png",
//       teamBLogo: "/assets/tbd.png",
//       date: "Date and Day TBD",
//       venue: "Stadium TBD"
//     },
//     {
//       id: 5,
//       title: "Match 5",
//       teamA: "TBD",
//       teamB: "TBD",
//       teamALogo: "/assets/tbd.png",
//       teamBLogo: "/assets/tbd.png",
//       date: "Date and Day TBD",
//       venue: "Stadium TBD"
//     },
//     {
//       id: 6,
//       title: "Match 6",
//       teamA: "TBD",
//       teamB: "TBD",
//       teamALogo: "/assets/tbd.png",
//       teamBLogo: "/assets/tbd.png",
//       date: "Date and Day TBD",
//       venue: "Stadium TBD"
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [cardsPerView, setCardsPerView] = useState(3);

//   // Update cards per view based on screen size
//   useEffect(() => {
//     const updateCardsPerView = () => {
//       if (window.innerWidth < 768) {
//         setCardsPerView(1);
//       } else if (window.innerWidth < 1024) {
//         setCardsPerView(2);
//       } else {
//         setCardsPerView(3);
//       }
//     };

//     updateCardsPerView();
//     window.addEventListener('resize', updateCardsPerView);
//     return () => window.removeEventListener('resize', updateCardsPerView);
//   }, []);

//   // Auto carousel every 3 seconds
//   useEffect(() => {
//     if (!isAutoPlaying) return;

//     const interval = setInterval(() => {
//       handleNext();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [currentIndex, isAutoPlaying, cardsPerView]);

//   const handleNext = () => {
//     setCurrentIndex(prev => {
//       if (prev + 1 >= matches.length - cardsPerView + 1) {
//         return 0; // Loop back to start
//       }
//       return prev + 1;
//     });
//   };

//   const handlePrev = () => {
//     setCurrentIndex(prev => {
//       if (prev === 0) {
//         return matches.length - cardsPerView; // Loop to end
//       }
//       return prev - 1;
//     });
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   // Get visible cards for current index
//   const getVisibleCards = () => {
//     const endIndex = currentIndex + cardsPerView;
//     if (endIndex > matches.length) {
//       return [
//         ...matches.slice(currentIndex),
//         ...matches.slice(0, endIndex - matches.length)
//       ];
//     }
//     return matches.slice(currentIndex, endIndex);
//   };

//   // Pause auto-play on hover
//   const handleMouseEnter = () => setIsAutoPlaying(false);
//   const handleMouseLeave = () => setIsAutoPlaying(true);

//   const totalPages = Math.max(1, matches.length - cardsPerView + 1);

//   return (
//     <section className="w-full py-12 pb-0">
//       {/* Section Heading - Outside the background */}
//       <div className="w-full px-4 sm:px-6 lg:px-8 mb-8">
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-4 md:mb-6 text-center">
//           Upcoming Matches
//         </h2>
//         <div className="w-20 md:w-24 h-1 bg-secondary-light mx-auto"></div>
//       </div>

//       {/* Background Section - Full width */}
//       <div className="relative bg-cover bg-center bg-no-repeat w-full" style={{ 
//         backgroundImage: "url('./assets/Landing site match schedule bg img.png')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center center'
//       }}>
//         <div className="absolute inset-0"></div>
        
//         {/* Main content container */}
//         <div className="relative z-10 w-full py-12 md:py-16">
//           <div 
//             className="relative w-full overflow-hidden"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             {/* Carousel Container - Full width */}
//             <div className="w-full">
//               <div
//                 key={currentIndex}
//                 className="flex justify-center gap-4 px-4 sm:px-6 lg:px-8"
//               >
//                 {getVisibleCards().map((match, index) => (
//                   <div 
//                     key={`${match.id}-${currentIndex}-${index}`}
//                     className="flex-shrink-0 relative bg-[#29066d] rounded-lg shadow-lg overflow-hidden border-2 border-white"
//                     style={{ 
//                       width: cardsPerView === 1 ? '95%' : 
//                              cardsPerView === 2 ? '48%' : '31.5%',
//                       maxWidth: cardsPerView === 1 ? '400px' : 'none',
//                       minWidth: cardsPerView === 1 ? '300px' : '280px',
//                       height: 'fit-content'
//                     }}
//                   >
//                     {/* Pattern on top with heading */}
//                     <div className="h-12 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('./assets/Match-1.png')" }}>
//                       <h3 className="text-lg md:text-xl text-black font-bold px-2 text-center" style={{ fontFamily: 'var(--font-jaturat)' }}>{match.title}</h3>
//                     </div>
                    
//                     <div className="p-4 md:p-6">
//                       {/* Teams with different logos */}
//                       <div className="flex items-center justify-between mb-6">
//                         <div className="flex flex-col items-center flex-1">
//                           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 border-2 border-gray-300">
//                             <img 
//                               src={match.teamALogo} 
//                               alt={match.teamA} 
//                               className="w-14 h-14 object-contain"
//                             />
//                           </div>
//                           <span className="text-white text-sm font-semibold text-center px-1" style={{ fontFamily: 'var(--font-poppins)' }}>{match.teamA}</span>
//                         </div>
                        
//                         {/* Special VS Design */}
//                         <div className="mx-2 flex items-center justify-center relative">
//                           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-300 relative z-10">
//                             <span className="text-[#29066d] font-bold text-sm" style={{ fontFamily: 'var(--font-jaturat)' }}>VS</span>
//                           </div>
//                         </div>
                        
//                         <div className="flex flex-col items-center flex-1">
//                           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 border-2 border-gray-300">
//                             <img 
//                               src={match.teamBLogo} 
//                               alt={match.teamB} 
//                               className="w-14 h-14 object-contain"
//                             />
//                           </div>
//                           <span className="text-white text-sm font-semibold text-center px-1" style={{ fontFamily: 'var(--font-poppins)' }}>{match.teamB}</span>
//                         </div>
//                       </div>

//                       {/* Match details */}
//                       <div className="text-center space-y-2" style={{ fontFamily: 'var(--font-poppins)' }}>
//                         <div className="text-white font-bold text-lg px-1">
//                           {match.date}
//                         </div>
//                         <div className="text-white text-sm px-1">{match.venue}</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Navigation Buttons */}
//               <div className="flex justify-center items-center gap-6 mt-8">
//                 <button 
//                   onClick={handlePrev}
//                   className="bg-white text-[#29066d] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-300 border-2 border-[#29066d]"
//                   aria-label="Previous matches"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
                
//                 {/* Page Indicators */}
//                 <div className="flex gap-2 mx-4">
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => goToSlide(i)}
//                       className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//                         i === currentIndex ? 'bg-[#29066d]' : 'bg-gray-400'
//                       }`}
//                       aria-label={`Go to page ${i + 1}`}
//                     />
//                   ))}
//                 </div>
                
//                 <button 
//                   onClick={handleNext}
//                   className="bg-white text-[#29066d] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-300 border-2 border-[#29066d]"
//                   aria-label="Next matches"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default MatchesSection;







// MatchesSection.jsx
'use client';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const MatchesSection = () => {
  // --- DATA (each match includes optional logo paths; defaults to /assets/tbd.png) ---
  const baseMatches = [
    { id: 1, 
      title: "Match 1", 
      teamA: "TBD", 
      teamB: "TBD", 
      teamA_logo: "/assets/tbd.png", 
      teamB_logo: "/assets/tbd.png", 
      date: "Date and Day TBD", 
      venue: "Stadium TBD" },
    { id: 2, 
      title: "Match 2", 
      teamA: "TBD", 
      teamB: "TBD", 
      teamA_logo: "/assets/tbd.png", 
      teamB_logo: "/assets/tbd.png", 
      date: "Date and Day TBD", 
      venue: "Stadium TBD" },
    { id: 3, 
      title: "Match 3", 
      teamA: "TBD", 
      teamB: "TBD", 
      teamA_logo: "/assets/tbd.png", 
      teamB_logo: "/assets/tbd.png", 
      date: "Date and Day TBD", 
      venue: "Stadium TBD" },
    { id: 4, 
      title: "Match 4", 
      teamA: "TBD", 
      teamB: "TBD", 
      teamA_logo: "/assets/tbd.png", 
      teamB_logo: "/assets/tbd.png", 
      date: "Date and Day TBD", 
      venue: "Stadium TBD" },
    { id: 5, 
      title: "Match 5", 
      teamA: "TBD", 
      teamB: "TBD", 
      teamA_logo: "/assets/tbd.png", 
      teamB_logo: "/assets/tbd.png", 
      date: "Date and Day TBD", 
      venue: "Stadium TBD" },
    { id: 6, 
      title: "Match 6", 
      teamA: "TBD", 
      teamB: "TBD", 
      teamA_logo: "/assets/tbd.png", 
      teamB_logo: "/assets/tbd.png", 
      date: "Date and Day TBD", 
      venue: "Stadium TBD" },
  ];

  // duplicate the list to allow seamless infinite scroll
  const matches = [...baseMatches, ...baseMatches];

  const scrollContainerRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);

  const GAP = 16; // gap between cards (px)
  const AUTO_MS = 3000; // 3 seconds

  // update visibleCards based on window width (responsive)
  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      // breakpoint: under 768 show 1 card, else 3
      setVisibleCards(w < 768 ? 1 : 3);
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  // Calculate card width on resize or when visibleCards changes
  useEffect(() => {
    const updateCardWidth = () => {
      if (!scrollContainerRef.current) return;
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const totalGap = GAP * (visibleCards - 1);
      const w = Math.max(120, (containerWidth - totalGap) / visibleCards); // fallback min width
      setCardWidth(w);
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, [visibleCards]);

  // helper: step in px = single card step (we scroll by 1 card)
  const getStep = () => cardWidth + GAP;

  // Init scroll position to the start of the first (non-duplicated) block
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // ensure starting at offset 0
    el.scrollLeft = 0;
    setCurrentDotIndex(0);
  }, [cardWidth, visibleCards]);

  // Auto scroll interval
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || cardWidth === 0) return;

    const totalOriginalItems = baseMatches.length;
    const step = getStep();

    const autoTick = () => {
      // smooth scroll by one card
      el.scrollTo({
        left: el.scrollLeft + step,
        behavior: 'smooth'
      });
    };

    autoScrollRef.current && clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      autoTick();
    }, AUTO_MS);

    // listener to reset when we've scrolled into duplicated region
    const onScroll = () => {
      // when scrollLeft crosses original length, snap back by subtracting original width
      const originalWidth = totalOriginalItems * step;
      if (el.scrollLeft >= originalWidth) {
        // calculate remainder beyond originalWidth
        const overflow = el.scrollLeft - originalWidth;
        // reset to overflow (instant, no smooth) so user doesn't see jump
        el.scrollLeft = overflow;
      } else if (el.scrollLeft <= 0) {
        // handle small negative / left edge: safety (not expected)
      }

      // update visible dot index (index of first visible original card)
      // compute index in original set
      const approxIndex = Math.round(el.scrollLeft / step) % totalOriginalItems;
      const normalized = ((approxIndex % totalOriginalItems) + totalOriginalItems) % totalOriginalItems;
      setCurrentDotIndex(normalized);
    };

    el.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearInterval(autoScrollRef.current);
      el.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardWidth, visibleCards]);

  // Manual navigation: move by one card
  const scrollBy = (dir = 1) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const step = getStep();
    // clear and restart auto-scroll to give user control
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = setInterval(() => {
        el.scrollTo({ left: el.scrollLeft + step, behavior: 'smooth' });
      }, AUTO_MS);
    }

    el.scrollTo({ left: el.scrollLeft + dir * step, behavior: 'smooth' });
  };

  // Jump to a page (for dots) — we interpret page index as which first-card index in original group
  const jumpToIndex = (index) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const totalOriginalItems = baseMatches.length;
    const step = getStep();
    // ensure index within original range
    const safeIndex = ((index % totalOriginalItems) + totalOriginalItems) % totalOriginalItems;
    // set scrollLeft to that index (within original block)
    el.scrollTo({ left: safeIndex * step, behavior: 'smooth' });
    setCurrentDotIndex(safeIndex);
  };

  return (
    <section className="w-full py-12 pb-0">
      <div className="w-full px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-4 md:mb-6 text-center">
          Upcoming Matches
        </h2>
        <div className="w-20 md:w-24 h-1 bg-secondary-light mx-auto"></div>
      </div>

      <div className="relative bg-cover bg-center bg-no-repeat w-full" style={{
        backgroundImage: "url('./assets/Landing site match schedule bg img.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}>
        <div className="absolute inset-0"></div>
        <div className="relative z-10 w-full px-2 sm:px-4 lg:px-8 py-12 md:py-16">
          <div className="flex justify-center w-full">
            <div className="relative w-full">
              {/* Scrolling Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto overflow-y-hidden w-full"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {matches.map((match, index) => (
                  <motion.div
                    key={`${match.id}-${index}`} // duplicated items need unique key
                    className="flex-shrink-0 relative bg-[#29066d] rounded-lg shadow-lg overflow-hidden border-2 border-white"
                    style={{
                      width: cardWidth > 0 ? `${cardWidth}px` : '300px',
                      height: 'fit-content',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index % baseMatches.length) * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="h-12 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('./assets/Match-1.png')" }}>
                      <h3 className="text-lg md:text-xl text-black font-bold px-2 text-center" style={{ fontFamily: 'var(--font-jaturat)' }}>{match.title}</h3>
                    </div>

                    <div className="p-4 md:p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex flex-col items-center flex-1">
                          <motion.div
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={match.teamA_logo || '/assets/tbd.png'}
                              alt={match.teamA}
                              className="w-16 h-16 object-contain"
                            />
                          </motion.div>
                          <span className="text-white text-sm font-semibold text-center px-1" style={{ fontFamily: 'var(--font-poppins)' }}>{match.teamA}</span>
                        </div>

                        <div className="mx-2 flex items-center justify-center relative">
                          <motion.div
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-300 relative z-10"
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="text-[#29066d] font-bold text-sm" style={{ fontFamily: 'var(--font-jaturat)' }}>VS</span>
                          </motion.div>
                        </div>

                        <div className="flex flex-col items-center flex-1">
                          <motion.div
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={match.teamB_logo || '/assets/tbd.png'}
                              alt={match.teamB}
                              className="w-16 h-16 object-contain"
                            />
                          </motion.div>
                          <span className="text-white text-sm font-semibold text-center px-1" style={{ fontFamily: 'var(--font-poppins)' }}>{match.teamB}</span>
                        </div>
                      </div>

                      <div className="text-center space-y-2" style={{ fontFamily: 'var(--font-poppins)' }}>
                        <div className="text-white font-bold text-lg px-1">
                          {match.date}
                        </div>
                        <div className="text-white text-sm px-1">{match.venue}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center items-center gap-6 mt-8">
                <button
                  onClick={() => scrollBy(-1)}
                  className="bg-white text-[#29066d] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-300 border-2 border-[#29066d]"
                  aria-label="Previous matches"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Page Indicators based on original items (not duplicated) */}
                <div className="flex gap-2 mx-4">
                  {Array.from({ length: baseMatches.length }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => jumpToIndex(i)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        i === currentDotIndex ? 'bg-[#29066d]' : 'bg-gray-400'
                      }`}
                      aria-label={`Go to match ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => scrollBy(1)}
                  className="bg-white text-[#29066d] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors duration-300 border-2 border-[#29066d]"
                  aria-label="Next matches"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar for webkit browsers */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* keep scrollbar hidden for the main container */
        .flex.gap-4.overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default MatchesSection;
