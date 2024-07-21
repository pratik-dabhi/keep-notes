import React from 'react'
import { IImageComponent } from '../../interfaces/interfaces'

const Image = ({src , alt , className } : IImageComponent) => {
  return (
    <img src={src} alt={alt} className={className} />
  )
}

export default Image