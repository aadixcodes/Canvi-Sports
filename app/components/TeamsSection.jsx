'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TeamsSection = () => {
  const teams = [
    { id: 1, image: "./assets/logos/team-1.jpg" },
    { id: 2, image: "./assets/logos/team-2.jpg" },
    { id: 3, image: "./assets/logos/team-3.jpg" },
    { id: 4, image: "./assets/logos/team-4.jpg" },
    { id: 5, image: "./assets/logos/team-5.jpg" },
    { id: 6, image: "./assets/logos/team-6.jpg" },
    { id: 7, image: "./assets/logos/team-7.jpg" },
    { id: 8, image: "./assets/logos/team-8.jpg" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive items to show
  useEffect(() => {
    const updateResponsiveSettings = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        // Mobile: Show 1 team
        setItemsToShow(1);
        setIsMobile(true);
      } else if (width >= 768 && width < 1024) {
        // Tablet: Show 2 teams
        setItemsToShow(2);
        setIsMobile(false);
      } else if (width >= 1024 && width < 1350) {
        // Large Tablet: Show 3 teams
        setItemsToShow(3);
        setIsMobile(false);
      } else {
        // Desktop: Show 4 teams
        setItemsToShow(4);
        setIsMobile(false);
      }
    };

    updateResponsiveSettings();
    window.addEventListener('resize', updateResponsiveSettings);
    return () => window.removeEventListener('resize', updateResponsiveSettings);
  }, []);

  // Auto carousel for all devices - one by one sliding
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMobile) {
        // Mobile: Simple loop through all items one by one
        setCurrentIndex((prevIndex) => 
          prevIndex === teams.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        // Desktop/Tablet: Move one item at a time
        setCurrentIndex((prevIndex) => {
          // If we're at the end, loop back to start
          if (prevIndex >= teams.length - itemsToShow) {
            return 0;
          }
          return prevIndex + 1;
        });
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isMobile, itemsToShow, teams.length]);

  // Calculate transform for smooth sliding
  const calculateTransform = () => {
    if (isMobile) {
      // Mobile: 100% per slide
      return currentIndex * 100;
    } else {
      // Desktop/Tablet: Calculate based on item width for one-by-one movement
      const itemWidth = 100 / itemsToShow;
      return currentIndex * itemWidth;
    }
  };

  const getCardWidth = () => {
    if (isMobile) {
      return '100%'; // Full width on mobile
    }
    return `calc(${100 / itemsToShow}% - ${(itemsToShow - 1) * 1}rem / ${itemsToShow})`;
  };

  // Get visible teams based on current index
  const getVisibleTeams = () => {
    if (isMobile) {
      // Mobile: Show only one team at current index
      return [teams[currentIndex]];
    } else {
      // Desktop/Tablet: Show multiple teams starting from current index
      const visibleTeams = [];
      for (let i = 0; i < itemsToShow; i++) {
        const index = (currentIndex + i) % teams.length;
        visibleTeams.push(teams[index]);
      }
      return visibleTeams;
    }
  };

  return (
    <section className="py-2">
      <div className="relative py-6 md:py-12 lg:py-16 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('./assets/team-bg.png')" }}>
        {/* Section Heading */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 md:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-4 md:mb-6 text-center">
            Our Teams
          </h2>
          <div className="w-16 md:w-20 lg:w-24 h-1 bg-secondary-light mx-auto"></div>
        </div>

        {/* Teams Carousel */}
        <div className="relative z-10 mx-auto px-2 sm:px-4 lg:px-8">
          <div className="relative overflow-hidden px-2 sm:px-4 lg:px-8">
            {/* Carousel Track */}
            <div className="overflow-hidden">
              <motion.div 
                className={`flex ${isMobile ? 'gap-0' : 'gap-3 md:gap-4 lg:gap-6'}`}
                animate={{ x: `-${calculateTransform()}%` }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.5
                }}
              >
                {/* Render all teams but only visible ones will show based on transform */}
                {teams.map((team) => (
                  <motion.div
                    key={team.id}
                    className="flex-shrink-0"
                    style={{ width: getCardWidth() }}
                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`p-2 md:p-3 rounded-lg hover:shadow-xl transition-shadow duration-300 h-full mx-auto overflow-hidden bg-white bg-opacity-90 ${isMobile ? 'mx-1' : ''}`}>
                      <img 
                        src={team.image} 
                        alt={`Team ${team.id}`}
                        className="w-full h-72 object-cover rounded-md"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Dots Indicator - Only show on mobile */}
          {isMobile && (
            <div className="flex justify-center mt-4 md:mt-6 space-x-2">
              {teams.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-[#29066d] scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to team ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Group Dots Indicator - For desktop/tablet */}
          {!isMobile && (
            <div className="flex justify-center mt-4 md:mt-6 space-x-2">
              {Array.from({ length: teams.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-[#29066d] scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to team ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TeamsSection;