import React from "react";
import Avatar from "./Avatar";
import UserLabel from "./UserLabel";
import ReplyButton from "./ReplyButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

type UserDetailProps = {
  image: {
    png: string
    webp: string
  }
  username: string
  currentUser: User
  createdAt : string
  onIsReplyingChange: () => void
  isReplying: boolean
  onIsEditingChange: () => void
  isEditing: boolean
  commentIdToDelete?: number
  onDeleteComment?: (commentId: number) => void
  onDeleteReply?: (replyId: number) => void
  replyIdToDelete?: number
}

interface User {
  image: {
    png: string,
    webp: string
  },
  username: string
}

const UserDetail = (props: UserDetailProps) => {
  const image = props.image
  const username = props.username
  const currentUser = props.currentUser
  const createdAt = props.createdAt
  const isCurrentUser = username == currentUser.username ? true : false
  const handleIsReplyingChange = props.onIsReplyingChange
  const isReplying = props.isReplying
  const handleIsEditingChange = props.onIsEditingChange
  const isEditing = props.isEditing
  const commentIdToDelete = props.commentIdToDelete
  const onDeleteComment = props.onDeleteComment
  const onDeleteReply = props.onDeleteReply
  const replyIdToDelete = props.replyIdToDelete

  return (
    <div className="flex gap-4 items-center md:justify-between">
      <div className="flex items-center gap-4">
        <Avatar sourceImage={image} username={username} />
        <div className="flex gap-2 items-center">
          <div className="font-medium">{ username }</div>
          <UserLabel show={isCurrentUser} />
        </div>
        <div className="text-neutral-grayish-blue">{ createdAt }</div>
      </div>
      <div className="hidden md:flex md:gap-4">
        <ReplyButton show={isCurrentUser} isReplying={isReplying} onIsReplyingChange={handleIsReplyingChange} />
        <DeleteButton replyIdToDelete={replyIdToDelete} onDeleteReply={onDeleteReply} commentIdToDelete={commentIdToDelete} onDeleteComment={onDeleteComment} show={isCurrentUser} />
        <EditButton show={isCurrentUser} isEditing={isEditing} onIsEditingChange={handleIsEditingChange}  />
      </div>
    </div>
  );
};

export default UserDetail;
