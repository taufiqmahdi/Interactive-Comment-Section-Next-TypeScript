import React, { useState } from 'react'
import ContentUserTag from './ContentUserTag'
import ActionButton from './ActionButton'

type ContentProps = {
  content: string
  replyingTo?: string
  isEditing: boolean
  idToAdd: number
  onAddComment: (newComment: Comment) => void
  currentUser: User
  onUpdateComment?: (updatedCommentContent: string, commentId: number) => void
  commentIdToUpdate?: number
  onIsEditingChange: () => void
  onUpdateReply?: (updatedReplyContent: string, replyId: number) => void
  replyIdToUpdate?: number
}

interface Comment {
  id: number,
  content: string,
  score: number,
  user: User
  createdAt : string
  replies: ReplyProps[] 
}

interface ReplyProps {
  id: number,
  content: string,
  score: number,
  user: User
  createdAt : string
  replyingTo: string
}

interface User {
  image: {
    png: string,
    webp: string
  },
  username: string
}

const Content = (props: ContentProps) => {
  const content = props.content
  const replyingTo = props.replyingTo
  const isEditing = props.isEditing
  const idToAdd = props.idToAdd
  const currentUser = props.currentUser
  const onAddComment = props.onAddComment
  const onUpdateComment = props.onUpdateComment
  const commentIdToUpdate = props.commentIdToUpdate
  const onIsEditingChange = props.onIsEditingChange
  const onUpdateReply = props.onUpdateReply
  const replyIdToUpdate = props.replyIdToUpdate

  const [editValue, setEditValue] = useState(content)

  const commentValue = editValue

  const handleChangeEditValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(e.target.value)
  }

  return (
    <>
      {!isEditing ? (
        <div className="text-neutral-grayish-blue">
          <ContentUserTag replyingTo={replyingTo} />
          {content}
        </div>
      ) : null}
      {isEditing ? (
        <div className="bg-neutral-white flex flex-col items-end gap-4 rounded-md">
          <textarea
            className="border px-4 py-2 rounded-lg text-neutral-dark-blue w-full"
            placeholder="Add a comment..."
            value={editValue}
            onChange={handleChangeEditValue}
          />
          <div className='block'>
            <ActionButton updatedReplyContent={editValue} replyIdToUpdate={replyIdToUpdate} onUpdateReply={onUpdateReply} onIsEditingChange={onIsEditingChange} updatedCommentContent={editValue} commentIdToUpdate={commentIdToUpdate} onUpdateComment={onUpdateComment} idToAdd={idToAdd} currentUser={currentUser} commentValue={commentValue} onAddComment={onAddComment} action="update" />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Content