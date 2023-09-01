"use client";

import Image from "next/image";
import Comment from "./components/Comment";
import Reply from "./components/Reply";
import InputComment from "./components/InputComment";
import UserDetail from "./components/UserDetail";
import Vote from "./components/Vote";
import ReplyButton from "./components/ReplyButton";
import DeleteButton from "./components/DeleteButton";
import EditButton from "./components/EditButton";
import SendButton from "./components/ActionButton";
import Avatar from "./components/Avatar";
import Content from "./components/Content";
import Attribution from "./components/Attribution";
import Modal from "./components/DeleteModal";
import { handleSave } from "./functions/handleSave";
import handleLoad from "./functions/handleLoad";
import { useEffect, useState } from "react";
import data from './data/data.json'
import { User } from "./interfaces/IUser";
// import { handleUpdateReply } from "./functions/handleUpdateReply"

function getData() {
  const { currentUserData, commentsData } = handleLoad();

  return { currentUserData, commentsData };
}

export default function Home() {
  // const { currentUserData, commentsData } = getData();
  // const [currentUser, setCurrentUser] = useState<User>(currentUserData);
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  // const [comments, setComments] = useState<Comment[]>(commentsData);
  const [comments, setComments] = useState<Comment[]>([]);
  const [idToAdd, setIdToAdd] = useState(0);
  const [isFirstLoading, setFirstLoading] = useState(true)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    let currentUserData, commentsData;
    if (typeof window !== "undefined" && window.localStorage) {
      if (
        !localStorage.getItem("currentUser") &&
        !localStorage.getItem("comments")
      ) {
        // const res = require("./data/data.json");
        localStorage.setItem("currentUser", JSON.stringify(data.currentUser));
        localStorage.setItem("comments", JSON.stringify(data.comments));
      }
      currentUserData = JSON.parse(localStorage.getItem("currentUser") ?? "{}");
      commentsData = JSON.parse(localStorage.getItem("comments") ?? "{}");
    }

    setCurrentUser(currentUserData);
    setComments(commentsData);
    setFirstLoading(false)
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  for (let index = 0; index < comments.length; index++) {
    if (comments[index].id > idToAdd) {
      setIdToAdd(comments[index].id);
      return;
    }
    for (
      let replyIndex = 0;
      replyIndex < comments[index].replies.length;
      replyIndex++
    ) {
      if (comments[index].replies[replyIndex].id > idToAdd) {
        setIdToAdd(comments[index].replies[replyIndex].id);
        return;
      }
    }
  }

  const handleAddComment = (newComment: Comment) => {
    setLoading(true)

    setTimeout(() => {
      setComments([...comments, newComment]);
      setLoading(false)
    }, 2000);
  };

  const handleReplyComment = (newReply: Reply, commentId: number) => {
    const addReply = comments.map((comment) => {
      if(comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            newReply
        ]}
      } else {
        return comment
      }
    })

    setLoading(true)

    setTimeout(() => {
      setComments(addReply);
      setLoading(false)
    }, 2000);
  };

  const handleUpdateComment = (updatedCommentContent: string, commentId: number) => {
    const updateComment = comments.map((comment) => {
      if(comment.id === commentId) {
        return {
          ...comment,
          content: updatedCommentContent
          }
      } else {
        return comment
      }
    })

    setLoading(true)

    setTimeout(() => {
      setComments(updateComment);
      setLoading(false)
    }, 2000);
  };

  const handleDeleteComment = (commentId: number) => {
    const deleteComment = comments.filter((comment) => comment.id !== commentId)
    setLoading(true)


    setTimeout(() => {
      setComments(deleteComment)
      setLoading(false)
    }, 2000);
  }

  const handleUpdateCommentVote = (commentId: number, operation: string) => {
    setLoading(true)

    setTimeout(() => {
      const updateVote = comments.map((comment) => {
        if(comment.id === commentId) {
          return {
            ...comment,
            score: ((operation == 'add') ? (comment.score += 1) : (comment.score -= 1))
          }
        } else {
          return comment
        }
      })

      setComments(updateVote);
      setLoading(false)
    }, 2000);
  }

  const handleReplyReply = (newReply: Reply, replyId: number) => {
    const EditComment = comments.map((comment) => {
      let addReply = comment.replies;
      comment.replies.map((reply) => {
        if(reply.id === replyId) {
          addReply = [...addReply, newReply];
        }
      })
      return {
        ...comment,
        replies: addReply
      }
    })

    setLoading(true)

    setTimeout(() => {
      setComments(EditComment);
      setLoading(false)
    }, 2000);
  };

  const handleUpdateReply = (updatedReplyContent: string, replyId: number) => {
    const EditComment = comments.map((comment) => {
      const updateReply = comment.replies.map((reply) => {
        if(reply.id === replyId) {
          return {
            ...reply,
            content: updatedReplyContent
          }
        } else { 
          return reply
        }
      })
      return {
        ...comment,
        replies: updateReply
      }
    })

    setLoading(true)

    setTimeout(() => {
      setComments(EditComment);
      setLoading(false)
    }, 2000);
  };

  const handleDeleteReply = (replyId: number) => {
    const updatedComments = comments.map((comment) => {
      const updatedReplies = comment.replies.filter((reply) => reply.id !== replyId);
      return { ...comment, replies: updatedReplies };
    })

    setLoading(true)

    setTimeout(() => {
      setComments(updatedComments)
      setLoading(false)
    }, 2000);
  }

  const handleUpdateReplyVote = (replyId: number, operation: string) => {
    setLoading(true)

    setTimeout(() => {
      const updateVote = comments.map((comment) => {
        // let replyToUpdate = comment.replies
        const updateReplyVote = comment.replies.map((reply) => {
          if(reply.id === replyId) {
            return {
              ...reply,
              score: ((operation == 'add') ? (reply.score += 1) : (reply.score -= 1))
            }
          } else {
            return reply
          }
        })
        return {
          ...comment,
          replies: updateReplyVote
        }
      })

      setComments(updateVote);
      setLoading(false)
    }, 2000);
  }

  if (isFirstLoading)
    return (
      <main className="animate-pulse max-w-2xl mx-auto p-4 md:pt-16 min-h-screen flex flex-col gap-4 relative items-center justify-center">
        Loading...
      </main>
    );

  return (
    <main className="max-w-2xl mx-auto p-4 md:pt-16 min-h-screen flex flex-col gap-4 relative">
      {comments?.map((value: Comment) => {
        return (
          <Comment
            key={value.id}
            currentUser={currentUser}
            comment={value}
            idToAdd={idToAdd}
            onAddComment={handleAddComment}
            onReplyComment={handleReplyComment}
            onReplyReply={handleReplyReply}
            onUpdateComment={handleUpdateComment}
            onUpdateReply={handleUpdateReply}
            onDeleteComment={handleDeleteComment}
            onDeleteReply={handleDeleteReply}
            onCommentVoteChange={handleUpdateCommentVote}
            onReplyVoteChange={handleUpdateReplyVote}
          />
        );
      })}
      <InputComment
        idToAdd={idToAdd}
        onAddComment={handleAddComment}
        onReplyComment={handleReplyComment}
        currentUser={currentUser}
        action="send"
      />
      {isLoading ?
      <div className="fixed w-screen h-screen bg-black opacity-50 top-0 left-0 flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
      : null}
    </main>
  );
}
