import { Metadata } from "next"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "Peptide Guide | Molecule",
  description:
    "Comprehensive guide to peptides, their uses, storage, handling, and best practices for research applications.",
}

const guides = [
  {
    title: "Peptides and Amino Acids: A Beginner's Guide",
    description:
      "Start your exploration with the fundamentals of peptide science. This introduction explores the 20 standard amino acids, how peptide bonds form complex chains, and key differences between peptides and proteins.",
    image: "/images/pexels-anastasia-shuraeva-7663296.jpg",
  },
  {
    title: "Peptide Synthesis: How Peptides Are Made and Manufactured",
    description:
      "Discover how modern peptide synthesis has evolved from niche laboratory techniques to essential biomedical research tools. This comprehensive guide explores major synthesis methods including solid-phase (SPPS) and liquid-phase (LPPS).",
    image: "/images/pexels-bamboo-ave-677926128-29205121.jpg",
  },
  {
    title: "Introduction to Peptide Purification Techniques",
    description:
      "Master essential peptide purification techniques to ensure clean, reliable research results. This guide covers reversed-phase chromatography, ion-exchange methods, size exclusion, and advanced techniques like HILIC.",
    image: "/images/pexels-chokniti-khongchum-1197604-2280549.jpg",
  },
  {
    title: "Peptide Quality Control: Methods, Standards and Best Practices",
    description:
      "Ensure research success with comprehensive peptide quality control methods and standards. This guide covers essential analytical techniques including HPLC, mass spectrometry, and NMR.",
    image: "/images/pexels-fotios-photos-734973.jpg",
  },
  {
    title: "The Basics of Peptide Modification: What You Need to Know",
    description:
      "Discover essential peptide modification techniques that enhance stability, solubility, and functionality for research applications. This guide covers post-translational modifications and chemical enhancements like PEGylation.",
    image: "/images/pexels-jonathanborba-3076509.jpg",
  },
  {
    title: "Peptide Stability: Guidelines and SOPs for Handling and Storage",
    description:
      "Protect your research investment with proven peptide stability guidelines and handling protocols. This comprehensive guide covers storage conditions for lyophilized and solution forms.",
    image: "/images/pexels-mediocrememories-954584.jpg",
  },
  {
    title: "Peptide Nomenclature: Reference for Naming and Abbreviations",
    description:
      "Navigate essential peptide naming conventions with confidence in this reference guide to IUPAC-IUBMB nomenclature standards. Learn amino acid codes, proper sequence notation, and modification symbols.",
    image: "/images/pexels-mediocrememories-954585.jpg",
  },
  {
    title: "Peptide Glossary: Essential Definitions and Terminology",
    description:
      "Master the language of peptide science with our comprehensive glossary of terms and definitions. An invaluable reference for researchers at all levels working with peptides.",
    image: "/images/pexels-ron-lach-10534008.jpg",
  },
]

export default async function PeptideGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-6">
              <svg
                className="w-4 h-4 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                />
              </svg>
              <span className="text-sm text-gray-600 font-space-mono" style={{ fontFamily: "var(--font-space-mono), monospace" }}>
                USA-made research peptides for laboratory use only
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Research Guide:
              <br />
              <span className="text-gray-600">An Online Reference for Researchers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
              Research peptides are key to advancing science in biochemistry, cell biology and
              molecular research. This knowledge center provides laboratory scientists with the
              technical information and practical guidance to select, handle and work with
              research-grade peptides for in vitro and ex vivo applications.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden">
            <div className="relative w-full h-[500px]">
              <Image
                src="/images/pexels-edward-jenner-4033152.jpg"
                alt="Research laboratory"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 leading-relaxed">
            USA-made research peptides are for laboratory use only and not for human consumption,
            clinical use or diagnostic purposes. This guide is destined to supporting scientific
            research through proper peptide selection, handling and experimental design.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Your Online Peptide Guide for Research Applications
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
            Whether you're new to peptide research or looking to expand your laboratory's
            capabilities, this guide to peptides is your go-to resource for understanding,
            synthesizing, and working with research peptides. From basics to advanced techniques, we
            have compiled the most important information to support your scientific investigations.
          </p>
        </div>
      </section>

      {/* Peptides in Research Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Peptides in Research</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Peptides are short chains of amino acids that play crucial roles in biological
                  processes, making them invaluable tools for scientific research. These versatile
                  molecules serve as hormones, neurotransmitters, signaling compounds, and
                  regulatory factors in living systems.
                </p>
                <p>
                  For laboratory researchers, peptides offer unique advantages in studying cellular
                  mechanisms, protein interactions, and biochemical pathways through controlled in
                  vitro and ex vivo experimental systems.
                </p>
                <p>
                  The peptide research field has grown dramatically in recent years, driven by
                  advances in synthesis technologies and a better understanding of peptide biology.
                </p>
                <p>
                  Today's research labs rely on high-quality, well-characterized peptides to conduct
                  reproducible experiments and generate meaningful data in controlled environments.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/images/pexels-chokniti-khongchum-1197604-2280547.jpg"
                  alt="Peptides in research"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Quality Matters Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden order-2 md:order-1">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/images/pexels-artempodrez-5726794.jpg"
                  alt="Quality matters in research"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Quality Matters in Peptide Research
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Your research depends heavily on the quality and consistency of your peptides.
                  Purity, stability and proper storage can make a big difference in your
                  outcomes. Understanding these key factors ensures reliable results and supports the
                  integrity of your scientific work.
                </p>
                <p>
                  Modern peptide synthesis and purification techniques allow for the production of
                  research grade peptides with defined specifications so you can work with confidence
                  in your experimental design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Guides Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Essential Peptide Research Guides</h2>
          <p className="text-lg text-gray-600 mb-16">Choose Your Focus</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-900 transition-colors"
              >
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{guide.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tools and Resources for Peptide Researchers
          </h2>
          <p className="text-lg text-gray-600 mb-16">Discover our growing library of tools and resources</p>

          <div className="grid md:grid-cols-2 gap-8">
            <LocalizedClientLink href="/calculator">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 p-8 hover:border-gray-900 transition-colors cursor-pointer">
                <div className="rounded-2xl overflow-hidden mb-6 relative h-64">
                  <Image
                    src="/images/pexels-googledeepmind-25626518.jpg"
                    alt="Peptide Calculator"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Peptide Calculator</h3>
                <p className="text-gray-600 leading-relaxed">
                  Accurately reconstitute lyophilized peptides for research applications with this
                  easy-to-use dilution calculator and guide. Learn proper techniques for dissolving
                  freeze-dried peptides, choosing appropriate diluents, calculating concentrations,
                  and avoiding common mistakes.
                </p>
              </div>
            </LocalizedClientLink>

            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 p-8">
              <div className="rounded-2xl overflow-hidden mb-6 relative h-64">
                <Image
                  src="/images/pexels-polina-tankilevitch-3735766.jpg"
                  alt="Vacuum Sealing"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Why Some Vials Aren't Vacuum Sealed?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Vacuum sealing isn't required for peptide quality or research effectiveness. Learn
                why some research-grade peptide vials lack vacuum seals, quality indicators to assess,
                and when absence of vacuum is normal versus concerning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            Research peptides are for laboratory use only and not intended for human consumption or
            clinical applications.
          </p>
        </div>
      </footer>
    </div>
  )
}

