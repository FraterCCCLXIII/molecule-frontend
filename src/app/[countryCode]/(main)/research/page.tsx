import { Metadata } from "next"
import { notFound } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Research | Molecule",
  description: "Read our latest articles about research peptides and compounds.",
}

async function getBlogArticles() {
  try {
    const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    
    if (!publishableKey) {
      console.error("NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is not set")
      return { articles: [], count: 0 }
    }
    
    const response = await fetch(`${backendUrl}/store/blog/articles?take=50`, {
      next: { revalidate: 60 },
      headers: {
        "x-publishable-api-key": publishableKey,
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch blog articles:", response.status, response.statusText)
      return { articles: [], count: 0 }
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching blog articles:", error)
    return { articles: [], count: 0 }
  }
}

export default async function BlogPage() {
  const { articles, count } = await getBlogArticles()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Research
        </h1>

        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <LocalizedClientLink
                key={article.id}
                href={`/research/${article.url_slug}`}
              >
                <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-900 transition-colors">
                  <div className="aspect-square overflow-hidden relative bg-gray-200">
                    {article.thumbnail_image ? (
                      <Image
                        src={article.thumbnail_image}
                        alt={article.title || "Research article"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          id="Isolation_Mode"
                          data-name="Isolation Mode"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 42.05 48.55"
                          className="w-16 h-16"
                        >
                          <defs>
                            <style>
                              {`.cls-1 { fill: #d1d5db; } .cls-2 { fill: #e5e7eb; }`}
                            </style>
                          </defs>
                          <polygon
                            className="cls-1"
                            points="42.05 36.41 42.05 12.14 21.02 0 0 12.14 0 36.41 21.02 48.55 42.05 36.41"
                          />
                          <polygon
                            className="cls-2"
                            points="21.41 43.23 20.63 41.89 36.47 32.75 37.25 34.09 21.41 43.23"
                          />
                          <rect
                            className="cls-2"
                            x="4.41"
                            y="15.13"
                            width="1.55"
                            height="18.29"
                          />
                          <polygon
                            className="cls-2"
                            points="36.47 15.8 20.63 6.66 21.41 5.32 37.25 14.46 36.47 15.8"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                      {article.title}
                    </h3>
                    {article.subtitle && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {article.subtitle}
                      </p>
                    )}
                  </div>
                </article>
              </LocalizedClientLink>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No blog articles available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

