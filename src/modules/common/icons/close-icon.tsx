import React from "react"

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      role="presentation"
      strokeWidth="2"
      focusable="false"
      width="19"
      height="19"
      className="icon icon-close"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d="M17.658 6.343 6.344 17.657M17.658 17.657 6.344 6.343"
        stroke="currentColor"
      />
    </svg>
  )
}

export default CloseIcon

