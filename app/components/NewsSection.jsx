// NewsSection.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';

const NewsSection = () => {
  // Image data array with paths and links
  const newsImages = [
    { 
      "path": "/assets/news/1.png",
      "link": "https://english.loktej.com/article/22183/cpkl-season-2-set-for-a-grand-unveiling-in-jaipur-%E2%80%93-the-road-to-dubai-begins#google_vignette",
    },
    { 
      "path": "/assets/news/2.png",
      "link": "https://www.inkhabar.com/sports/the-grand-launch-of-cpkl-season-2-is-set-to-take-place-in-jaipur-this-time-the-competition-will-be-held-in-dubai-108854/",
    },
    { 
      "path": "/assets/news/3.png",
      "link": "https://www.hindustanmetro.com/cpkl-season-2-set-for-a-grand-unveiling-in-jaipur-the-road-to-dubai-begins/",
    },
    { 
      "path": "/assets/news/4.png",
      "link": "https://up18news.com/category/sports/",
    },
    { 
      "path": "/assets/news/5.png",
      "link": "https://english.loktej.com/article/21709/cpkl-season-2-heads-to-jaipur-for-its-last-trial-%E2%80%94-kabaddi-legend-pardeep-narwal-to-join-the-action",
    },
    { 
      "path": "/assets/news/6.png",
      "link": "https://m.dailyhunt.in/news/india/english/loktej%2Benglish-epaper-loktejen/cpkl%2Bseason%2B2%2Bheads%2Bto%2Bjaipur%2Bfor%2Bits%2Blast%2Btrial%2Bkabaddi%2Blegend%2Bpardeep%2Bnarwal%2Bto%2Bjoin%2Bthe%2Baction-newsid-n685075022?sm=Y",
    },
    { 
      "path": "/assets/news/7.png",
      "link": "https://rajasthanjournal.com/press-release/cpkl-season-2-heads-to-jaipur-for-its-last-trial-kabaddi-legend-pardeep-narwal-to-join-the-action/",
    },
    { 
      "path": "/assets/news/8.png",
      "link": "https://up-patrika.com/lifestyle/cpkl-season-2-heads-to-jaipur-for-its-last-trial-kabaddi-legend-pardeep-narwal-to-join-the-action/",
    },
    { 
      "path": "/assets/news/9.png",
      "link": "https://www.loktej.com/article/143617/last-trial-of-cpkl-season-2-in-jaipur-kabaddis",
    },
    { 
      "path": "/assets/news/10.png",
      "link": "https://jodhpurreporter.com/hindi/index.php/2025/10/14/last-trial-of-cpkl-season-2-in-jaipur-kabaddis-dive-king-pradeep-narwal-will-also-participate-2/",
    },
    { 
      "path": "/assets/news/11.png",
      "link": "https://hindi.rajasthanexpress.in/2025/10/14/cpkl-%e0%a4%b8%e0%a5%80%e0%a4%9c%e0%a4%bc%e0%a4%a8-2-%e0%a4%95%e0%a4%be-%e0%a4%86%e0%a4%96%e0%a4%bc%e0%a4%bf%e0%a4%b0%e0%a5%80-%e0%a4%9f%e0%a5%8d%e0%a4%b0%e0%a4%be%e0%a4%af%e0%a4%b2-%e0%a4%9c%e0%a4%af/",
    },
    { 
      "path": "/assets/news/12.png",
      "link": "https://www.loktej.com/article/143617/last-trial-of-cpkl-season-2-in-jaipur-kabaddis?utm_source=JioNews&utm_medium=referral&utm_campaign=JioNews",
    },
    { 
      "path": "/assets/news/13.png",
      "link": "https://www.hindusthansamachar.in/Encyc/2025/11/9/Canvi-Premier-Kabaddi-League-Season-2-kicks-off.php",
    },
    { 
      "path": "/assets/news/14.png",
      "link": "https://www.khabredinraat.com/canvi-premier-kabaddi-league-season-2-kicks-off-in-jaipur/",
    },
    { 
      "path": "/assets/news/15.png",
      "link": "https://www.dailyrajasthannews.com/2025/11/grand-inauguration-of-canvi-premier.html",
    },
    { 
      "path": "/assets/news/16.png",
      "link": "https://dainik.bhaskar.com/8XCxGLtC9Xb",
    },
    { 
      "path": "/assets/news/17.png",
      "link": "https://www.patrika.com/jaipur-news/eight-teams-will-compete-in-the-kabaddi-league-matches-will-be-held-in-dubai-and-the-league-trophy-has-been-unveiled-20088818",
    },
    { 
      "path": "/assets/news/18.png",
      "link": "https://www.khaskhabar.com/local/rajasthan/jaipur-news/sports-news-the-grand-launch-of-the-canvy-premier-kabaddi-league-(cpkl)-season-2-was-held-in-jaipur-news-hindi-1-766460-KKN.html",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Handle responsive cards display
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total slides
  const totalSlides = Math.ceil(newsImages.length / cardsToShow);

  // Auto slide functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, totalSlides, isPaused]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  }, [currentIndex, totalSlides]);

  // Handle image click to redirect to news link
  const handleImageClick = (link) => {
    window.open(link, '_blank');
  };

  // Pause auto-slide on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="relative bg-cover bg-center bg-no-repeat" style={{ 
      backgroundImage: "url('./assets/landing site Latest news section bg.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }}>
      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        {/* Heading with equal spacing */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-main text-primary text-center mt-8 md:mt-0">
            Latest News
          </h2>
        </div>
        
        {/* Carousel Container */}
        <div 
          className="relative overflow-hidden mb-10 md:mb-16 lg:mb-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Carousel Track */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {newsImages.map((news, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / cardsToShow}%` }}
              >
                <div 
                  className="rounded-sm shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform"
                  onClick={() => handleImageClick(news.link)}
                >
                  <div 
                    className="h-64 md:h-80 bg-cover bg-center bg-no-repeat w-full relative flex flex-col justify-end" 
                    style={{ 
                      backgroundImage: `url('${news.path}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center center'
                    }}
                  >
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevSlide}
              className="bg-primary hover:bg-primary-dark text-black p-3 rounded-full shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              aria-label="Previous news"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="bg-primary hover:bg-primary-dark text-black p-3 rounded-full shadow-lg transition-all duration-300 transform  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              aria-label="Next news"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Navigation Buttons - Mobile */}
          <div className="flex md:hidden justify-center items-center mt-6 space-x-4">
            <button
              onClick={prevSlide}
              className="bg-primary hover:bg-primary-dark text-black p-3 rounded-full shadow-lg transition-all duration-300 transform  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              aria-label="Previous news"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="bg-primary hover:bg-primary-dark text-black p-3 rounded-full shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
              aria-label="Next news"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsSection;










// const NewsSection = () => {
//   return (
//     <section className="relative bg-cover bg-center bg-no-repeat" style={{ 
//       backgroundImage: "url('./assets/landing site Latest news section bg.png')",
//       backgroundSize: 'cover',
//       backgroundPosition: 'center center'
//     }}>
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
//         {/* Heading with equal spacing */}
//         <div className="mb-12 md:mb-16 lg:mb-20">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-main text-primary text-center mt-8 md:mt-0">
//             Latest News
//           </h2>
//         </div>
        
//         {/* Announce Soon Section - Show this when no real news */}
//         <div className="flex flex-col items-center justify-center py-16 md:py-24">
//           <div className="text-center max-w-2xl mx-auto">
            
//             {/* Main Text */}
//             <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 md:mb-6">
//               Announcement Coming Soon
//             </h3>
            
//             {/* Subtext */}
//             <p className="text-lg sm:text-xl md:text-2xl text-primary/80 leading-relaxed mb-6 md:mb-8">
//               Exciting news and updates are on the way. Stay tuned for the latest announcements!
//             </p>
            
//             {/* Decorative Line */}
//             <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8 md:mb-10"></div>
            
//             {/* Additional Info */}
//             <p className="text-base sm:text-lg text-primary/60 italic">
//               Follow us on social media to be the first to know
//             </p>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

// export default NewsSection;