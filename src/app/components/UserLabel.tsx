import React from 'react'

type UserLabelProps = {
  show: boolean
}

const UserLabel = (props: UserLabelProps) => {
  const show = props.show ? 'block' : 'hidden'

  return (
    <div className={'bg-primary-moderate-blue text-neutral-white text-xs font-medium py-0.5 px-1.5 rounded-sm flex items-center justify-center ' + show}>you</div>
  )
}

export default UserLabel