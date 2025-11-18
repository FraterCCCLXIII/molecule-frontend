import Image from "next/image"

const ImageBanner = () => {
  return (
    <section className="w-full relative">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Replace /images/vial.png with your banner image when available */}
        <Image
          src="/images/vial.png"
          alt="Premium Research Peptides"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
    </section>
  )
}

export default ImageBanner

