import Image from 'next/image'
import React from 'react'

type AvatarProps = {
  sourceImage: {
    png: string
    webp: string
  }
  username: string
}

const Avatar = (props: AvatarProps) => {
  const webp = props.sourceImage.webp.slice(1)
  const png = props.sourceImage.png.slice(1)
  const username = props.username

  return (
    <Image className='w-8 h-full object-contain' src={webp} width={16} height={16} alt={"Avatar of " + username} />
  )
}

export default Avatar