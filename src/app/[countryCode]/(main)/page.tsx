import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import ImageBanner from "@modules/home/components/image-banner"
import TextSection from "@modules/home/components/text-section"
import ProductCarousel from "@modules/home/components/product-carousel"
import FeaturesList from "@modules/home/components/features-list"
import FAQ from "@modules/home/components/faq"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Molecule - Premium Research Peptides & Compounds",
  description:
    "Laboratory-grade research peptides and compounds for research purposes only.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  try {
    const params = await props.params

    const { countryCode } = params

    const region = await getRegion(countryCode)

    // Fetch products for the carousel
    const { response: { products } } = await listProducts({
      countryCode,
      queryParams: {
        limit: 12,
        fields: "*variants.calculated_price",
      },
    })

    return (
      <div className="min-h-screen">
        {/* Hero Section with Star Rating and CTA */}
        <Hero />
        
        {/* Image Banner Section */}
        <ImageBanner />
        
        {/* Text Section */}
        <TextSection />
        
        {/* Featured Products Carousel Section */}
        {products && products.length > 0 && region && (
          <section className="w-full py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Featured Peptides
                </h2>
                <LocalizedClientLink
                  href="/store"
                  className="text-gray-900 font-semibold hover:text-gray-700 flex items-center gap-2 transition-colors"
                >
                  <span>Shop Peptides</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 22 22"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      d="M5 12L18 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 6L19 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 18L19 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeLinejoin="round"
                    />
                  </svg>
                </LocalizedClientLink>
              </div>
              <ProductCarousel products={products} region={region} />
            </div>
          </section>
        )}

        {/* Features List Section */}
        <FeaturesList />

        {/* FAQ Section */}
        <FAQ />
      </div>
    )
  } catch (error) {
    console.error("Error rendering homepage:", error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error loading page</h1>
          <p className="text-gray-600">{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </div>
    )
  }
}
