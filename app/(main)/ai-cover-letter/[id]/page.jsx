import React from 'react'

const Coverletter = async({params}) => {
    const id =await params.id;

  return (
    <div>Coverletter:{id}</div>
  )
}

export default Coverletter