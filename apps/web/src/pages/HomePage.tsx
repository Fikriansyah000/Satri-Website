import { Header, Footer } from '@/components/layout'
import { HeroSection, ProductSection, FeaturesSection } from '@/components/sections'

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProductSection />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
