import { HeroOvenExperience } from "@/components/HeroOvenExperience";
import { MenuExperience } from "@/components/MenuExperience";
import { SocialProof } from "@/components/SocialProof";
import { InstagramSection } from "@/components/InstagramSection";
import { About } from "@/components/About";
import { Location } from "@/components/Location";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0503] font-sans text-amber-50 antialiased">
      <HeroOvenExperience />
      <MenuExperience />
      <SocialProof />
      <InstagramSection />
      <About />
      <Location />
      <Gallery />
      <Footer />
    </div>
  );
}
