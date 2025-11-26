// 'use client';
// import  from '../components/';

// const FixturesPage = () => {
//   const matches = [
//     {
//       id: 1,
//       team1: { name: 'TBD', logo: '/assets/tbd.png' },
//       team2: { name: 'TBD', logo: '/assets/tbd.png' },
//       date: 'Date and Day TBD',
//       time: 'Time TDB',
//       stadium: 'Stadium TBD'
//     },
//     {
//       id: 2,
//       team1: { name: 'TBD', logo: '/assets/tbd.png' },
//       team2: { name: 'TBD', logo: '/assets/tbd.png' },
//       date: 'Date and Day TBD',
//       time: 'Time TDB',
//       stadium: 'Stadium TBD'
//     },
//     {
//       id: 3,
//       team1: { name: 'TBD', logo: '/assets/tbd.png' },
//       team2: { name: 'TBD', logo: '/assets/tbd.png' },
//       date: 'Date and Day TBD',
//       time: 'Time TDB',
//       stadium: 'Stadium TBD'
//     },
//     {
//       id: 4,
//       team1: { name: 'TBD', logo: '/assets/tbd.png' },
//       team2: { name: 'TBD', logo: '/assets/tbd.png' },
//       date: 'Date and Day TBD',
//       time: 'Time TDB',
//       stadium: 'Stadium TBD'
//     }
//   ];

//   return (
//     <>
//        <section className="relative w-full bg-white">
//         <div className="relative w-full h-[29vh] md:h-[60vh]">
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
//               FIXTURES
//             </h1>
//           </div>
//         </div>
//       </section>

//       {/* New Heading and Subheading Section */}
//       <section className="bg-white py-12 md:py-16 md:pb-5">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-4 md:mb-6">
//               Every Clash. Every Battle. Every Moment – Don't Miss Out.
//             </h1>
//             <p className="font-sub text-lg sm:text-xl md:text-xl text-gray-700 font-sub">
//               15+ matches. 7 Days . 8 teams. Non-stop kabaddi action in Dubai.<br />
//               Stay tuned for the full Season 2 schedule.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-8 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="space-y-8">
//             {matches.map((match) => (
//               <div key={match.id} className="relative">
//                 {/* White gap between cards */}
//                 <div className="h-4 bg-white"></div>
                
//                 {/* Match card */}
//                 <div className="bg-[#29066d] rounded-t-[20px] shadow-2xl overflow-hidden border-2 border-[#180444]">
//                   <div className="p-6 md:p-8">
//                     <div className="flex flex-col lg:flex-row justify-between items-center">
//                       <div className="flex items-center space-x-4 md:space-x-8 mb-6 lg:mb-0">
//                         <div className="flex flex-col items-center">
//                           <div className="w-16 h-16 md:w-20 md:h-20  rounded-full flex items-center justify-center border-[#180444] mb-2">
//                             <img 
//                               src={match.team1.logo} 
//                               alt={match.team1.name}
//                               className="w-16 h-16 md:w-16 md:h-16 object-contain"
//                             />
//                           </div>
//                           <span className="text-white font-bold text-sm md:text-base text-center">
//                             {match.team1.name}
//                           </span>
//                         </div>

//                         <div className="flex flex-col items-center">
//                           <div className="bg-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-[#180444]">
//                             <span className="text-[#180444] font-extrabold text-lg md:text-xl">
//                               VS
//                             </span>
//                           </div>
//                         </div>

//                         <div className="flex flex-col items-center">
//                           <div className="w-16 h-16 md:w-20 md:h-20  rounded-full flex items-center justify-center border-[#180444] mb-2">
//                             <img 
//                               src={match.team2.logo} 
//                               alt={match.team2.name}
//                               className="w-16 h-16 md:w-16 md:h-16 object-contain"
//                             />
//                           </div>
//                           <span className="text-white font-bold text-sm md:text-base text-center">
//                             {match.team2.name}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-center lg:items-end">
//                         <div className="text-white font-semibold text-lg md:text-xl mb-4 text-center lg:text-right">
//                           {match.date}
//                         </div>
                        
//                         <div className="flex flex-col items-center lg:items-end">
//                           <div className="text-white font-bold text-xl md:text-2xl mb-2">
//                             {match.time}
//                           </div>
//                           <div className="text-white font-semibold text-lg md:text-xl">
//                             {match.stadium}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default FixturesPage;



'use client';

const FixturesPage = () => {
  const matches = [
    {
      id: 1,
      team1: { name: 'TBD', logo: '/assets/tbd.png' },
      team2: { name: 'TBD', logo: '/assets/tbd.png' },
      date: 'Date and Day TBD',
      time: 'Time TDB',
      stadium: 'Stadium TBD'
    },
    {
      id: 2,
      team1: { name: 'TBD', logo: '/assets/tbd.png' },
      team2: { name: 'TBD', logo: '/assets/tbd.png' },
      date: 'Date and Day TBD',
      time: 'Time TDB',
      stadium: 'Stadium TBD'
    },
    {
      id: 3,
      team1: { name: 'TBD', logo: '/assets/tbd.png' },
      team2: { name: 'TBD', logo: '/assets/tbd.png' },
      date: 'Date and Day TBD',
      time: 'Time TDB',
      stadium: 'Stadium TBD'
    },
    {
      id: 4,
      team1: { name: 'TBD', logo: '/assets/tbd.png' },
      team2: { name: 'TBD', logo: '/assets/tbd.png' },
      date: 'Date and Day TBD',
      time: 'Time TDB',
      stadium: 'Stadium TBD'
    }
  ];

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
              FIXTURES
            </h1>
          </div>
        </div>
      </section>

      {/* New Heading and Subheading Section */}
      <section className="bg-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-main text-[#180444] mb-4 md:mb-6 leading-tight">
              Every Clash. Every Battle. Every Moment – Don't Miss Out.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed">
              15+ matches • 7 Days • 8 teams • Non-stop kabaddi action in Dubai.<br />
              Stay tuned for the full Season 2 schedule.
            </p>
          </div>
        </div>
      </section>

      {/* Match Cards Section */}
      <section className="pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 md:space-y-8">
            {matches.map((match) => (
              <div key={match.id} className="relative">
                {/* White gap between cards */}
                <div className="h-3 md:h-4 bg-white"></div>
                
                {/* Match card */}
                <div className="bg-[#29066d] rounded-t-[20px] rounded-b-[10px] shadow-2xl overflow-hidden border-2 border-[#180444]">
                  <div className="p-4 sm:p-6 md:p-10">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                      
                      {/* Teams Section */}
                      <div className="flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8 lg:justify-start lg:flex-1">
                        {/* Team 1 */}
                        <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 border-[#180444] bg-white p-1">
                            <img 
                              src={match.team1.logo} 
                              alt={match.team1.name}
                              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                            />
                          </div>
                          <span className="text-white font-bold text-xs sm:text-sm md:text-base text-center max-w-[100px] sm:max-w-[120px] break-words">
                            {match.team1.name}
                          </span>
                        </div>

                        {/* VS Badge */}
                        <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                          <div className="bg-white rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center border-2 border-[#180444] shadow-lg">
                            <span className="text-[#180444] font-extrabold text-sm sm:text-base md:text-lg lg:text-xl">
                              VS
                            </span>
                          </div>
                          <div className="bg-[#180444] text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase">
                            Upcoming
                          </div>
                        </div>

                        {/* Team 2 */}
                        <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 border-[#180444] bg-white p-1">
                            <img 
                              src={match.team2.logo} 
                              alt={match.team2.name}
                              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                            />
                          </div>
                          <span className="text-white font-bold text-xs sm:text-sm md:text-base text-center max-w-[100px] sm:max-w-[120px] break-words">
                            {match.team2.name}
                          </span>
                        </div>
                      </div>

                      {/* Vertical Separator for Desktop */}
                      <div className="hidden lg:block w-px h-20 bg-white mx-4 lg:mx-6 xl:mx-8"></div>

                      {/* Match Details */}
                      <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-3 sm:space-y-4 lg:flex-1">
                        {/* Date */}
                        <div className="text-white font-semibold text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">
                          {match.date}
                        </div>
                        
                        {/* Time and Stadium */}
                        <div className="flex flex-col items-center lg:items-end space-y-2">
                          <div className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
                            {match.time}
                          </div>
                          <div className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-base xl:text-lg max-w-[250px] sm:max-w-[300px]">
                            {match.stadium}
                          </div>
                        </div>

                        {/* CTA Button */}
                        {/* <button className="bg-white hover:bg-gray-100 text-[#180444] font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 mt-2 sm:mt-4">
                          Set Reminder
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {/* <div className="text-center mt-10 md:mt-12">
            <button className="bg-[#29066d] hover:bg-[#180444] text-white font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-full text-base sm:text-lg md:text-xl transition-all duration-300 transform hover:scale-105">
              Load More Matches
            </button>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default FixturesPage;