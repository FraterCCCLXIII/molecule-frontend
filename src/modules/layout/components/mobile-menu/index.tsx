"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CloseIcon from "@modules/common/icons/close-icon"
import SearchIcon from "@modules/common/icons/search-icon"
import CartIcon from "@modules/common/icons/cart-icon"
import AccountIcon from "@modules/common/icons/account-icon"
import SearchModal from "@modules/common/components/search-modal"

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/pages/about-us" },
  { name: "Catalog", href: "/store" },
  { name: "Contact Us", href: "/pages/contact" },
]

const resourcesItems = [
  { name: "Peptide Calculator", href: "/calculator" },
  { name: "Peptide Guide", href: "/pages/peptide-guide" },
  { name: "Research", href: "/research" },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const menuContent = isOpen ? (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
        onClick={() => setIsOpen(false)}
      />
      <div
        id="header-sidebar-menu"
        className="fixed left-0 top-0 bottom-0 z-[61] w-80 max-w-[85vw] bg-white shadow-xl lg:hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="space-y-6">
              {menuItems.map((item) => (
                <li key={item.name} className="text-2xl">
                  <LocalizedClientLink
                    href={item.href}
                    className="block w-full hover:text-gray-600 transition-colors font-space-mono"
                    style={{ fontFamily: "var(--font-space-mono), monospace" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </LocalizedClientLink>
                </li>
              ))}
              <li className="text-2xl">
                <div className="mb-2 font-space-mono" style={{ fontFamily: "var(--font-space-mono), monospace" }}>Resources</div>
                <ul className="ml-4 space-y-4 text-xl">
                  {resourcesItems.map((item) => (
                    <li key={item.name}>
                      <LocalizedClientLink
                        href={item.href}
                        className="block w-full hover:text-gray-600 transition-colors font-space-mono"
                        style={{ fontFamily: "var(--font-space-mono), monospace" }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <div className="border-t p-6 space-y-4">
            <button
              onClick={() => {
                setIsOpen(false)
                setIsSearchOpen(true)
              }}
              className="flex items-center gap-3 text-sm font-bold w-full hover:text-gray-600 transition-colors"
            >
              <SearchIcon className="w-5 h-5" />
              Search
            </button>
            <LocalizedClientLink
              href="/account"
              className="flex items-center gap-3 text-sm font-bold hover:text-gray-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <AccountIcon className="w-5 h-5" />
              Account
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/cart"
              className="flex items-center gap-3 text-sm font-bold hover:text-gray-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <CartIcon className="w-5 h-5" />
              Cart
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </>
  ) : null

  return (
    <>
      <button
        type="button"
        className="tap-area lg:hidden"
        aria-controls="header-sidebar-menu"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Menu</span>
        <svg
          role="presentation"
          strokeWidth="2"
          focusable="false"
          width="22"
          height="22"
          className="icon icon-hamburger"
          viewBox="0 0 22 22"
        >
          <path
            d="M1 5h20M1 11h20M1 17h20"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {/* Use portal to render menu at body level, escaping any parent constraints */}
      {typeof window !== "undefined" && menuContent && createPortal(menuContent, document.body)}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

