import Image from 'next/image';
import React, { useState } from 'react'
import DeleteModal from './DeleteModal';

type DeleteButtonProps = {
  show: boolean
  onDeleteComment?: (commentId: number) => void
  commentIdToDelete?: number
  onDeleteReply?: (replyId: number) => void
  replyIdToDelete?: number
}

const DeleteButton = (props: DeleteButtonProps) => {
  const [showModal, setShowModal] = useState(false)
  const onDeleteComment = props.onDeleteComment
  const commentIdToDelete = props.commentIdToDelete
  const onDeleteReply = props.onDeleteReply
  const replyIdToDelete = props.replyIdToDelete

  const show = props.show ? ' ' : 'hidden '

  const handleShowModalChange = () => {
    setShowModal(prevShowModal => !prevShowModal)
  }

  const handleClick = () => {
    setShowModal(prevShowModal => !prevShowModal)
  }

  return (
    <>
      <button onClick={handleClick} className={show + "hover:opacity-50 flex gap-2 items-center justify-center"}>
        <Image src="/images/icon-delete.svg" alt="Delete Icon" width={14} height={14} />
        <div className="text-primary-soft-red font-medium">Delete</div>
      </button>
      {showModal ? <DeleteModal replyIdToDelete={replyIdToDelete} onDeleteReply={onDeleteReply} commentIdToDelete={commentIdToDelete} onDeleteComment={onDeleteComment} onShowModalChange={handleShowModalChange} /> : null}
    </>
  );
}

export default DeleteButton