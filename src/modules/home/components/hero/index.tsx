import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Star from "@modules/common/icons/star"

const Hero = () => {
  return (
    <section className="w-full relative bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Star Rating */}
          <div className="flex justify-center items-center gap-1 mb-4">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          
          {/* Verified Text */}
          <p className="text-sm md:text-base text-gray-600 mb-8 font-medium">
            Verified Purity & US Shipping
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 max-w-4xl mx-auto leading-tight">
            Research-Grade Peptides, <em className="font-normal italic">delivered</em>
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
