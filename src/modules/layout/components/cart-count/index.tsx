import { retrieveCart } from "@lib/data/cart"

export default async function CartCount() {
  const cart = await retrieveCart().catch(() => null)
  const count = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <div className="header__cart-count">
      <span className="sr-only">{count} items</span>
      <span aria-hidden="true" className="count-bubble">
        {count}
      </span>
    </div>
  )
}

