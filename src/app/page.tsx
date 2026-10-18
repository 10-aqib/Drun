import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollection from "@/components/FeaturedCollection";
import EditorialManifesto from "@/components/EditorialManifesto";
import CraftsmanshipIdentity from "@/components/CraftsmanshipIdentity";
import ThreeStepExperience from "@/components/ThreeStepExperience";
import SignatureTransition from "@/components/SignatureTransition";
import DarkCraftsmanship from "@/components/DarkCraftsmanship";
import ContrastingCards from "@/components/ContrastingCards";
import SignatureCarousel from "@/components/SignatureCarousel";
import BrandHeritage from "@/components/BrandHeritage";
import FAQSection from "@/components/FAQSection";
import AtmosphericContact from "@/components/AtmosphericContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0] overflow-hidden selection:bg-[#FA9D60] selection:text-[#101412]">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero Section (00:00 - 00:04) */}
      <Hero />

      {/* 3. Featured Footwear Collection (00:14 - 00:18) */}
      <FeaturedCollection />

      {/* 4. White Editorial Manifesto with Progressive Reveal (00:18 - 00:22) */}
      <EditorialManifesto />

      {/* 5. Craftsmanship Identity & 5 Benefits (00:23 - 00:28) */}
      <CraftsmanshipIdentity />

      {/* 6. Three-Step Shopping Experience (00:28 - 00:31) */}
      <ThreeStepExperience />

      {/* 7. Signature 3D Particle Arch Transition (00:32 - 00:35) */}
      <SignatureTransition />

      {/* 8. Dark Craftsmanship Showcase & Four Cards (00:35 - 00:39) */}
      <DarkCraftsmanship />

      {/* 9. Two Contrasting Collection Cards (00:40 - 00:44) */}
      <ContrastingCards />

      {/* 10. Cinematic Product Carousel (00:44 - 00:48) */}
      <SignatureCarousel />

      {/* 11. Brand Heritage & Workshop Photography (00:49 - 00:51) */}
      <BrandHeritage />

      {/* 12. Minimalist Accordion FAQ (00:52 - 00:54) */}
      <FAQSection />

      {/* 13. Atmospheric Night Contact Form (00:55 - 01:01) */}
      <AtmosphericContact />

      {/* 14. Final Call to Action & Luxury Footer (01:02 - 01:05) */}
      <Footer />
    </main>
  );
}
