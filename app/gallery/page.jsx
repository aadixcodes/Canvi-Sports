

'use client';
import { useState, useEffect, useRef, useCallback, memo } from 'react';

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState('pastSeason');
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageCache, setImageCache] = useState({});
  const [columns, setColumns] = useState(3);
  const imageRefs = useRef({});
  const containerRef = useRef(null);

  // Define different image sets for each category
  const imageSets = {
    auction: [],
    matchDay: [],
    team: [],
    megaLaunch: [],
    trials: [
      "/assets/gallery/trials/1.jpg",
      "/assets/gallery/trials/2.jpg",
      "/assets/gallery/trials/3.jpg",
      "/assets/gallery/trials/4.jpg",
      "/assets/gallery/trials/5.jpg",
      "/assets/gallery/trials/6.jpg",
      "/assets/gallery/trials/7.jpg",
      "/assets/gallery/trials/8.jpg",
      "/assets/gallery/trials/9.jpg",
      "/assets/gallery/trials/10.jpg",
      "/assets/gallery/trials/11.jpg",
      "/assets/gallery/trials/12.jpg",
      "/assets/gallery/trials/13.jpg",
      "/assets/gallery/trials/14.jpg",
      "/assets/gallery/trials/15.jpg",
      "/assets/gallery/trials/16.jpg",
      "/assets/gallery/trials/17.jpg",
      "/assets/gallery/trials/18.jpg",
      "/assets/gallery/trials/19.jpg",
      "/assets/gallery/trials/20.jpg",
      "/assets/gallery/trials/21.jpg",
      "/assets/gallery/trials/22.jpg",
      "/assets/gallery/trials/23.jpg",
    ],
    pastSeason: [
      '/assets/gallery/pastSeasons/ps1.JPG',
      '/assets/gallery/pastSeasons/ps2.JPG',
      '/assets/gallery/pastSeasons/ps3.JPG',
      '/assets/gallery/pastSeasons/ps4.JPG',
      '/assets/gallery/pastSeasons/ps5.JPG',
      '/assets/gallery/pastSeasons/ps6.JPG',
      '/assets/gallery/pastSeasons/ps7.JPG',
      '/assets/gallery/pastSeasons/ps8.JPG',
      '/assets/gallery/pastSeasons/ps9.JPG',
      '/assets/gallery/pastSeasons/ps10.JPG'
    ]
  };

  // Category display names
  const categoryDisplayNames = {
    auction: "Auction",
    matchDay: "Match Day", 
    megaLaunch: "Mega Launch",
    pastSeason: "Past Seasons",
    trials: "Trials"
  };

  // Category descriptions for empty states
  const categoryDescriptions = {
    auction: "Auction Images",
    matchDay: "Match Day Images", 
    megaLaunch: "Mega Launch Images",
    pastSeason: "Past Season Images",
    trials: "Trials Images"
  };

  // Get current images based on active category
  const currentImages = imageSets[activeCategory];

  // Preload images for better performance - useCallback to prevent recreating function
  const preloadImages = useCallback((imageUrls) => {
    imageUrls.forEach((src) => {
      if (!imageCache[src]) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImageCache(prev => ({ ...prev, [src]: true }));
        };
        img.onerror = () => {
          console.warn(`Failed to preload image: ${src}`);
          setImageCache(prev => ({ ...prev, [src]: false }));
        };
      }
    });
  }, [imageCache]);

  const handleButtonClick = async (category) => {
    if (category === activeCategory) return;
    
    setIsLoading(true);
    setActiveCategory(category);
    
    // Preload images for the new category
    preloadImages(imageSets[category]);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const getButtonClass = (category) => {
    const baseClass = "px-4 sm:px-6 py-2 font-semibold rounded-lg border-2 border-[#180444] transition-colors duration-300 shadow-md text-sm sm:text-base whitespace-nowrap";
    if (activeCategory === category) {
      return `${baseClass} bg-[#180444] text-white`;
    } else {
      return `${baseClass} bg-white text-[#180444] hover:bg-gray-50`;
    }
  };

  // Handle image load - useCallback to prevent recreating function
  const handleImageLoad = useCallback((category, index, src) => {
    const key = `${category}-${index}`;
    setLoadedImages(prev => {
      if (prev[key]) return prev;
      return { ...prev, [key]: true };
    });
    
    setImageCache(prev => {
      if (prev[src]) return prev;
      return { ...prev, [src]: true };
    });
  }, []);

  // Handle image error - useCallback to prevent recreating function
  const handleImageError = useCallback((category, index, src) => {
    console.warn(`Image failed to load: ${src}`);
    const key = `${category}-${index}`;
    setLoadedImages(prev => {
      if (prev[key]) return prev;
      return { ...prev, [key]: true };
    });
    
    setImageCache(prev => ({ ...prev, [src]: false }));
  }, []);

  // Responsive column calculation
  const updateColumns = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setColumns(1);
    } else if (width < 1024) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  }, []);

  // Initialize on component mount
  useEffect(() => {
    // Preload current category images
    preloadImages(currentImages);

    // Initialize loaded state for current category
    const initialLoadedState = {};
    currentImages.forEach((src, index) => {
      const key = `${activeCategory}-${index}`;
      initialLoadedState[key] = imageCache[src] || false;
    });
    setLoadedImages(initialLoadedState);

    // Set initial columns
    updateColumns();

    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Individual Image Component - Memoized to prevent unnecessary re-renders
  const ImageItem = memo(({ src, index, isLoaded, isCached, category }) => {
    const imageKey = `${category}-${index}`;
    
    return (
      <div 
        className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 border-2 border-gray-200 relative group"
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse flex items-center justify-center z-10">
            <div className="text-gray-400 text-sm">
              {isCached ? 'Loading...' : 'Loading image...'}
            </div>
          </div>
        )}
        
        <img 
          src={src} 
          alt={`${categoryDescriptions[category]} ${index + 1}`}
          className={`w-full h-auto object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={index < 6 ? "eager" : "lazy"}
          onLoad={() => handleImageLoad(category, index, src)}
          onError={() => handleImageError(category, index, src)}
        />
        
        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="text-white font-semibold text-lg">View</span>
        </div> */}
      </div>
    );
  });

  ImageItem.displayName = 'ImageItem';

  // Masonry Image Grid Component
  const MasonryGrid = () => {
    if (!currentImages.length) return null;

    const columnsArray = Array.from({ length: columns }, () => []);
    
    // Simple distribution - just round robin for stability
    currentImages.forEach((imageSrc, index) => {
      const columnIndex = index % columns;
      columnsArray[columnIndex].push({
        src: imageSrc,
        index,
        column: columnIndex
      });
    });

    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`}>
        {columnsArray.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-6 md:gap-8">
            {column.map(({ src, index }) => {
              const imageKey = `${activeCategory}-${index}`;
              const isLoaded = loadedImages[imageKey];
              const isCached = imageCache[src];
              
              return (
                <ImageItem
                  key={imageKey}
                  src={src}
                  index={index}
                  isLoaded={isLoaded}
                  isCached={isCached}
                  category={activeCategory}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // Optimized Skeleton Loading Component
  const SkeletonGrid = () => (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`}>
      {[...Array(Math.min(6, currentImages.length))].map((_, index) => (
        <div 
          key={index}
          className="bg-gray-200 rounded-lg shadow-xl overflow-hidden animate-pulse"
          style={{ 
            aspectRatio: Math.random() > 0.5 ? '4/3' : '3/4',
            minHeight: '200px'
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty State Component
  const EmptyState = ({ category }) => (
    <div className="col-span-full py-16 md:py-24 text-center">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4 border-2 border-gray-300">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-main text-gray-600 mb-4">
          {`${categoryDescriptions[category]} Coming Soon`}
        </h3>
        <p className="text-lg text-gray-500 font-sub max-w-md mx-auto">
          {category === 'auction' 
            ? 'Exciting auction moments are being prepared for you! Stay tuned for the grand reveal of our exclusive auction gallery.'
            : `Stunning ${categoryDescriptions[category].toLowerCase()} moments are on the way. Check back soon to explore our latest photo gallery!`
          }
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
          
          <div className="absolute inset-0 z-10 flex items-center transform -translate-y-4 md:-translate-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-8xl text-primary font-bold font-galantic absolute left-[12%] md:left-[19%]">
              GALLERY
            </h1>
          </div>
        </div>
      </section>
      
      <section className="bg-white py-6 md:py-16 md:pb-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-6 md:mb-8">
              Relive the Roar
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            {['pastSeason', 'trials', 'megaLaunch', 'auction', 'matchDay'].map((category) => (
              <button 
                key={category}
                onClick={() => handleButtonClick(category)}
                className={getButtonClass(category)}
                disabled={isLoading}
              >
                {categoryDisplayNames[category]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
          {isLoading ? (
            <SkeletonGrid />
          ) : currentImages.length > 0 ? (
            <MasonryGrid />
          ) : (
            <EmptyState category={activeCategory} />
          )}
        </div>
      </section>
    </>
  )
}

export default GalleryPage;