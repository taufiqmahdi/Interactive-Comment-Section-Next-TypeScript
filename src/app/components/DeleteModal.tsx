import React from 'react'

type DeleteModalProps = {
  onShowModalChange: () => void
  onDeleteComment?: (commentId: number) => void
  commentIdToDelete?: number
  onDeleteReply?: (replyId: number) => void
  replyIdToDelete?: number
}

const DeleteModal = (props: DeleteModalProps) => {
  const onShowModalChange = props.onShowModalChange
  const onDeleteComment = props.onDeleteComment
  const commentIdToDelete = props.commentIdToDelete
  const onDeleteReply = props.onDeleteReply
  const replyIdToDelete = props.replyIdToDelete

  const handleClick = () => {
    onShowModalChange()
  }
  
  const handleDeleteClick = () => {
    onShowModalChange()
    if(replyIdToDelete) {
      onDeleteReply ? (onDeleteReply(replyIdToDelete)) : null
      return
    }
    if(commentIdToDelete) {
      onDeleteComment ? (onDeleteComment(commentIdToDelete)) : null
      return
    }
  }

  return (
    <div className='fixed top-0 right-0 bg-black bg-opacity-30 p-4 h-screen w-screen flex items-center justify-center'>
        <div className='z-40 bg-neutral-white flex flex-col gap-4 p-8 rounded-lg md:w-96'>
            <div className='font-medium text-neutral-dark-blue text-xl'>Delete comment?</div>
            <div className='text-neutral-grayish-blue'>Are you sure you want to delete this comment? This will remove the comment and can't be undone</div>
            <div className='flex gap-4 justify-between'>
                <button onClick={handleClick} className='px-4 py-3 md:px-6 md:py-4 uppercase bg-neutral-grayish-blue text-neutral-white font-medium rounded-lg'>No, cancel</button>
                <button onClick={handleDeleteClick} className='px-4 py-3 md:px-6 md:py-4 uppercase bg-primary-soft-red text-neutral-white font-medium rounded-lg'>Yes, delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal