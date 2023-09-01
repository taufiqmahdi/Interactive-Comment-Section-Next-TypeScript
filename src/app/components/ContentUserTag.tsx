import React from 'react'

type ContentUserTagProps = {
  replyingTo?: string
}

const ContentUserTag = (props: ContentUserTagProps) => {
  const replyingTo = props.replyingTo

  return (
    <span className={(replyingTo ? "" : "hidden ") + 'text-primary-moderate-blue font-medium hover:cursor-pointer'}>{replyingTo + " "}</span>
  )
}

export default ContentUserTag