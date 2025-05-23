import React from 'react'

interface Type{
    className?:string
}
function ShareSvg({className}:Type) {
  return (
    <svg width="1.7rem" height="1.7rem" className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.0001 11.459L11.4001 5.10001L11.4001 8.70001C2.99988 10.5 2.99988 18.9 2.99988 18.9C2.99988 18.9 6.59988 14.1 11.4001 14.7L11.4001 18.42L21.0001 11.459Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  )
}

export default ShareSvg
