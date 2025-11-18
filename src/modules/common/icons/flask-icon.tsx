import React from "react"

const FlaskIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 2v10" />
      <path d="M14 2v10" />
      <path d="M4 19h16" />
      <path d="M6 14h12v5H6z" />
      <path d="M14 2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
    </svg>
  )
}

export default FlaskIcon

