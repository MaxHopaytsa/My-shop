'use client'
import React from 'react'
import { CldImage } from 'next-cloudinary'

function MyImage({src, alt,width, height }) {
  return (
<CldImage
width={width}
height={height} 
crop="fill"
src={src}
alt={alt}
effect="sharpen:100"
/>
  )
}

export default MyImage