'use client'
import Layout from '../components/Layout'
import PartnersSection from '../components/PartnersSection'
import { useRouter } from 'next/navigation'

const AboutPage = () => {
  const router = useRouter()

  const handleJoinUsClick = () => {
    router.push('/registration')
  }

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
              ABOUT 
            </h1>
          </div>
        </div>
      </section>
      
      {/* About CPKL Section */}
      <section className="bg-white pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-4 md:mb-6">
              Local Roots to Global Heights
            </h2>
            <div className="text-base sm:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-sub space-y-4">
              <p>
                The Canvi Premier Kabaddi League (CPKL), founded by Canvi Sports Federation, is a professional franchise-based kabaddi league with one mission: to nurture India's raw talent and bring kabaddi to the global stage.
              </p>
              <p>
                <strong>Season 1 (2023–24):</strong> Conducted successfully in India, uniting hundreds of athletes from across the nation.
              </p>
              <p>
                <strong>Season 2 (2025):</strong> Now stepping into Dubai, CPKL combines the soul of Indian kabaddi with the glamour of an international sporting arena.
              </p>
              <p>
                With world-class players, elite franchises, and thrilling competition, CPKL is more than a league. It's a movement to make kabaddi a global spectacle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Purple Content Section */}
      <section className="bg-[#29066d] pt-4 sm:pt-6 md:pt-8 lg:pt-15 pb-10 sm:pb-20 md:pb-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#180444] rounded-2xl shadow-2xl p-6 md:p-8 lg:p-12 xl:p-16">
            
            {/* Mission Section */}
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16 lg:mb-20">
              <div className="lg:w-1/2">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-main text-white mb-4 sm:mb-6">Our Mission</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-sub italic">
                  "To create a world-class kabaddi ecosystem that nurtures raw talent, celebrates legends, and inspires communities by taking India's traditional sport to global arenas."
                </p>
              </div>
              <div className="lg:w-1/2 mt-6 lg:mt-0">
                <img 
                  src="/assets/mission.png" 
                  alt="Our Mission" 
                  className="w-full h-40 sm:h-48 md:h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Vision Section */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-6 md:gap-8 lg:gap-12">
              <div className="lg:w-1/2">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-main text-white mb-4 sm:mb-6">Our Vision</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-sub italic">
                  "To establish kabaddi as a truly international sport, with CPKL as its premier stage — uniting players, fans, and nations through the spirit of strength, skill, and sportsmanship."
                </p>
              </div>
              <div className="lg:w-1/2 mt-6 lg:mt-0">
                <img 
                  src="/assets/vision.png" 
                  alt="Our Vision" 
                  className="w-full h-40 sm:h-48 md:h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline and Join Us Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-main text-black-90 mb-4 md:mb-6">
            Building Champions, Creating Legends
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto font-sub">
            Join us in our journey to transform kabaddi and create a lasting legacy in sports. 
            Be part of the revolution that's changing the face of kabaddi in India.
          </p>
          <button 
            onClick={handleJoinUsClick}
            className="bg-secondary-light text-white px-5 sm:px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-secondary-dark transition-colors duration-300 font-sub text-sm sm:text-base md:text-lg font-semibold cursor-pointer"
          >
            Join Us Now
          </button>
        </div>
      </section>

      {/* Simple Full Width Strip */}
      <div className="w-full h-[3vh] bg-[#29066d]"></div>

      {/* Final Content Section - UPDATED WITH FOUNDER'S NOTE */}
      <section className="relative bg-gray-900">
        <div className="w-full min-h-[90vh] flex items-center justify-center py-8 md:py-0">
          <div 
            className="absolute inset-0 bg-center"
            style={{ 
              backgroundImage: "url('/assets/coach.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          {/* Content with founder's note */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-8 lg:gap-12">
              {/* Image Section - Full height matching text content */}
              <div className="lg:w-2/5 flex items-stretch">
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src="/assets/Founder.png" 
                    alt="CPKL Team" 
                    className="w-full h-full max-h-[700px] object-cover rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
              
              {/* Text Content Section - Founder's Note */}
              <div className="lg:w-3/5 text-white flex items-center">
                <div className="w-full p-4 sm:p-6 md:p-8 rounded-lg">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-main mb-4 sm:mb-6 text-white text-left font-bold">
                    Founder's Note
                  </h3>
                  <div className="space-y-4 sm:space-y-6 font-sub text-sm sm:text-base md:text-lg leading-relaxed">
                    <p>
                      When we started Canvi Premier Kabaddi League (CPKL), the vision was simple, to bring India's most rooted sport to a new-age stage. Kabaddi has always been a game of grit, teamwork, and heart and through CPKL, we aim to celebrate that essence while giving young athletes a platform to rise, shine, and inspire.
                    </p>
                    <p>
                      Our mission goes beyond just competition, it's about creating opportunities, building communities, and redefining how India experiences kabaddi. From every trial and training camp to every match and moment of victory, we see not just players, but stories of determination and dreams coming alive.
                    </p>
                    <p>
                      CPKL is built on the belief that sports have the power to unite and uplift. With teams representing different states and fans connecting from across the nation, we are crafting more than a league — we're building a movement that honors the spirit of kabaddi and the pride of every player who steps on the mat.
                    </p>
                    <p>
                      To everyone who has been part of this journey, our teams, athletes, partners, and fans, thank you for believing in the vision of CPKL. Together, we are reviving a legacy.
                    </p>
                  </div>
                  <div className="mt-6 sm:mt-8 text-left">
                    <p className="font-bold text-lg sm:text-xl md:text-2xl font-main">
                      Mr. Shiv Kumar Beniwal
                    </p>
                    <p className="text-sm sm:text-base md:text-lg font-sub">
                      Founder & CEO, Canvi Premier Kabaddi League <br />
                      Director, Canvi Sports Federation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Our Management Section - UPDATED */}
      <section className="bg-white py-12 md:py-16 lg:py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-main text-black-90 font-bold">
              Our Management
            </h2>
          </div>

          {/* Management Grid - Responsive 4 column layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {/* Management Member 1 - Rakesh ji Bajiya */}
            <div className="text-center bg-[#180444] rounded-xl group cursor-pointer transform transition-transform duration-300 hover:scale-102">
              <div className="relative overflow-hidden rounded-xl shadow-lg mb-4">
                <img 
                  src="/assets/management/1.png" 
                  alt="Rakesh ji Bajiya" 
                  className="w-full h-64 md:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              </div>
              <div className="bg-[#180444] px-6 pb-6 pt-2 rounded-xl">
                <h3 className="text-xl md:text-2xl font-main font-bold text-white mb-3">
                  Rakesh ji Bajiya
                </h3>
                <p className="text-sm md:text-base text-gray-300 font-sub leading-relaxed">
                  Vice President - Canvi Premier Kabaddi League<br />
                  Chairman - Canvi Sports Federation
                </p>
              </div>
            </div>

            {/* Management Member 2 - Nikhil Sharma */}
            <div className="text-center bg-[#180444] rounded-xl group cursor-pointer transform transition-transform duration-300 hover:scale-102">
              <div className="relative overflow-hidden rounded-xl shadow-lg mb-4">
                <img 
                  src="/assets/management/2.jpg" 
                  alt="Vandana Kundu" 
                  className="w-full h-64 md:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              </div>
              <div className="bg-[#180444] px-6 pb-6 pt-2 rounded-xl">
                <h3 className="text-xl md:text-2xl font-main font-bold text-white mb-3">
                  Adv. Nikhil Sharma
                </h3>
                <p className="text-sm md:text-base text-gray-300 font-sub leading-relaxed">
                  Legal Advisor<br />
                  Canvi Premier Kabaddi League
                </p>
              </div>
            </div>

            {/* Management Member 3 - Anil Kajla */}
            <div className="text-center bg-[#180444] rounded-xl group cursor-pointer transform transition-transform duration-300 hover:scale-102">
              <div className="relative overflow-hidden rounded-xl shadow-lg mb-4">
                <img 
                  src="/assets/management/3.png" 
                  alt="Anil Kajla" 
                  className="w-full h-64 md:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              </div>
              <div className="bg-[#180444] px-6 pb-6 pt-2 rounded-xl">
                <h3 className="text-xl md:text-2xl font-main font-bold text-white mb-3">
                 Kuldeep Kaswan
                </h3>
                <p className="text-sm md:text-base text-gray-300 font-sub leading-relaxed">
                  Management<br />
                  Canvi Premier Kabaddi League
                </p>
              </div>
            </div>

            {/* Management Member 4 - Kuldeep Kaswan */}
            <div className="text-center bg-[#180444] rounded-xl group cursor-pointer transform transition-transform duration-300 hover:scale-102">
              <div className="relative overflow-hidden rounded-xl shadow-lg mb-4">
                <img 
                  src="/assets/management/4.png" 
                  alt="Kuldeep Kaswan" 
                  className="w-full h-64 md:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              </div>
              <div className="bg-[#180444] px-6 pb-6 pt-2 rounded-xl">
                <h3 className="text-xl md:text-2xl font-main font-bold text-white mb-3">
                   Anil Kajla 
                </h3>
                <p className="text-sm md:text-base text-gray-300 font-sub leading-relaxed">
                  Management<br />
                  Canvi Premier Kabaddi League
                </p>
              </div>
            </div>

{/* Management Member 5 - Bhawani Singh Rathore */}
            <div className="text-center bg-[#180444] rounded-xl group cursor-pointer transform transition-transform duration-300 hover:scale-102">
              <div className="relative overflow-hidden rounded-xl shadow-lg mb-4">
                <img 
                  src="/assets/management/bhawani.jpg" 
                  alt="Bhawani Singh Rathore" 
                  className="w-full h-64 md:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              </div>
              <div className="bg-[#180444] px-6 pb-6 pt-2 rounded-xl">
                <h3 className="text-xl md:text-2xl font-main font-bold text-white mb-3">
                 Bhawani Singh Rathore
                </h3>
                <p className="text-sm md:text-base text-gray-300 font-sub leading-relaxed">
                  Mentor - Canvi Premier Kabaddi League <br />
                  National player of volleyball and basketball
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />
    </>
  )
}

export default AboutPage