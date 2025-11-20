import React from "react"

type LogoProps = {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56.6 9.41"
      className={className}
      aria-label="Molecule"
    >
      <defs>
        <style>{`.cls-1 { fill: #231f20; } .cls-2 { fill: #fff; }`}</style>
      </defs>
      <g>
        <path
          className="cls-1"
          d="M11.04.45h1.17l2.65,6.2h.02L17.55.45h1.17v8.48h-1.11V2.74h-.02l-2.3,5.23h-.82l-2.29-5.23h-.02v6.19h-1.11V.45Z"
        />
        <path
          className="cls-1"
          d="M20,7.77v-3.71l1.16-1.16h3.22l1.15,1.16v3.71l-1.15,1.16h-3.22l-1.16-1.16ZM23.86,7.95l.55-.53v-3l-.55-.53h-2.19l-.54.53v3l.54.53h2.19Z"
        />
        <path className="cls-1" d="M26.81.28h1.13v8.65h-1.13V.28Z" />
        <path
          className="cls-1"
          d="M29.21,7.78v-3.72l1.16-1.16h3.16l1.16,1.16v2.2h-4.36v1.16l.53.53h2.17l.53-.52v-.41h1.11v.75l-1.14,1.15h-3.19l-1.15-1.15ZM33.57,5.38v-.98l-.55-.53h-2.14l-.54.53v.98h3.23Z"
        />
        <path
          className="cls-1"
          d="M35.72,7.78v-3.73l1.15-1.15h3.04l1.16,1.16v.86h-1.13v-.5l-.55-.54h-2.01l-.54.54v2.98l.54.54h2.01l.55-.54v-.5h1.13v.86l-1.16,1.16h-3.04l-1.15-1.15Z"
        />
        <path
          className="cls-1"
          d="M41.99,7.77V2.9h1.13v4.52l.54.53h1.13l1.41-1.4v-3.65h1.13v6.03h-1.08v-1.2l-1.2,1.2h-1.89l-1.16-1.16Z"
        />
        <path className="cls-1" d="M48.71.28h1.13v8.65h-1.13V.28Z" />
        <path
          className="cls-1"
          d="M51.11,7.78v-3.72l1.16-1.16h3.16l1.16,1.16v2.2h-4.36v1.16l.53.53h2.17l.53-.52v-.41h1.11v.75l-1.14,1.15h-3.19l-1.15-1.15ZM55.47,5.38v-.98l-.55-.53h-2.14l-.54.53v.98h3.23Z"
        />
      </g>
      <polygon
        className="cls-1"
        points="8.15 7.06 8.15 2.35 4.07 0 0 2.35 0 7.06 4.07 9.41 8.15 7.06"
      />
      <polygon
        className="cls-2"
        points="4.15 8.38 4 8.12 7.07 6.35 7.22 6.61 4.15 8.38"
      />
      <rect className="cls-2" x=".86" y="2.93" width=".3" height="3.54" />
      <polygon
        className="cls-2"
        points="7.07 3.06 4 1.29 4.15 1.03 7.22 2.8 7.07 3.06"
      />
    </svg>
  )
}

export default Logo

