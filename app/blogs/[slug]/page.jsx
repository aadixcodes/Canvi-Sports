// import  from "../../components/";
// import Link from "next/link";
// import { blogsData } from "../blogsData";

// const BlogDetailPage = ({ params }) => {
//   const { slug } = params;
//   const blog = blogsData.find((blog) => blog.slug === slug);

//   if (!blog) {
//     return (
//       <>
//         <div className="min-h-screen flex items-center justify-center bg-gray-50">
//           <div className="text-center p-8 bg-white rounded-lg shadow-md">
//             <h1 className="text-4xl font-bold mb-6 text-gray-800">
//               Blog Not Found
//             </h1>
//             <Link
//               href="/blogs"
//               className="text-[#29066d] hover:underline text-lg"
//             >
//               ← Return to blogs
//             </Link>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       {/* Banner Section - Same as main blog page */}
//       <section className="relative w-full bg-white">
//         <div className="relative w-full h-[75vh] min-h-[500px]">
//           <div
//             className="absolute inset-0 bg-no-repeat"
//             style={{
//               backgroundImage: `url(${blog.image})`,
//               backgroundSize: "100% 100%",
//               backgroundPosition: "center",
//             }}
//           ></div>

//           {/* Content with left positioning */}
//           <div className="absolute inset-0 z-10 flex items-center transform -translate-y-8">
//             <h1 className="text-3xl md:text-6xl lg:text-8xl text-primary font-bold font-galantic absolute left-[15%]">
//               BLOGS
//             </h1>
//           </div>
//         </div>
//       </section>

//       {/* Blog Content Section */}
//       <section className="bg-white py-12 md:py-16">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Back Button */}
//           <div className="mb-8">
//             <Link
//               href="/blogs"
//               className="inline-flex items-center text-[#29066d] hover:text-purple-800 font-medium transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//               Back to Blogs
//             </Link>
//           </div>

//           {/* Blog Heading */}
//           <div className="text-left mb-12">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-jaturat text-black-90 mb-6 md:mb-8 font-galantic">
//               {blog.title}
//             </h1>
//             <div className="w-24 h-1 bg-[#29066d] mx-auto mb-8"></div>
//           </div>

//           {/* Main Content Image - 70vw centered */}
//           <div className="mb-12 flex justify-center">
//             <div
//               className="w-full max-w-[70vw] h-96 bg-cover bg-center rounded-lg shadow-lg"
//               style={{ backgroundImage: `url('./assets/Blog Img.png')` }} // Using same path as Gallery
//             ></div>
//           </div>

//           {/* Blog Content Paragraphs */}
//           <div className="prose prose-lg max-w-none">
//             {blog.content.map((paragraph, index) => (
//               <p
//                 key={index}
//                 className="text-gray-700 mb-6 leading-relaxed text-lg text-justify"
//                 style={{ fontFamily: "var(--font-poppins)" }}
//               >
//                 {paragraph.text}
//               </p>
//             ))}
//           </div>

//           {/* Bottom Back Button - Bottom Left */}
//           <div className="mt-12 pt-8 border-t border-gray-200 flex justify-start">
//             <Link
//               href="/blogs"
//               className="inline-flex items-center text-[#29066d] hover:text-purple-800 font-medium transition-colors text-lg"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                 />
//               </svg>
//               Back to All Blogs
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export async function generateStaticParams() {
//   return blogsData.map((blog) => ({
//     slug: blog.slug,
//   }));
// }

// export async function generateMetadata({ params }) {
//   const { slug } = params;
//   const blog = blogsData.find((blog) => blog.slug === slug);

//   return {
//     title: blog?.title || "Blog Not Found",
//     description: blog?.description || "Blog post not available",
//   };
// }

// export default BlogDetailPage;


import Link from "next/link";
import { blogsData } from "../blogsData";

const BlogDetailPage = ({ params }) => {
  const { slug } = params;
  const blog = blogsData.find((blog) => blog.slug === slug);

  if (!blog) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">
              Blog Not Found
            </h1>
            <Link
              href="/blogs"
              className="text-[#29066d] hover:underline text-lg"
            >
              ← Return to blogs
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Enhanced Banner Section */}
      <section className="relative w-full bg-white overflow-hidden">
        <div className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${blog.image})`,
              backgroundPosition: "top center", // Add this line
            }}
          ></div>
          
          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-[#180444] bg-opacity-60 mix-blend-multiply"></div>
          
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

          {/* Content Container */}
          <div className="relative z-20 h-full flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
              <div className="max-w-4xl">
                {/* Blog Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-galantic mb-4 leading-tight drop-shadow-lg">
                  {blog.title}
                </h1>
                
                {/* Description */}
                <p className="text-lg sm:text-xl text-white text-opacity-90 font-light max-w-3xl drop-shadow-md">
                  {blog.description}
                </p>
                
                {/* Back Button */}
                <div className="mt-6">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center text-white hover:text-gray-200 font-medium transition-colors group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Blogs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Content Paragraphs */}
          <div className="prose prose-lg max-w-none">
            {blog.content.map((paragraph, index) => (
              <div key={index} className="mb-8">
                <p
                  className="text-gray-700 leading-relaxed text-lg text-justify"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {paragraph.text}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Back Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blogs"
              className="inline-flex items-center text-[#29066d] hover:text-purple-800 font-medium transition-colors text-lg group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to All Blogs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const blog = blogsData.find((blog) => blog.slug === slug);

  return {
    title: blog?.title || "Blog Not Found",
    description: blog?.description || "Blog post not available",
  };
}

export default BlogDetailPage;