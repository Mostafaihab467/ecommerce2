import React from 'react'
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

function cartscreen(props:any) {

    const qty = useParams()['id']

  return (
    <div>cartscreen</div>
  )
}

export default cartscreen