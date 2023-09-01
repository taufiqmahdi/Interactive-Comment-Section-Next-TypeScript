import React from 'react'
import Image from 'next/image'
import MinusIcon from './svgs/MinusIcon'
import PlusIcon from './svgs/PlusIcon'

type VoteProps = {
  score: number
  onCommentVoteChange?: (commentId: number, operation: string) => void
  commentIdToChangeVote?: number
  onReplyVoteChange?: (replyId: number, operation: string) => void
  replyIdToChangeVote?: number
}

const Vote = (props: VoteProps) => {
  const score = props.score
  const onCommentVoteChange = props.onCommentVoteChange
  const commentIdToChangeVote = props.commentIdToChangeVote
  const onReplyVoteChange = props.onReplyVoteChange
  const replyIdToChangeVote = props.replyIdToChangeVote

  const handleClick = (operation: string) => {
    if(onCommentVoteChange && commentIdToChangeVote) {
      onCommentVoteChange(commentIdToChangeVote, operation)
    }

    if(onReplyVoteChange && replyIdToChangeVote) {
      onReplyVoteChange(replyIdToChangeVote, operation)
    }
  }

  return (
    <div className='bg-neutral-very-light-gray text-primary-moderate-blue font-medium py-2 md:py-4 px-4 md:px-3 flex md:flex-col items-center justify-center gap-4 rounded-xl'>
      <button onClick={() => handleClick('add')} className='flex items-center justify-center'>
        <PlusIcon />
      </button>
      <div>{ score }</div>
      <button onClick={() => handleClick('sub')} className='flex items-center justify-center'>
        <MinusIcon />
      </button>
    </div>
  )
}

export default Vote