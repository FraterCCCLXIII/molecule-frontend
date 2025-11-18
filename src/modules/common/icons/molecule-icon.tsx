import React from "react"

const MoleculeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
      <circle cx="12" cy="8" r="2" />
      <circle cx="8" cy="16" r="2" />
      <circle cx="16" cy="16" r="2" />
      <path d="M12 10v6" />
      <path d="M8 16l4-4" />
      <path d="M12 10l4 6" />
    </svg>
  )
}

export default MoleculeIcon

