// /app/page.tsx
import { createClient } from "@/supabase/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/layout/HeroSection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FeaturesSection } from "@/components/section/FeaturesSection";
import { StatsSection } from "@/components/section/StatsSection";
import { HowItWorksSection } from "@/components/section/HowItWorksSection";
import { NewsletterSection } from "@/components/section/NewsletterSection";
import { TestimonialsSection } from "@/components/section/TestimonialsSection";

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*, category:categories(id, name, slug, created_at)")
      .order("created_at", { ascending: false }),
    supabase.from("categories").select("*").order("name"),
  ]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <NewsletterSection />
        <TestimonialsSection />
        <ProductGrid products={products || []} categories={categories || []} />
      </main>
      <Footer />
    </div>
  );
}
