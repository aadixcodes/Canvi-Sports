"use client";
import React from 'react';

const IconPlayerSection = () => {
  return (
    <section className="w-full bg-[#180444] py-12 lg:py-16">
      {/* Main Heading */}
      <div className="text-center mb-8 lg:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-main">
          Icon Player
        </h2>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Text Content - Left Side */}
            <div className="flex-1 p-8 lg:p-10 xl:p-12 flex flex-col justify-center order-2 lg:order-1">
              <div className="space-y-4 lg:space-y-6">
                {/* Main Heading */}
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 italic">
                  Pardeep Narwal
                </h3>
                
                {/* Subheading */}
                <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 italic font-semibold"
                   style={{ fontFamily: 'var(--font-poppins)' }}>
                  - The Dubki King Returns
                </p>

                {/* Content */}
                <div className="space-y-4 text-gray-600 leading-relaxed"
                     style={{ fontFamily: 'var(--font-poppins)' }}>
                  <p className="text-sm lg:text-base xl:text-lg">
                    Every sport has an icon who changes the way the game is played. For kabaddi, that icon is Pardeep Narwal. Known across the world as the Dubki King, Pardeep has not only broken records but has also redefined what it means to be a raider.
                  </p>
                  
                  <p className="text-sm lg:text-base xl:text-lg">
                    The roar just got louder. Pardeep Narwal will now bring his unmatched skill and superstar aura to the Canvi Premier Kabaddi League Season 2. Pardeep isn't just here to play. He's here to inspire the next generation, to prove that kabaddi is India's gift to the world, and to remind everyone why he is still the most feared raider of all time.
                  </p>
                  
                  <p className="text-sm lg:text-base xl:text-lg">
                    Now, he's ready to light up CPKL Season 2 in Dubai. Fans will see his fearless raids, iconic moves, and unmatched energy as he takes the mat with the league's best.
                  </p>
                </div>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="flex-1 order-1 lg:order-2">
              <div className="h-92 lg:h-full p-4 lg:p-6 xl:p-8 flex items-center justify-center">
                <div className="w-full h-full lg:max-h-none rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center relative">
                  
                  {/* If you have an actual image, use this instead: */}
                  <img
                    src="/assets/PardeepImg1.png"
                    alt="Pardeep Narwal - The Dubki King"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IconPlayerSection;