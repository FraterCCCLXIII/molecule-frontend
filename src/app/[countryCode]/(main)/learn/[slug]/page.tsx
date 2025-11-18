import { Metadata } from "next"
import { notFound } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

type Props = {
  params: Promise<{ slug: string; countryCode: string }>
}

async function getBlogArticle(slug: string) {
  try {
    const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
    const response = await fetch(`${backendUrl}/store/blog/articles/${slug}`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.article
  } catch (error) {
    console.error("Error fetching blog article:", error)
    return null
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const article = await getBlogArticle(params.slug)

  if (!article) {
    return {
      title: "Article Not Found | Molecule",
    }
  }

  return {
    title: article.seo_title || article.title || "Learn Article | Molecule",
    description: article.seo_description || article.subtitle || "",
    keywords: article.seo_keywords || "",
  }
}

export default async function BlogArticlePage(props: Props) {
  const params = await props.params
  const article = await getBlogArticle(params.slug)

  if (!article) {
    notFound()
  }

  // Render EditorJS body content
  const renderBody = (body: any) => {
    if (!body || !body.blocks) {
      return <p className="text-gray-600">No content available.</p>
    }

    return body.blocks.map((block: any, index: number) => {
      switch (block.type) {
        case "paragraph":
          return (
            <p key={index} className="text-lg text-gray-700 leading-relaxed mb-4">
              {block.data?.text}
            </p>
          )
        case "header":
          const HeaderTag = `h${block.data?.level || 2}` as keyof JSX.IntrinsicElements
          return (
            <HeaderTag
              key={index}
              className={`font-bold text-gray-900 mb-4 mt-8 ${
                block.data?.level === 1
                  ? "text-4xl"
                  : block.data?.level === 2
                  ? "text-3xl"
                  : "text-2xl"
              }`}
            >
              {block.data?.text}
            </HeaderTag>
          )
        case "list":
          const ListTag = block.data?.style === "ordered" ? "ol" : "ul"
          return (
            <ListTag
              key={index}
              className={`mb-4 ${
                block.data?.style === "ordered" ? "list-decimal" : "list-disc"
              } list-inside`}
            >
              {block.data?.items?.map((item: any, itemIndex: number) => (
                <li key={itemIndex} className="text-lg text-gray-700 mb-2">
                  {item.content}
                </li>
              ))}
            </ListTag>
          )
        case "quote":
          return (
            <blockquote
              key={index}
              className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4"
            >
              {block.data?.text}
            </blockquote>
          )
        case "code":
          return (
            <pre
              key={index}
              className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"
            >
              <code className="text-sm">{block.data?.code}</code>
            </pre>
          )
        default:
          return null
      }
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <LocalizedClientLink
          href="/learn"
          className="text-gray-600 hover:text-gray-900 mb-8 inline-block"
        >
          ← Back to Learn
        </LocalizedClientLink>

        {article.thumbnail_image && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={article.thumbnail_image}
                alt={article.title || "Learn article"}
                fill
                className="object-cover"
              />
          </div>
        )}

        <article>
          {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
          )}

          {article.author && (
            <p className="text-gray-500 mb-8">By {article.author}</p>
          )}

          <div className="prose prose-lg max-w-none">
            {article.body ? renderBody(article.body) : null}
          </div>
        </article>
      </div>
    </div>
  )
}

