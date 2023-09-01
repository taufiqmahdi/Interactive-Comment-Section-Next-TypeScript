"use client"

import React, { ChangeEventHandler, useState } from 'react'
import Avatar from './Avatar'
import ActionButton from './ActionButton'

type InputCommentProps = {
  currentUser: User
  action: string
  replyingTo?: string
  onAddComment: (newComment: Comment) => void
  onReplyComment?: (newReply: Reply, commentId: number) => void
  idToAdd: number
  commentIdToReply?: number
  onIsReplyingChange?: () => void
  onReplyReply?: (newReply: Reply, replyId: number) => void
  replyIdToReply?: number
}

interface User {
  image: {
    png: string,
    webp: string
  },
  username: string
}

type Comment = {
  id: number
  content: string
  createdAt: string
  score: number
  user: {
    image: {
      png: string
      webp: string
    }
    username: string
  }
  replies: [] 
}

interface Reply {
  id: number;
  content: string;
  score: number;
  user: User;
  createdAt: string;
  replyingTo: string;
}

const InputComment = (props: InputCommentProps) => {
  const currentUser = props.currentUser
  const action = props.action
  const replyingTo = props.replyingTo
  const onAddComment = props.onAddComment
  const onReplyComment = props.onReplyComment
  const idToAdd = props.idToAdd
  const commentIdToReply = props.commentIdToReply
  const onIsReplyingChange = props.onIsReplyingChange
  const replyIdToReply = props.replyIdToReply
  const onReplyReply = props.onReplyReply
  
  const [commentValue, setCommentValue] = useState(
    // replyingTo ? ("@" + replyingTo + " ") : ""
    ""
  )

  const handleChangeCommentValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value)
  }

  return (
    <div className={(action == "reply" ? "-mt-2 " : " ") + "bg-neutral-white p-4 flex flex-col md:flex-row gap-4 rounded-md"}>
      <div className='hidden md:block w-14 h-14'>
        <Avatar sourceImage={currentUser.image} username={currentUser.username} />
      </div>
      <textarea className='border px-4 py-2 rounded-lg text-neutral-dark-blue md:w-full' placeholder='Add a comment...' value={commentValue} onChange={handleChangeCommentValue} />
      <div className='flex md:hidden gap-4 justify-between items-center'>
        <Avatar sourceImage={currentUser.image} username={currentUser.username} />
        <ActionButton replyIdToReply={replyIdToReply} onReplyReply={onReplyReply} onIsReplyingChange={onIsReplyingChange} replyingTo={replyingTo} commentIdToReply={commentIdToReply} idToAdd={idToAdd} currentUser={currentUser} commentValue={commentValue} onReplyComment={onReplyComment} onAddComment={onAddComment} action={action} />
      </div>
      <div className='hidden md:block'>
        <ActionButton replyIdToReply={replyIdToReply} onReplyReply={onReplyReply} onIsReplyingChange={onIsReplyingChange} replyingTo={replyingTo} commentIdToReply={commentIdToReply} idToAdd={idToAdd} currentUser={currentUser} commentValue={commentValue} onReplyComment={onReplyComment} onAddComment={onAddComment} action={action} />
      </div>
    </div>
  )
}

export default InputComment