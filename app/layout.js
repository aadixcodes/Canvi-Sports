import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'Canvi Premier Kabaddi League (CPKL) | Global Kabaddi Revolution',
  description:
    'Experience the Canvi Premier Kabaddi League (CPKL) — India’s fastest-growing kabaddi league now stepping into Dubai for Season 2. Power. Passion. Global Pride.',
  keywords: [
    'Canvi Premier Kabaddi League',
    'CPKL',
    'CPKL 2025',
    'Canvi Sports Federation',
    'Kabaddi League India',
    'Franchise Kabaddi Tournament',
    'Professional Kabaddi League',
    'Global Kabaddi League',
    'Kabaddi in Dubai',
    'Indian Kabaddi Players',
    'Kabaddi Sports News',
    'Kabaddi Talent India',
    'CPKL Season 2',
    'Indian Kabaddi League 2025',
    'Kabaddi Global Expansion',
    'CPKL Official Website',
    'Canvi Kabaddi League',
  ],
  openGraph: {
    title: 'Canvi Premier Kabaddi League (CPKL) | Global Kabaddi Revolution',
    description:
      'CPKL brings the thrill of Indian kabaddi to Dubai — world-class players, elite franchises, and international passion for the game.',
    url: 'https://www.cpklofficial.com',
    type: 'website',
    images: [
      {
        url: 'https://www.cpklofficial.com/assets/images/cpkl-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Canvi Premier Kabaddi League (CPKL) banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canvi Premier Kabaddi League (CPKL)',
    description:
      'Experience the power, pride, and passion of kabaddi with CPKL Season 2 in Dubai.',
    images: ['https://www.cpklofficial.com/assets/images/cpkl-banner.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
