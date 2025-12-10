import CategorySection from "@/components/HomeSections/Categories";
import MeetOurMakers from "@/components/HomeSections/ArstianSection";
import Impression from "@/components/HomeSections/aboutSection/Section";
import Events from "@/components/HomeSections/BlogEventSection/Section";
import Hero from "@/components/Hero/Hero";
import BecomeSeller from "@/components/HomeSections/BecomeSeller/BecomeSeller";


export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <Impression />
      <MeetOurMakers />
      <Events/>
      <BecomeSeller
    </>
  );
}
