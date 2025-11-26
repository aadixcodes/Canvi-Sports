
'use client';
import { useState, useRef, useEffect } from 'react';

const EventsPage = () => {
  const [activeEvent, setActiveEvent] = useState('Selection Trials');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageCache, setImageCache] = useState({}); // New cache state
  const dropdownRef = useRef(null);

  // Define different image sets for each event
  const eventImages = {
    'Selection Trials': [
      '/assets/events/e1.webp',
      '/assets/events/e2.webp',
      '/assets/events/e3.webp',
      '/assets/events/e4.webp',
      '/assets/events/e5.webp',
      '/assets/events/e6.webp',
      '/assets/events/e7.webp',
      '/assets/events/e8.webp',
      '/assets/events/e9.webp',
      '/assets/events/e10.webp',
      '/assets/events/e11.webp',
      '/assets/events/e12.jpg',
      '/assets/events/e13.jpg'
    ],
    'League Mega Launch': [],
    'Jersey Launch & Auction': [],
    'The League': [],
    'Closing Ceremony': []
  };

  // Event descriptions for empty states
  const eventDescriptions = {
    'Selection Trials': "Selection Trials Images",
    'League Mega Launch': "League Mega Launch Images", 
    'Jersey Launch & Auction': "Jersey Launch & Auction Images",
    'The League': "The League Images",
    'Closing Ceremony': "Closing Ceremony Images"
  };

  // Preload images function
  const preloadImages = (imageUrls) => {
    imageUrls.forEach((src) => {
      // Only preload if not already cached
      if (!imageCache[src]) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImageCache(prev => ({
            ...prev,
            [src]: true
          }));
        };
      }
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Preload images when component mounts and when active event changes
  useEffect(() => {
    const currentImages = eventImages[activeEvent];
    if (currentImages && currentImages.length > 0) {
      preloadImages(currentImages);
    }
  }, [activeEvent]);

  // Get current images based on active event
  const currentImages = eventImages[activeEvent];

  const handleEventSelect = async (event) => {
    if (event === activeEvent) return;
    
    setIsLoading(true);
    
    // Preload images for the new event before switching
    const newEventImages = eventImages[event];
    if (newEventImages && newEventImages.length > 0) {
      await preloadImages(newEventImages);
    }
    
    setActiveEvent(event);
    setIsDropdownOpen(false);
    
    // Shorter loading timeout since we're preloading
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle image load with better error handling
  const handleImageLoad = (event, index, imageSrc) => {
    setLoadedImages(prev => ({
      ...prev,
      [`${event}-${index}`]: true
    }));
    
    // Add to cache
    setImageCache(prev => ({
      ...prev,
      [imageSrc]: true
    }));
  };

  // Handle image error
  const handleImageError = (event, index, imageSrc) => {
    console.warn(`Failed to load image: ${imageSrc}`);
    setLoadedImages(prev => ({
      ...prev,
      [`${event}-${index}`]: true // Mark as loaded to hide skeleton
    }));
  };

  // Improved Skeleton Loading Component
  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[...Array(6)].map((_, index) => (
        <div 
          key={index}
          className="bg-gray-200 rounded-lg shadow-xl overflow-hidden aspect-square animate-pulse"
        >
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty State Component
  const EmptyState = ({ event }) => (
    <div className="col-span-full py-16 md:py-24 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-main text-gray-600 mb-4">
          No {eventDescriptions[event]} Available
        </h3>
        <p className="text-lg text-gray-500 font-sub max-w-md mx-auto">
          We're currently gathering amazing moments from our {eventDescriptions[event].toLowerCase()}. 
          Stay tuned for exciting updates and photos coming soon!
        </p>
      </div>
    </div>
  );

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
              EVENTS
            </h1>
          </div>
        </div>
      </section>

      {/* Events Header Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-6 md:mb-8">
              Celebrating Kabaddi's Finest Moments
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-sub">
              Experience the complete CPKL journey through our spectacular events. From talent discovery 
              to grand celebrations, each event marks a milestone in our kabaddi legacy.
            </p>
          </div>
        </div>
      </section>

      {/* Dropdown Button Section */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[50vw] min-w-[350px]" ref={dropdownRef}>
              {/* Main Dropdown Button */}
              <button 
                onClick={toggleDropdown}
                disabled={isLoading}
                className="w-full px-8 py-4 bg-[#180444] text-white font-semibold rounded-lg border-2 border-[#180444] transition-colors duration-300 shadow-md text-lg flex items-center justify-between hover:bg-[#2a0a66] hover:border-[#2a0a66] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{activeEvent}</span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-10 overflow-hidden">
                  {Object.keys(eventImages).map((event) => (
                    <button
                      key={event}
                      onClick={() => handleEventSelect(event)}
                      disabled={isLoading}
                      className={`w-full px-6 py-4 text-left transition-all duration-200 border-b border-gray-100 last:border-b-0 ${
                        activeEvent === event 
                          ? 'bg-[#180444] text-white' 
                          : 'text-gray-800 hover:bg-[#180444] hover:text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {event}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="py-12 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <SkeletonGrid />
          ) : currentImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentImages.map((imageSrc, index) => {
                const isLoaded = loadedImages[`${activeEvent}-${index}`];
                const isCached = imageCache[imageSrc];
                
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border-2 border-gray-200 flex items-center justify-center bg-gray-100 p-0 relative"
                  >
                    {/* Show skeleton only if image is not loaded AND not cached */}
                    {!isLoaded && !isCached && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center">
                        <div className="text-gray-400 text-sm">Loading...</div>
                      </div>
                    )}
                    
                    {/* Image with priority for first few images */}
                    <img 
                      src={imageSrc} 
                      alt={`CPKL ${activeEvent} Image ${index + 1}`} 
                      className={`w-full h-full object-contain min-w-full min-h-full transition-opacity duration-300 ${
                        (isLoaded || isCached) ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(activeEvent, index, imageSrc)}
                      onError={() => handleImageError(activeEvent, index, imageSrc)}
                      loading={index < 3 ? "eager" : "lazy"} // Load first 3 images eagerly
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState event={activeEvent} />
          )}
        </div>
      </section>
    </>
  )
}

export default EventsPage;