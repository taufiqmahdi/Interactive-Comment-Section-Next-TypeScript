import React, { useState } from 'react'
import Comment from './Comment';
import UserDetail from './UserDetail';
import Content from './Content';
import Vote from './Vote';
import ReplyButton from './ReplyButton';
import InputComment from './InputComment';
import { Console } from 'console';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

type ReplyProps = {
  currentUser: User,
  reply: Reply
  // commenter: string'
  idToAdd: number
  onAddComment: (newComment: Comment) => void
  onReplyReply: (newReply: Reply, replyId: number) => void
  onUpdateReply: (updatedReplyContent: string, replyId: number) => void
  onDeleteReply: (replyId: number) => void
  onReplyVoteChange: (replyId: number, operation: string) => void
}

interface Reply {
  id: number,
  content: string,
  score: number,
  user: User,
  createdAt : string,
  replyingTo: string,
}

interface User {
  image: {
    png: string,
    webp: string
  },
  username: string
}

const Reply = (props: ReplyProps) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const reply = props.reply
  const currentUser = props.currentUser
  const isCurrentUser = reply.user.username == currentUser.username ? true : false
  // const commenter= props.commenter
  const idToAdd = props.idToAdd
  const onAddComment = props.onAddComment
  const onReplyReply = props.onReplyReply
  const onUpdateReply = props.onUpdateReply
  const onDeleteReply = props.onDeleteReply
  const onReplyVoteChange = props.onReplyVoteChange

  const handleIsReplyingChange = () => {
    setIsReplying(prevIsReplying => !prevIsReplying)
  }

  const handleIsEditingChange = () => {
    setIsEditing(prevIsEditing => !prevIsEditing);
  }

  return (
    <div className="md:ml-8 border-l-2 pl-4 md:pl-8 flex flex-col gap-4">
      <div className="bg-neutral-white p-4 flex flex-col md:flex-row gap-4 rounded-md">
        <div className="hidden md:block">
          <Vote replyIdToChangeVote={reply.id} onReplyVoteChange={onReplyVoteChange} score={reply.score} />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <UserDetail replyIdToDelete={reply.id} onDeleteReply={onDeleteReply} image={reply.user.image} username={reply.user.username} currentUser={currentUser} createdAt={reply.createdAt} isReplying={isReplying} onIsReplyingChange={handleIsReplyingChange} isEditing={isEditing} onIsEditingChange={handleIsEditingChange} />
          <Content replyIdToUpdate={reply.id} onUpdateReply={onUpdateReply} onIsEditingChange={handleIsEditingChange} currentUser={currentUser} idToAdd={idToAdd} onAddComment={onAddComment} replyingTo={reply.replyingTo} content={reply.content} isEditing={isEditing} />
        </div>
        <div className="flex gap-4 justify-between">
          <div className="block md:hidden">
            <Vote replyIdToChangeVote={reply.id} onReplyVoteChange={onReplyVoteChange} score={reply.score} />
          </div>
          <div className="flex items-center justify-center gap-4 md:hidden">
            <ReplyButton show={isCurrentUser} isReplying={isReplying} onIsReplyingChange={handleIsReplyingChange}  />
            <DeleteButton replyIdToDelete={reply.id} onDeleteReply={onDeleteReply} show={isCurrentUser} />
            <EditButton show={isCurrentUser} isEditing={isEditing} onIsEditingChange={handleIsEditingChange} />
          </div>
        </div>
      </div>
      {isReplying ? <InputComment onIsReplyingChange={handleIsReplyingChange} replyIdToReply={reply.id} onReplyReply={onReplyReply} idToAdd={idToAdd} onAddComment={onAddComment} replyingTo={reply.user.username} currentUser={currentUser} action="reply" /> : null}
    </div>
  );
}

export default Reply