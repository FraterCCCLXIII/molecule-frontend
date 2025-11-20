import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import ProductDetailTabs from "@modules/products/components/product-detail-tabs"
import ProductDisclaimer from "@modules/products/components/product-disclaimer"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col small:flex-row small:items-start py-6 relative gap-6 small:gap-8"
        data-testid="product-container"
      >
        <div className="block w-full small:flex-1 relative">
          <ImageGallery images={images} />
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0 max-w-[600px] w-full py-8 gap-y-6">
          {/* Product Info (Title & Description) - Above Price */}
          <ProductInfo product={product} />
          
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
          
          {/* Product Tabs (Accordion) - Below Price */}
          <ProductTabs product={product} />
        </div>
      </div>
      {/* Product Detail Tabs and Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <Suspense fallback={<div className="w-full mt-8">Loading product details...</div>}>
          <ProductDetailTabs product={product} />
        </Suspense>
        <ProductDisclaimer />
      </div>
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
