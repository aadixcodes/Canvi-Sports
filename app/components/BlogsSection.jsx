'use client';
import Link from "next/link";

const BlogsSection = () => {
  const blogs = [
    {
      id: 1,
      title: "Kabaddi: India's Oldest Game is Becoming the World's Newest Sensation",
      description: "From village pastime to global sensation - discover how kabaddi is taking the world by storm through CPKL.",
      image: "/assets/blogs/BlogBanner1.JPG",
      link: "/blogs/kabaddi-india-s-oldest-game-is-becoming-the-world-s-newest-obsession"
    },
    {
      id: 2,
      title: "Pardeep Narwal: The Man Who Turned Kabaddi Into Magic",
      description: "Meet the kabaddi legend who redefined the sport with his incredible raids and record-breaking performances.",
      image: "/assets/blogs/BlogBanner2.png",
      link: "/blogs/pardeep-narwal-the-man-who-turned-kabaddi-into-magic" // Added link
    },
    {
      id: 3,
      title: "Why CPKL in Dubai Could Change Kabaddi Forever",
      description: "Discover how CPKL Season 2 in Dubai is revolutionizing kabaddi and taking it to international audiences.",
      image: "/assets/blogs/BlogBanner3.JPG",
      link: "/blogs/why-cpkl-in-dubai-could-change-kabaddi-forever" // Added link
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-start sm:items-center mb-12">
          <div className="sm:w-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-3 md:mb-6">
              Our Blogs
            </h2>
            <div className="w-24 h-1 bg-secondary-light"></div>
          </div>
          <Link 
            href="/blogs" 
            className="bg-secondary-light text-sm text-white md:text-primary px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-secondary-dark transition-colors duration-300 text-center inline-block"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            View More
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="bg-[#29066d] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col w-full max-w-sm h-96 sm:h-[420px] hover:scale-[1.02]"
            >
              <div 
                className="h-48 bg-cover bg-center m-4 rounded-lg" 
                style={{ backgroundImage: `url('${blog.image}')` }}
              ></div>
              <div className="p-6 pt-0 flex-grow flex flex-col">
                <h3 
                  className="text-white text-lg font-bold mb-3 line-clamp-2" 
                  style={{ fontFamily: 'var(--font-jaturat)' }}
                >
                  {blog.title}
                </h3>
                <p 
                  className="text-white text-sm mb-4 flex-grow line-clamp-3" 
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  {blog.description}
                </p>
                <div className="flex justify-end mt-auto">
                  <Link 
                    href={blog.link} 
                    className="text-white hover:text-gray-300 transition-colors duration-300 transform hover:translate-x-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogsSection;