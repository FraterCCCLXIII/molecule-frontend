"use client"

import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CloseIcon from "@modules/common/icons/close-icon"

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/pages/about-us" },
  { name: "Shop", href: "/store" },
  { name: "Contact Us", href: "/pages/contact" },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
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
    )
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm lg:hidden"
        onClick={() => setIsOpen(false)}
      />
      <div
        id="header-sidebar-menu"
        className="fixed left-0 top-0 bottom-0 z-[51] w-80 max-w-[85vw] bg-white shadow-xl lg:hidden"
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
                    className="block w-full hover:text-gray-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t p-6">
            <LocalizedClientLink
              href="/account"
              className="block text-sm font-bold"
              onClick={() => setIsOpen(false)}
            >
              Account
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </>
  )
}

