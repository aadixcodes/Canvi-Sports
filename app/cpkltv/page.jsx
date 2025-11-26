// 'use client';
// import { useState, useRef, useEffect } from 'react';

// const CpklTvPage = () => {
//   const [activeCategory, setActiveCategory] = useState('Best Raids & Tackles of the Season');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // Track currently playing video
//   const dropdownRef = useRef(null);
//   const videoRefs = useRef({}); // Store all video refs

//   // Define different video sets for each category with thumbnails
//   const tvCategories = {
//     'Best Raids & Tackles of the Season': [
//       { 
//         video: '/assets/cpkltv/cpklvid1.mp4',
//         thumbnail: '/assets/cpkltv/thumb1.JPG'
//       },
//       { 
//         video: '/assets/cpkltv/cpklvid2.mp4',
//         thumbnail: '/assets/cpkltv/thumb2.JPG'
//       },
//       { 
//         video: '/assets/cpkltv/cpklvid3.mp4',
//         thumbnail: '/assets/cpkltv/thumb3.JPG'
//       },
//       { 
//         video: '/assets/cpkltv/cpklvid4.mp4',
//         thumbnail: '/assets/cpkltv/thumb4.JPG'
//       },
//     ],
//     'Live Matches': [],
//     'Player Interviews': [],
//     'Behind-the-Scenes Specials': [],
//     'Match Highlights': []
//   };

//   // Category descriptions for empty states
//   const categoryDescriptions = {
//     'Best Raids & Tackles of the Season': "Best Raids & Tackles Videos",
//     'Live Matches': "Live Match Videos",
//     'Player Interviews': "Player Interview Videos",
//     'Behind-the-Scenes Specials': "Behind-the-Scenes Videos",
//     'Match Highlights': "Match Highlight Videos"
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Get current videos based on active category
//   const currentVideos = tvCategories[activeCategory];

//   const handleCategorySelect = async (category) => {
//     if (category === activeCategory) return;
    
//     // Pause currently playing video when switching categories
//     if (currentlyPlaying) {
//       const videoRef = videoRefs.current[currentlyPlaying];
//       if (videoRef) {
//         videoRef.pause();
//       }
//       setCurrentlyPlaying(null);
//     }
    
//     setIsLoading(true);
//     setActiveCategory(category);
//     setIsDropdownOpen(false);
    
//     // Simulate loading delay
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 800);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Function to pause all videos except the one being played
//   const pauseAllVideosExcept = (videoId) => {
//     Object.keys(videoRefs.current).forEach(key => {
//       if (key !== videoId && videoRefs.current[key]) {
//         const video = videoRefs.current[key];
//         video.pause();
//         // Also update the playing state for the VideoPlayer component
//         const videoElement = video;
//         if (videoElement._reactInternals) {
//           // This will trigger the onPause event in the VideoPlayer component
//           video.dispatchEvent(new Event('pause'));
//         }
//       }
//     });
//   };

//   // Custom Video Player Component
//   const VideoPlayer = ({ item, index }) => {
//     const videoRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [isMuted, setIsMuted] = useState(true);
//     const [showControls, setShowControls] = useState(false);
//     const [hasError, setHasError] = useState(false);

//     const videoId = `${activeCategory}-${index}`;

//     // Store video ref in the parent's videoRefs object
//     useEffect(() => {
//       videoRefs.current[videoId] = videoRef.current;
//       return () => {
//         delete videoRefs.current[videoId];
//       };
//     }, [videoId]);

//     const togglePlay = () => {
//       if (videoRef.current) {
//         if (isPlaying) {
//           // Pause this video
//           videoRef.current.pause();
//           setCurrentlyPlaying(null);
//         } else {
//           // Pause all other videos first
//           pauseAllVideosExcept(videoId);
          
//           // Play this video
//           videoRef.current.play().catch(error => {
//             console.error('Error playing video:', error);
//             setHasError(true);
//           });
//           setCurrentlyPlaying(videoId);
//         }
//         setIsPlaying(!isPlaying);
//       }
//     };

//     const toggleMute = () => {
//       if (videoRef.current) {
//         videoRef.current.muted = !isMuted;
//         setIsMuted(!isMuted);
//       }
//     };

//     const handleVideoClick = () => {
//       togglePlay();
//     };

//     const handleVideoEnd = () => {
//       setIsPlaying(false);
//       setCurrentlyPlaying(null);
//     };

//     const handleVideoLoad = () => {
//       setHasError(false);
//     };

//     const handleVideoError = () => {
//       setHasError(true);
//       setIsPlaying(false);
//       setCurrentlyPlaying(null);
//     };

//     const handleVideoPause = () => {
//       setIsPlaying(false);
//       if (currentlyPlaying === videoId) {
//         setCurrentlyPlaying(null);
//       }
//     };

//     const handleVideoPlay = () => {
//       setIsPlaying(true);
//       setCurrentlyPlaying(videoId);
//     };

//     return (
//       <div 
//         className="relative bg-black rounded-xl shadow-2xl overflow-hidden group aspect-[9/16] cursor-pointer"
//         onMouseEnter={() => setShowControls(true)}
//         onMouseLeave={() => setShowControls(false)}
//       >
//         {/* Video Element */}
//         <video
//           ref={videoRef}
//           src={item.video}
//           className="w-full h-full object-cover"
//           muted={isMuted}
//           loop
//           playsInline
//           preload="metadata"
//           onClick={handleVideoClick}
//           onEnded={handleVideoEnd}
//           onLoadedData={handleVideoLoad}
//           onError={handleVideoError}
//           onPause={handleVideoPause}
//           onPlay={handleVideoPlay}
//         />

//         {/* Error State */}
//         {hasError && (
//           <div className="absolute inset-0 z-30 bg-gray-800 flex items-center justify-center flex-col p-4 text-center">
//             <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-gray-300 text-sm">Video unavailable</p>
//           </div>
//         )}

//         {/* Thumbnail Overlay when not playing and no error */}
//         {!isPlaying && !hasError && (
//           <div className="absolute inset-0 z-10">
//             <img 
//               src={item.thumbnail} 
//               alt={`${activeCategory} Thumbnail ${index + 1}`}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzMzMzMzMiLz4KPHN2ZyB4PSIyNSIgeT0iMjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS13aWR0aD0iMiI+CjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTE1IDEwbC00LjU1MyAyLjI3NkExIDEgMCAwIDAgMTAgMTMuNjE4djYuNzY0YTEgMSAwIDAgMCAxLjQ0Ny44OTRMMTUgMTRNNSAxOGg4YTQgNCAwIDAwNC00VjhhNCA0IDAgMDAtNC00SDVhNCA0IDAgMDAtNCA0djZhNCA0IDAgMDA0IDR6Ii8+Cjwvc3ZnPgo8L3N2Zz4=';
//               }}
//             />
//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//           </div>
//         )}

//         {/* Custom Controls - Only show when not in error state */}
//         {!hasError && (showControls || !isPlaying) && (
//           <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
//             {/* Top Controls */}
//             <div className="flex justify-end">
//               {/* Mute/Unmute Button */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleMute();
//                 }}
//                 className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-all"
//               >
//                 {isMuted ? (
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 010 12m-4.5-9.5L12 3v18l-4.5-4.5H4a1 1 0 01-1-1v-7a1 1 0 011-1h3.5z" />
//                   </svg>
//                 )}
//               </button>
//             </div>

//             {/* Bottom Controls */}
//             <div className="flex justify-center">
//               {/* Play/Pause Button */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   togglePlay();
//                 }}
//                 className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-all"
//               >
//                 {isPlaying ? (
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 ) : (
//                   <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M8 5v14l11-7z"/>
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Skeleton Loading Component
//   const SkeletonGrid = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//       {[...Array(8)].map((_, index) => (
//         <div 
//           key={index}
//           className="bg-gray-200 rounded-xl shadow-xl overflow-hidden aspect-[9/16] animate-pulse"
//         >
//           <div className="w-full h-full bg-gray-300 flex items-center justify-center">
//             <div className="text-gray-400">Loading Video...</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   // Empty State Component
//   const EmptyState = ({ category }) => (
//     <div className="col-span-full py-16 md:py-24 text-center">
//       <div className="max-w-2xl mx-auto px-4">
//         <div className="mb-8">
//           <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
//             <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//             </svg>
//           </div>
//         </div>
//         <h3 className="text-2xl md:text-3xl font-main text-gray-600 mb-4">
//           No {categoryDescriptions[category]} Available
//         </h3>
//         <p className="text-lg text-gray-500 font-sub max-w-md mx-auto">
//           We're currently preparing amazing {categoryDescriptions[category].toLowerCase()}. 
//           Check back soon for exciting video content!
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <>
//        <section className="relative w-full bg-white">
//         <div className="relative w-full h-[20vh] md:h-[60vh]">
//           <div 
//             className="absolute inset-0 bg-no-repeat"
//             style={{ 
//               backgroundImage: "url('/assets/allpb.png')",
//               backgroundSize: "100% 100%",
//               backgroundPosition: "center"
//             }}
//           ></div>
          
//           {/* Content with left positioning */}
//           <div className="absolute inset-0 z-10 flex items-center transform -translate-y-4 md:-translate-y-8">
//             <h1 className="text-4xl md:text-6xl lg:text-8xl text-primary font-bold font-galantic absolute left-[12%] md:left-[19%]">
//               CPKL TV 
//             </h1>
//           </div>
//         </div>
//       </section>
      
//       {/* CPKL TV Header Section */}
//       <section className="bg-white py-12 md:py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-6 md:mb-8">
//               Your Official Kabaddi Streaming Hub
//             </h1>
//             <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-sub">
//               Dive into the world of professional kabaddi with CPKL TV. Watch live matches, exclusive 
//               interviews, behind-the-scenes content, and the most thrilling moments from the season.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Dropdown Button Section */}
//       <section className="py-8 pt-0">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center">
//             <div className="relative w-full max-w-[50vw] min-w-[350px]" ref={dropdownRef}>
//               {/* Main Dropdown Button */}
//               <button 
//                 onClick={toggleDropdown}
//                 disabled={isLoading}
//                 className="w-full px-8 py-4 bg-[#180444] text-white font-semibold rounded-lg border-2 border-[#180444] transition-colors duration-300 shadow-md text-lg flex items-center justify-between hover:bg-[#2a0a66] hover:border-[#2a0a66] disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <span>{activeCategory}</span>
//                 <svg 
//                   className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {/* Dropdown Menu - Increased z-index */}
//               {isDropdownOpen && (
//                 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
//                   {Object.keys(tvCategories).map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => handleCategorySelect(category)}
//                       disabled={isLoading}
//                       className={`w-full px-6 py-4 text-left transition-all duration-200 border-b border-gray-100 last:border-b-0 ${
//                         activeCategory === category 
//                           ? 'bg-[#180444] text-white' 
//                           : 'text-gray-800 hover:bg-[#180444] hover:text-white'
//                       } disabled:opacity-50 disabled:cursor-not-allowed`}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CPKL TV Grid Section */}
//       <section className="pt-8 pb-24 bg-white min-h-[60vh]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {isLoading ? (
//             <SkeletonGrid />
//           ) : currentVideos.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//               {currentVideos.map((item, index) => (
//                 <VideoPlayer key={index} item={item} index={index} />
//               ))}
//             </div>
//           ) : (
//             <EmptyState category={activeCategory} />
//           )}
//         </div>
//       </section>
//     </>
//   )
// }

// export default CpklTvPage



'use client';
import { useState, useRef, useEffect } from 'react';

const CpklTvPage = () => {
  const [activeCategory, setActiveCategory] = useState('Best Raids & Tackles of the Season');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null); // Track currently playing video
  const dropdownRef = useRef(null);
  const videoRefs = useRef({}); // Store all video refs

  // Define different video sets for each category with thumbnails
  const tvCategories = {
    'Best Raids & Tackles of the Season': [
      { 
        video: '/assets/cpkltv/cpklvid1.mp4',
        thumbnail: '/assets/cpkltv/thumb1.JPG'
      },
      { 
        video: '/assets/cpkltv/cpklvid2.mp4',
        thumbnail: '/assets/cpkltv/thumb2.JPG'
      },
      { 
        video: '/assets/cpkltv/cpklvid3.mp4',
        thumbnail: '/assets/cpkltv/thumb3.JPG'
      },
      { 
        video: '/assets/cpkltv/cpklvid4.mp4',
        thumbnail: '/assets/cpkltv/thumb4.JPG'
      },
    ],
    'Mega Launch': [
      { 
        video: '/assets/cpkltv/MegaLaunch/1.mp4',
        thumbnail: '/assets/cpkltv/MegaLaunch/thumb1.JPG'
      },
      { 
        video: '/assets/cpkltv/MegaLaunch/2.mp4',
        thumbnail: '/assets/cpkltv/MegaLaunch/thumb2.JPG'
      },
      { 
        video: '/assets/cpkltv/MegaLaunch/3.mp4',
        thumbnail: '/assets/cpkltv/MegaLaunch/thumb3.JPG'
      },
    ],
    'Live Matches': [],
    'Player Interviews': [],
    'Behind-the-Scenes Specials': [],
    'Match Highlights': []
  };

  // Category descriptions for empty states
  const categoryDescriptions = {
    'Best Raids & Tackles of the Season': "Best Raids & Tackles Videos",
    'Mega Launch': "Mega Launch Videos",
    'Live Matches': "Live Match Videos",
    'Player Interviews': "Player Interview Videos",
    'Behind-the-Scenes Specials': "Behind-the-Scenes Videos",
    'Match Highlights': "Match Highlight Videos"
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

  // Get current videos based on active category
  const currentVideos = tvCategories[activeCategory];

  const handleCategorySelect = async (category) => {
    if (category === activeCategory) return;
    
    // Pause currently playing video when switching categories
    if (currentlyPlaying) {
      const videoRef = videoRefs.current[currentlyPlaying];
      if (videoRef) {
        videoRef.pause();
      }
      setCurrentlyPlaying(null);
    }
    
    setIsLoading(true);
    setActiveCategory(category);
    setIsDropdownOpen(false);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to pause all videos except the one being played
  const pauseAllVideosExcept = (videoId) => {
    Object.keys(videoRefs.current).forEach(key => {
      if (key !== videoId && videoRefs.current[key]) {
        const video = videoRefs.current[key];
        video.pause();
        // Also update the playing state for the VideoPlayer component
        const videoElement = video;
        if (videoElement._reactInternals) {
          // This will trigger the onPause event in the VideoPlayer component
          video.dispatchEvent(new Event('pause'));
        }
      }
    });
  };

  // Custom Video Player Component
  const VideoPlayer = ({ item, index }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [hasError, setHasError] = useState(false);

    const videoId = `${activeCategory}-${index}`;

    // Store video ref in the parent's videoRefs object
    useEffect(() => {
      videoRefs.current[videoId] = videoRef.current;
      return () => {
        delete videoRefs.current[videoId];
      };
    }, [videoId]);

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          // Pause this video
          videoRef.current.pause();
          setCurrentlyPlaying(null);
        } else {
          // Pause all other videos first
          pauseAllVideosExcept(videoId);
          
          // Play this video
          videoRef.current.play().catch(error => {
            console.error('Error playing video:', error);
            setHasError(true);
          });
          setCurrentlyPlaying(videoId);
        }
        setIsPlaying(!isPlaying);
      }
    };

    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    const handleVideoClick = () => {
      togglePlay();
    };

    const handleVideoEnd = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    };

    const handleVideoLoad = () => {
      setHasError(false);
    };

    const handleVideoError = () => {
      setHasError(true);
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    };

    const handleVideoPause = () => {
      setIsPlaying(false);
      if (currentlyPlaying === videoId) {
        setCurrentlyPlaying(null);
      }
    };

    const handleVideoPlay = () => {
      setIsPlaying(true);
      setCurrentlyPlaying(videoId);
    };

    return (
      <div 
        className="relative bg-black rounded-xl shadow-2xl overflow-hidden group aspect-[9/16] cursor-pointer"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={item.video}
          className="w-full h-full object-cover"
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          onClick={handleVideoClick}
          onEnded={handleVideoEnd}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onPause={handleVideoPause}
          onPlay={handleVideoPlay}
        />

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 z-30 bg-gray-800 flex items-center justify-center flex-col p-4 text-center">
            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-300 text-sm">Video unavailable</p>
          </div>
        )}

        {/* Thumbnail Overlay when not playing and no error */}
        {!isPlaying && !hasError && (
          <div className="absolute inset-0 z-10">
            <img 
              src={item.thumbnail} 
              alt={`${activeCategory} Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzMzMzMzMiLz4KPHN2ZyB4PSIyNSIgeT0iMjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2U9IiM2NjY2NjYiIHN0cm9rZS13aWR0aD0iMiI+CjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTE1IDEwbC00LjU1MyAyLjI3NkExIDEgMCAwIDAgMTAgMTMuNjE4djYuNzY0YTEgMSAwIDAgMCAxLjQ0Ny44OTRMMTUgMTRNNSAxOGg4YTQgNCAwIDAwNC00VjhhNCA0IDAgMDAtNC00SDVhNCA0IDAgMDAtNCA0djZhNCA0IDAgMDA0IDR6Ii8+Cjwvc3ZnPgo8L3N2Zz4=';
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        {/* Custom Controls - Only show when not in error state */}
        {!hasError && (showControls || !isPlaying) && (
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
            {/* Top Controls */}
            <div className="flex justify-end">
              {/* Mute/Unmute Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-all"
              >
                {isMuted ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6a9 9 0 010 12m-4.5-9.5L12 3v18l-4.5-4.5H4a1 1 0 01-1-1v-7a1 1 0 011-1h3.5z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-center">
              {/* Play/Pause Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-all"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Skeleton Loading Component
  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {[...Array(8)].map((_, index) => (
        <div 
          key={index}
          className="bg-gray-200 rounded-xl shadow-xl overflow-hidden aspect-[9/16] animate-pulse"
        >
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <div className="text-gray-400">Loading Video...</div>
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
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-main text-gray-600 mb-4">
          {categoryDescriptions[category]} Coming Soon
        </h3>
        <p className="text-lg text-gray-500 font-sub max-w-md mx-auto">
          We're currently preparing amazing {categoryDescriptions[category].toLowerCase()}. 
          Check back soon for exciting video content!
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
              CPKL TV 
            </h1>
          </div>
        </div>
      </section>
      
      {/* CPKL TV Header Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-6 md:mb-8">
              Your Official Kabaddi Streaming Hub
            </h1>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-sub">
              Dive into the world of professional kabaddi with CPKL TV. Watch live matches, exclusive 
              interviews, behind-the-scenes content, and the most thrilling moments from the season.
            </p>
          </div>
        </div>
      </section>

      {/* Dropdown Button Section */}
      <section className="py-8 pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[50vw] min-w-[350px]" ref={dropdownRef}>
              {/* Main Dropdown Button */}
              <button 
                onClick={toggleDropdown}
                disabled={isLoading}
                className="w-full px-8 py-4 bg-[#180444] text-white font-semibold rounded-lg border-2 border-[#180444] transition-colors duration-300 shadow-md text-lg flex items-center justify-between hover:bg-[#2a0a66] hover:border-[#2a0a66] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{activeCategory}</span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu - Increased z-index */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                  {Object.keys(tvCategories).map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      disabled={isLoading}
                      className={`w-full px-6 py-4 text-left transition-all duration-200 border-b border-gray-100 last:border-b-0 ${
                        activeCategory === category 
                          ? 'bg-[#180444] text-white' 
                          : 'text-gray-800 hover:bg-[#180444] hover:text-white'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CPKL TV Grid Section */}
      <section className="pt-8 pb-24 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <SkeletonGrid />
          ) : currentVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {currentVideos.map((item, index) => (
                <VideoPlayer key={index} item={item} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState category={activeCategory} />
          )}
        </div>
      </section>
    </>
  )
}

export default CpklTvPage