'use client';
import Image from 'next/image';

const PartnersSection = () => {
  // All partners in single array with categories
  const partners = [
    {
      id: 1,
      name: "Broadcast Partner 1",
      logo: "/assets/partners/Official partner2.png",
      category: "Official Broadcasting Partner"
    },
    {
      id: 2,
      name: "Broadcast Partner 2", 
      logo: "/assets/partners/Official partner.png",
      category: "Official Broadcasting Partner"
    },
    {
      id: 3,
      name: "League Organisers",
      logo: "/assets/partners/cpkl.jpg", 
      category: "League Organiser"
    },
    {
      id: 4,
      name: "Crafted By Kardo",
      logo: "/assets/partners/media and marketing partner.png",
      category: "Crafted By Kardo"
    },
    {
      id: 5, 
      name: "Kit Partner",
      logo: "/assets/partners/kit partner.png",
      category: "Kit Partner"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black-90 text-center mb-12 font-main">
          Our Partners
        </h2>

        {/* Single responsive grid for all partners */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="flex flex-col items-center justify-center 
                         w-[40%] sm:w-[30%] md:w-[25%] lg:w-[20%] xl:w-[18%]
                         p-3 sm:p-4"
            >
              {/* Category Label */}
              <p className="text-xs sm:text-sm font-semibold text-black mb-3 text-center leading-tight">
                {partner.category}
              </p>
              
              {/* Logo Container */}
              <div className="relative w-full aspect-square 
                            max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] xl:max-w-[200px]">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, (max-width: 1024px) 160px, (max-width: 1280px) 180px, 200px"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;