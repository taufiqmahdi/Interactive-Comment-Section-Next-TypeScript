import Image from 'next/image'
import React from 'react'

type EditButtonProps = {
  show: boolean
  onIsEditingChange: () => void
  isEditing: boolean
}

const EditButton = (props: EditButtonProps) => {
  const show = props.show ? ' ' : 'hidden '
  const isEditing = props.isEditing
  const onIsEditingChange = props.onIsEditingChange
  const handleClick = () => {
    onIsEditingChange()
  }

  return (
    <button onClick={handleClick} className={show + "hover:opacity-50 flex gap-2 items-center justify-center" + (isEditing ? ' opacity-50' : " ")}>
      <Image src="/images/icon-edit.svg" alt="Edit Icon" width={14} height={14} />
      <div className="text-primary-moderate-blue font-medium">Edit</div>
    </button>
  )
}

export default EditButton