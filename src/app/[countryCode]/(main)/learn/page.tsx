import { Metadata } from "next"
import { notFound } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Learn | Molecule",
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
          Learn
        </h1>

        {articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <LocalizedClientLink
                key={article.id}
                href={`/learn/${article.url_slug}`}
                className="group"
              >
                <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  {article.thumbnail_image && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={article.thumbnail_image}
                        alt={article.title || "Learn article"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 3).map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {article.title}
                    </h2>
                    {article.subtitle && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.subtitle}
                      </p>
                    )}
                    {article.author && (
                      <p className="text-sm text-gray-500">
                        By {article.author}
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

