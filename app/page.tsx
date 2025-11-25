import Hero from "./(componentes)/Hero";
import CategorySection from "@/components/HomeSections/Categories";
import MeetOurMakers from "@/components/HomeSections/ArstianSection";
import Impression from "@/components/HomeSections/aboutSection/Section";
import Events from "@/components/HomeSections/BlogEventSection/Section";


export default function Home() {
  return (
    <main className="font-sans">
      <Hero />
      <CategorySection />
      <Impression />
      <MeetOurMakers />
      <Events/>
    </main>
  );
}
