import Bestseller from "../components/section/Bestseller";
import FeaturedProductTabs from "../components/section/FeaturedProductTabs";
import HeroSection from "../components/section/HeroSection";
import NewsletterSection from "../components/section/NewsletterSection";
import OurLatestNews from "../components/section/OurLatestNews";
import OurPartner from "../components/section/OurPartner";


const PartdoHomePage = () => {
  return (
    <div className="min-h-screen bg-white">
     
      <HeroSection />
      <FeaturedProductTabs />
      <Bestseller />
      <OurLatestNews/>
      <OurPartner />
      <NewsletterSection />
    
    </div>
  );
};

export default PartdoHomePage;
