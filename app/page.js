import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BannerSection from './components/BannerSection'
import MatchesSection from './components/MatchesSection'
import TeamsSection from './components/TeamsSection'
import BlogsSection from './components/BlogsSection'
import NewsSection from './components/NewsSection'
import IconPlayerSection from './components/IconPlayerSection'
import PartnersSection from './components/PartnersSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-primary">
      {/* <Navbar /> */}
      {/* <main> */}
        <BannerSection />
        <MatchesSection />
        <TeamsSection />
        <BlogsSection />
        <NewsSection />
        <IconPlayerSection />
        <PartnersSection />
      {/* </main> */}
      {/* <Footer /> */}
    </div>
  )
}