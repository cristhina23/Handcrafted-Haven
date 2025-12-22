import CategorySection from "@/components/HomeSections/Categories";
import MeetOurMakers from "@/components/HomeSections/ArstianSection";
import Impression from "@/components/HomeSections/aboutSection/Section";
import Events from "@/components/HomeSections/BlogEventSection/Section";
import Hero from "@/components/Hero/Hero";
import BecomeSeller from "@/components/HomeSections/BecomeSeller/BecomeSeller";
import ProductsSection from "@/components/HomeSections/products/ProductsSection";


export default function Home() {
  return (
    <>
      <div >
        <Hero />
        <ProductsSection />
        <CategorySection />
        <MeetOurMakers />
        <BecomeSeller />
        <Impression />
        <Events />
      </div>
    </>
  );
}
