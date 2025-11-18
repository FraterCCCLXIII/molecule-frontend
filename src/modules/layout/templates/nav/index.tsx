import { retrieveCart } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MobileMenu from "@modules/layout/components/mobile-menu"
import SearchIcon from "@modules/common/icons/search-icon"
import AccountIcon from "@modules/common/icons/account-icon"
import CartIcon from "@modules/common/icons/cart-icon"
import Logo from "@modules/common/components/logo"
import styles from "./nav.module.css"

const mainNavItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/pages/about-us" },
  { name: "Catalog", href: "/store" },
  { name: "Learn", href: "/learn" },
  { name: "Contact Us", href: "/pages/contact" },
]

export default async function Nav() {
  const cart = await retrieveCart().catch(() => null)
  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-[20px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid layout: main-nav | logo | secondary-nav on mobile/tablet, logo | main-nav | secondary-nav on desktop */}
        <div className={styles.headerGrid}>
          {/* Main Navigation */}
          <div className={`${styles.mainNav} flex items-center gap-4`}>
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <MobileMenu />
            </div>

            {/* Mobile Search - visible on mobile, hidden on desktop */}
            <LocalizedClientLink
              href="/search"
              className="sm:hidden p-2 hover:text-gray-900 transition-colors"
              aria-label="Search"
            >
              <span className="sr-only">Search</span>
              <SearchIcon />
            </LocalizedClientLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center w-full" role="navigation">
              <ul className="flex items-center gap-6" role="list">
                {mainNavItems.map((item) => (
                  <li key={item.name}>
                    <LocalizedClientLink
                      href={item.href}
                      className="text-sm hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Logo */}
          <div className={`${styles.logo} flex items-center justify-start`}>
            <LocalizedClientLink href="/" className="flex items-center">
              <span className="sr-only">Molecule</span>
              <Logo className="h-8 w-auto" />
            </LocalizedClientLink>
          </div>

          {/* Secondary Navigation */}
          <div className={`${styles.secondaryNav} flex items-center justify-end gap-4`}>
            {/* Search - Hidden on mobile, visible on desktop */}
            <LocalizedClientLink
              href="/search"
              className="hidden sm:block p-2 hover:text-gray-900 transition-colors"
              aria-label="Search"
            >
              <span className="sr-only">Search</span>
              <SearchIcon />
            </LocalizedClientLink>

            {/* Account - Hidden on mobile, visible on desktop */}
            <LocalizedClientLink
              href="/account"
              className="hidden sm:block p-2 hover:text-gray-900 transition-colors"
              aria-label="Login"
            >
              <span className="sr-only">Login</span>
              <AccountIcon />
            </LocalizedClientLink>

            {/* Cart */}
            <LocalizedClientLink
              href="/cart"
              className="relative p-2 hover:text-gray-900 transition-colors"
              aria-label="Cart"
            >
              <span className="sr-only">Cart</span>
              <CartIcon />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </div>
              )}
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </header>
  )
}
