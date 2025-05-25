import CTASection from "@/components/home/CTASection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorkSection from "@/components/home/HowItWorkSection";
import PricingSection from "@/components/home/PricingSection";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <HeroSection />
        <HowItWorkSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
