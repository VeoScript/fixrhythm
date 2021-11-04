import React from 'react'

interface TypeProps {
  width: string
  height: string
  color: string
}

const FormLoader: React.FC<TypeProps> = ({ width, height, color }) => {
  return (
    <svg width={ width } height={ height } viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" color={ color }>
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="tail-spin_svg__a_20">
          <stop stopColor="currentColor" stopOpacity="0" offset="0%"></stop>
          <stop stopColor="currentColor" stopOpacity=".631" offset="63.146%"></stop>
          <stop stopColor="currentColor" offset="100%"></stop>
        </linearGradient>
      </defs>
      <g transform="translate(1 1)" fill="none" fillRule="evenodd">
        <path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#tail-spin_svg__a_20)" strokeWidth="2"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></path>
        <circle fill="#fff" cx="36" cy="18" r="1"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"></animateTransform></circle>
      </g>
    </svg>
  )
}

export default FormLoader