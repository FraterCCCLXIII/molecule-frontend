"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { useParams } from "next/navigation"
import { X } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SearchResult = {
  type: "product" | "page" | "research"
  id: string
  title: string
  description?: string
  href: string
  thumbnail?: string
}

type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const params = useParams()
  const countryCode = (params?.countryCode as string) || "us"

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
    } else {
      // Trigger exit animation
      setIsAnimating(false)
      // Clean up after animation completes
      const timer = setTimeout(() => {
        setQuery("")
        setResults([])
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure animation has started
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isOpen])

  // Close on Escape key and prevent body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Search function
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    const searchResults: SearchResult[] = []

    try {
      // Search products
      const productsResponse = await fetch(
        `/api/search/products?q=${encodeURIComponent(searchQuery)}&countryCode=${countryCode}`
      )
      if (productsResponse.ok) {
        const products = await productsResponse.json()
        products.forEach((product: HttpTypes.StoreProduct) => {
          searchResults.push({
            type: "product",
            id: product.id,
            title: product.title,
            description: product.description || undefined,
            href: `/products/${product.handle}`,
            thumbnail: product.thumbnail || undefined,
          })
        })
      }

      // Search pages (static pages)
      const pages = [
        { title: "About Us", href: "/pages/about-us" },
        { title: "Contact Us", href: "/pages/contact" },
        { title: "Peptide Guide", href: "/pages/peptide-guide" },
        { title: "Terms of Service", href: "/pages/terms-of-service" },
        { title: "Privacy Policy", href: "/pages/privacy-policy" },
        { title: "Returns & Refunds", href: "/pages/returns-and-refunds" },
      ]

      pages.forEach((page) => {
        if (page.title.toLowerCase().includes(searchQuery.toLowerCase())) {
              searchResults.push({
                type: "page",
                id: page.href,
                title: page.title,
                href: page.href,
              })
        }
      })

      // Search research articles
      const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
      const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

      if (publishableKey) {
        const articlesResponse = await fetch(
          `${backendUrl}/store/blog/articles?take=50`,
          {
            headers: {
              "x-publishable-api-key": publishableKey,
            },
          }
        )

        if (articlesResponse.ok) {
          const data = await articlesResponse.json()
          const articles = data.articles || []
          articles.forEach((article: any) => {
            const titleMatch = article.title?.toLowerCase().includes(searchQuery.toLowerCase())
            const subtitleMatch = article.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
            
            if (titleMatch || subtitleMatch) {
              searchResults.push({
                type: "research",
                id: article.id,
                title: article.title,
                description: article.subtitle,
                href: `/research/${article.url_slug}`,
                thumbnail: article.thumbnail_image || undefined,
              })
            }
          })
        }
      }
    } catch (error) {
      console.error("Search error:", error)
    }

    setResults(searchResults)
    setIsLoading(false)
  }

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, countryCode])

  if (!isOpen && !isAnimating) return null

  const modalContent = (
    <div className="fixed inset-0 z-[100]">
      {/* Blurred background - matching mobile nav overlay, covers entire page */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-150 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        className="absolute inset-0 flex items-start justify-center pt-20 px-4 pointer-events-none"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        <div
          className={`relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto transition-all duration-150 ease-out ${
            isAnimating
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-2 scale-[0.98]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
        {/* Search input */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-200">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, pages, and research..."
            className="flex-1 text-lg outline-none border-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Searching...</div>
          ) : query.trim() && results.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No results found for "{query}"
            </div>
          ) : query.trim() && results.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {results.map((result) => (
                <LocalizedClientLink
                  key={`${result.type}-${result.id}`}
                  href={result.href}
                  onClick={onClose}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {result.thumbnail && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <img
                          src={result.thumbnail}
                          alt={result.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full uppercase">
                          {result.type}
                        </span>
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                          {result.title}
                        </h3>
                      </div>
                      {result.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.description}
                        </p>
                      )}
                    </div>
                  </div>
                </LocalizedClientLink>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Start typing to search...
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  )

  // Use portal to render at body level, escaping any parent constraints
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body)
  }

  return null
}

export default SearchModal

