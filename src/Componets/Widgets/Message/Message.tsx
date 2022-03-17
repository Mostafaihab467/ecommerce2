import React from 'react'
import './Message.scss'


interface Props {
    error:boolean
    message:string
}

function Message({error,message}:Props) {
  return (
    <div style={{backgroundColor: error ? '#febcbc' : '#82c190ec'}} className='Message_container'>
        <div  className='message_div'>
            {message}
        
            </div>
    </div>
  )
}

export default Message