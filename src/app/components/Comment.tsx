"use client";

import React, { useState } from "react";
import UserDetail from "./UserDetail";
import Content from "./Content";
import Vote from "./Vote";
import ReplyButton from "./ReplyButton";
import Reply from "./Reply";
import InputComment from "./InputComment";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import DeleteModal from "./DeleteModal";

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

type CommentProps = {
  currentUser: User,
  comment: Comment
  idToAdd: number
  onAddComment: (newComment: Comment) => void
  onReplyComment: (newReply: Reply, commentId: number) => void
  onReplyReply: (newReply: Reply, replyId: number) => void
  onUpdateComment: (updatedCommentContent: string, commentId: number) => void
  onUpdateReply: (updatedReplyContent: string, replyId: number) => void
  onDeleteComment: (commentId: number) => void
  onDeleteReply: (replyId: number) => void
  onCommentVoteChange: (commentId: number, operation: string) => void
  onReplyVoteChange: (replyId: number, operation: string) => void
}

const Comment = (props: CommentProps) => {
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const comment = props.comment
  const currentUser = props.currentUser
  const isCurrentUser = comment.user.username == currentUser.username ? true : false
  const replies = comment.replies
  const idToAdd = props.idToAdd
  const onAddComment = props.onAddComment
  const onReplyComment = props.onReplyComment
  const onReplyReply = props.onReplyReply
  const onUpdateComment = props.onUpdateComment
  const onUpdateReply = props.onUpdateReply
  const onDeleteComment = props.onDeleteComment
  const onDeleteReply = props.onDeleteReply
  const onCommentVoteChange = props.onCommentVoteChange
  const onReplyVoteChange = props.onReplyVoteChange

  const handleIsReplyingChange = () => {
    setIsReplying(prevIsReplying => !prevIsReplying);
  }

  const handleIsEditingChange = () => {
    setIsEditing(prevIsEditing => !prevIsEditing);
  }

  return (
    <>
      <div className="bg-neutral-white p-4 flex flex-col md:flex-row gap-4 rounded-md">
        <div className="hidden md:block">
          <Vote commentIdToChangeVote={comment.id} onCommentVoteChange={onCommentVoteChange} score={comment.score} />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <UserDetail commentIdToDelete={comment.id} onDeleteComment={onDeleteComment} image={comment.user.image} username={comment.user.username} currentUser={currentUser} createdAt={comment.createdAt} isReplying={isReplying} onIsReplyingChange={handleIsReplyingChange} isEditing={isEditing} onIsEditingChange={handleIsEditingChange} />
          <Content onIsEditingChange={handleIsEditingChange} commentIdToUpdate={comment.id} onUpdateComment={onUpdateComment} currentUser={currentUser} idToAdd={idToAdd} onAddComment={onAddComment} content={comment.content} isEditing={isEditing} />
        </div>
        <div className="flex gap-4 justify-between">
          <div className="block md:hidden">
            <Vote commentIdToChangeVote={comment.id} onCommentVoteChange={onCommentVoteChange} score={comment.score} />
          </div>
          <div className="flex items-center justify-center gap-4 md:hidden">
            <ReplyButton show={isCurrentUser} isReplying={isReplying} onIsReplyingChange={handleIsReplyingChange} />
            <DeleteButton commentIdToDelete={comment.id} onDeleteComment={onDeleteComment} show={isCurrentUser} />
            <EditButton show={isCurrentUser} isEditing={isEditing} onIsEditingChange={handleIsEditingChange} />
          </div>
        </div>
      </div>
      {isReplying ? <InputComment onIsReplyingChange={handleIsReplyingChange} commentIdToReply={comment.id} idToAdd={idToAdd} onReplyComment={onReplyComment} onAddComment={onAddComment} replyingTo={comment.user.username} currentUser={currentUser} action="reply" /> : null}
      {replies.map((value: Reply) => {
        return <Reply onReplyVoteChange={onReplyVoteChange} onDeleteReply={onDeleteReply} onUpdateReply={onUpdateReply} key={value.id} currentUser={currentUser} reply={value} idToAdd={idToAdd} onAddComment={onAddComment} onReplyReply={onReplyReply} />
      })}
    </>
  );
};

export default Comment;
