import React from "react";
import { handleSave } from "../functions/handleSave";
import getDate from "../functions/getDate";

type ActionButtonProps = {
  action: string;
  onAddComment: (newComment: Comment) => void;
  onReplyComment?: (newReply: Reply, commentId: number) => void;
  idToAdd: number;
  currentUser: User;
  commentValue: string;
  commentIdToReply?: number;
  replyingTo?: string;
  onIsReplyingChange?: () => void
  onReplyReply?: (newReply: Reply, replyId: number) => void
  replyIdToReply?: number
  onUpdateComment?: (updatedCommentContent: string, commentId: number) => void
  commentIdToUpdate?: number
  updatedCommentContent?: string
  onIsEditingChange: () => void
  onUpdateReply?: (updatedReplyContent: string, replyId: number) => void
  replyIdToUpdate?: number
  updatedReplyContent?: string
};

interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: [];
};

interface Reply {
  id: number;
  content: string;
  score: number;
  user: User;
  createdAt: string;
  replyingTo: string;
}

const ActionButton = (props: ActionButtonProps) => {
  const action = props.action;
  const onAddComment = props.onAddComment;
  const onReplyComment = props.onReplyComment;
  const idToAdd = props.idToAdd;
  const currentUser = props.currentUser;
  const commentValue = props.commentValue;
  const commentIdToReply = props.commentIdToReply;
  const replyingTo = props.replyingTo
  const onIsReplyingChange = props.onIsReplyingChange
  const onReplyReply = props.onReplyReply
  const replyIdToReply = props.replyIdToReply
  const onUpdateComment = props.onUpdateComment
  const commentIdToUpdate = props.commentIdToUpdate
  const updatedCommentContent = props.updatedCommentContent
  const onIsEditingChange = props.onIsEditingChange
  const onUpdateReply = props.onUpdateReply
  const replyIdToUpdate = props.replyIdToUpdate
  const updatedReplyContent = props.updatedReplyContent

  const handleClick = () => {
    action === "send" ? onAddComment(newComment) : null
    if (commentIdToReply) {
      action === "reply" ? (onReplyComment ? onReplyComment(newReply, commentIdToReply) : null) : null
      onIsReplyingChange ? onIsReplyingChange() : null
    }
    if(replyIdToReply) {
      action === "reply" ? (onReplyReply ? onReplyReply(newReply, replyIdToReply) : null) : null 
      onIsReplyingChange ? onIsReplyingChange() : null
    }
    if(commentIdToUpdate) {
      action === "update" ? (onUpdateComment && updatedCommentContent ? onUpdateComment(updatedCommentContent, commentIdToUpdate) : null) : null
      onIsEditingChange ? onIsEditingChange() : null
    }
    if(replyIdToUpdate) {
      action === "update" ? (onUpdateReply && updatedReplyContent ? onUpdateReply(updatedReplyContent, replyIdToUpdate) : null) : null
      onIsEditingChange ? onIsEditingChange() : null
    }
  };

  const newComment: Comment = {
    id: idToAdd + 1,
    content: commentValue,
    createdAt: getDate(),//new Date().toString(),
    score: 0,
    user: {
      image: {
        png: currentUser.image.png,
        webp: currentUser.image.webp,
      },
      username: currentUser.username,
    },
    replies: [],
  };

  const newReply: Reply = {
    id: idToAdd + 1,
    content: commentValue,
    score: 0,
    user: {
      image: {
        png: currentUser.image.png,
        webp: currentUser.image.webp,
      },
      username: currentUser.username,
    },
    createdAt: getDate(),//new Date().toString(),
    replyingTo: replyingTo ?? "",
  };

  return (
    <button
      onClick={handleClick}
      className="hover:opacity-50 px-2 py-4 w-24 h-12 flex items-center justify-center text-neutral-white bg-primary-moderate-blue rounded-lg uppercase"
    >
      {action}
    </button>
  );
};

export default ActionButton;
