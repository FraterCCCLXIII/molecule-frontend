import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Star from "@modules/common/icons/star"

const Hero = () => {
  return (
    <section className="w-full relative bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          {/* Star Rating & Verified Text Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              <Star className="w-3 h-3" />
              <Star className="w-3 h-3" />
              <Star className="w-3 h-3" />
              <Star className="w-3 h-3" />
            </div>
            <span className="text-sm text-gray-600 font-space-mono" style={{ fontFamily: "var(--font-space-mono), monospace" }}>
              Verified Purity & US Shipping
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 max-w-4xl leading-tight">
            Research-grade Peptides for Advanced Protocols
          </h1>

          {/* CTA Button */}
          <div className="mt-8">
            <LocalizedClientLink
              href="/store"
              className="inline-block px-8 py-4 bg-black text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-colors"
            >
              Shop Peptides
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
