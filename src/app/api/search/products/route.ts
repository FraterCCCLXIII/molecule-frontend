import { NextRequest, NextResponse } from "next/server"
import { listProducts } from "@lib/data/products"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")
  const countryCode = searchParams.get("countryCode") || "us"

  if (!query) {
    return NextResponse.json([])
  }

  try {
    // Fetch products and filter by query
    const { response } = await listProducts({
      countryCode,
      queryParams: {
        limit: 100, // Fetch more to search through
      },
    })

    const searchTerm = query.toLowerCase()
    const filteredProducts = (response.products || []).filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(searchTerm)
      const descriptionMatch = product.description?.toLowerCase().includes(searchTerm)
      const handleMatch = product.handle?.toLowerCase().includes(searchTerm)
      
      return titleMatch || descriptionMatch || handleMatch
    }).slice(0, 10) // Limit to 10 results

    return NextResponse.json(filteredProducts)
  } catch (error) {
    console.error("Product search error:", error)
    return NextResponse.json([], { status: 500 })
  }
}

