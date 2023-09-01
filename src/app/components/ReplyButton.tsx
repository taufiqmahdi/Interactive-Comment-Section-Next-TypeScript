import Image from 'next/image'
import React from 'react'

type ReplyButtonProps = {
  show: boolean
  onIsReplyingChange: () => void
  isReplying: boolean
}

const ReplyButton = (props: ReplyButtonProps) => {
  const show = props.show ? 'hidden ' : ' '
  const isReplying = props.isReplying
  const onIsReplyingChange = props.onIsReplyingChange
  const handleClick = () => {
    onIsReplyingChange()
  }

  return (
    <button onClick={handleClick} className={show + 'flex gap-2 items-center justify-center hover:opacity-50' + (isReplying ? ' opacity-50' : " ")}>
      <Image src="/images/icon-reply.svg" alt="Reply Icon" width={14} height={14} />
      <div className='text-primary-moderate-blue font-medium'>Reply</div>
    </button>
  )
}

export default ReplyButton