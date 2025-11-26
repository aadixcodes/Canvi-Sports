
import BannerSection from '../components/BannerSection'

const PointsTablePage = () => {
  // Updated team data with new names and zero values
  const teams = [
    { position: 1, name: "MP Titans", played: 0, won: 0, lost: 0, scoreDiff: "+0", form: ["-", "-", "-", "-", "-"], points: 0 },
    { position: 2, name: "Haryana Heroes", played: 0, won: 0, lost: 0, scoreDiff: "+0", form: ["-", "-", "-", "-", "-"], points: 0 },
    { position: 3, name: "Gujarat Gladiators", played: 0, won: 0, lost: 0, scoreDiff: "+0", form: ["-", "-", "-", "-", "-"], points: 0 },
    { position: 4, name: "Dhakad Delhi", played: 0, won: 0, lost: 0, scoreDiff: "+0", form: ["-", "-", "-", "-", "-"], points: 0 },
    { position: 5, name: "Mumbai Monarchs", played: 0, won: 0, lost: 0, scoreDiff: "+0", form: ["-", "-", "-", "-", "-"], points: 0 },
    { position: 6, name: "Rajasthan Rebels", played: 0, won: 0, lost: 0, scoreDiff: "+0", form: ["-", "-", "-", "-", "-"], points: 0 },
    { position: 7, name: "Kolkata Kings", played: 0, won: 0, lost: 0, scoreDiff: "+0", form: ["-", "-", "-", "-", "-"], points: 0 },
    { position: 8, name: "Dabang UP", played: 0, won: 0, lost: 0, scoreDiff: "+0", form: ["-", "-", "-", "-", "-"], points: 0 }
  ];

  const getFormIcon = (result) => {
    if (result === "W") {
      return <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">W</div>;
    } else if (result === "L") {
      return <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">L</div>;
    } else {
      return <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">-</div>;
    }
  };

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
              STANDINGS 
            </h1>
          </div>
        </div>
      </section>
      
      {/* Points Table Header Section with Logo */}
      <section className="bg-white py-12 md:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {/* Logo Image */}
            <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl overflow-hidden">
              <img 
                src="/assets/Logo CPKL.png" 
                alt="League Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Vertical Line */}
            <div className="h-32 bg-[#29066D] w-1"></div>
            
            {/* Points Table Text */}
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-main text-[#180444] mb-4">
                Points Table
              </h1>
              <p className="text-lg text-gray-600">
                Season 2025 Standings
              </p>
            </div>
          </div>

          {/* New Heading Line and CTA Button */}
          <div className="mt-12 mb-4 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-main text-black-90 mb-4 md:mb-6">
              Who Rules the Court? Follow the Action Live.
            </h2>
            <button className="bg-[#29066d] hover:bg-[#180444] text-white py-2 px-6 rounded-lg text-md md:text-lg transition duration-300">
              View Live Stats
            </button>
          </div>
        </div>
      </section>

      {/* Points Table Section */}
      <section className="pb-12 pt-2 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead>
                  <tr className="text-black text-sm md:text-base">
                    <th className="bg-gray-400 py-4 px-2 text-center rounded-tl-2xl w-16">#</th>
                    <th className="bg-gray-400 py-4 px-4 text-left w-48">TEAM</th>
                    <th className="bg-gray-400 py-4 px-2 text-center w-16">P</th>
                    <th className="bg-gray-400 py-4 px-2 text-center w-16">W</th>
                    <th className="bg-gray-400 py-4 px-2 text-center w-16">L</th>
                    <th className="bg-gray-400 py-4 px-2 text-center w-24">SCORE DIFF</th>
                    <th className="bg-gray-400 py-4 px-2 text-center w-32">FORM</th>
                    <th className="bg-gray-400 py-4 px-2 text-center rounded-tr-2xl w-16">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.position} className={index > 0 ? "border-t border-white" : ""}>
                      <td className="bg-[#180444] py-4 px-2 text-center font-bold border-r border-purple-800 text-white">
                        {team.position}
                      </td>
                      <td className="bg-[#29066d] py-4 px-4 border-r border-purple-800 font-medium text-white">
                        {team.name}
                      </td>
                      <td className="bg-[#180444] py-4 px-2 text-center border-r border-purple-800 text-white">
                        {team.played}
                      </td>
                      <td className="bg-[#180444] py-4 px-2 text-center border-r border-purple-800 text-white">
                        {team.won}
                      </td>
                      <td className="bg-[#180444] py-4 px-2 text-center border-r border-purple-800 text-white">
                        {team.lost}
                      </td>
                      <td className="bg-[#180444] py-4 px-2 text-center border-r border-purple-800 font-medium text-white">
                        {team.scoreDiff}
                      </td>
                      <td className="bg-[#180444] py-4 px-2 text-center border-r border-purple-800">
                        <div className="flex justify-center space-x-1">
                          {team.form.map((result, idx) => (
                            <div key={idx}>
                              {getFormIcon(result)}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="bg-[#180444] py-4 px-2 text-center font-bold text-white">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Table */}
            <div className="block md:hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-black text-sm">
                    <th className="bg-gray-400 py-3 px-1 text-center rounded-tl-2xl w-12">#</th>
                    <th className="bg-gray-400 py-3 px-2 text-left w-32">TEAM</th>
                    <th className="bg-gray-400 py-3 px-1 text-center w-10">P</th>
                    <th className="bg-gray-400 py-3 px-1 text-center w-10">W</th>
                    <th className="bg-gray-400 py-3 px-1 text-center w-10">L</th>
                    <th className="bg-gray-400 py-3 px-1 text-center w-16">DIFF</th>
                    <th className="bg-gray-400 py-3 px-1 text-center w-20">FORM</th>
                    <th className="bg-gray-400 py-3 px-1 text-center rounded-tr-2xl w-12">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.position} className={index > 0 ? "border-t border-white" : ""}>
                      <td className="bg-[#180444] py-3 px-1 text-center font-bold border-r border-purple-800 text-white text-xs">
                        {team.position}
                      </td>
                      <td className="bg-[#29066d] py-3 px-2 border-r border-purple-800 font-medium text-white text-xs">
                        {team.name}
                      </td>
                      <td className="bg-[#180444] py-3 px-1 text-center border-r border-purple-800 text-white text-xs">
                        {team.played}
                      </td>
                      <td className="bg-[#180444] py-3 px-1 text-center border-r border-purple-800 text-white text-xs">
                        {team.won}
                      </td>
                      <td className="bg-[#180444] py-3 px-1 text-center border-r border-purple-800 text-white text-xs">
                        {team.lost}
                      </td>
                      <td className="bg-[#180444] py-3 px-1 text-center border-r border-purple-800 font-medium text-white text-xs">
                        {team.scoreDiff}
                      </td>
                      <td className="bg-[#180444] py-3 px-1 text-center border-r border-purple-800">
                        <div className="flex justify-center space-x-0.5">
                          {team.form.map((result, idx) => (
                            <div key={idx} className="scale-75">
                              {getFormIcon(result)}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="bg-[#180444] py-3 px-1 text-center font-bold text-white text-xs">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend for Mobile */}
          <div className="block md:hidden mt-4 text-center text-xs text-gray-600">
            <p>P: Played, W: Won, L: Lost, DIFF: Score Difference, PTS: Points</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default PointsTablePage