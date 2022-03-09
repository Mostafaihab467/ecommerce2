import React from 'react'
import {Spinner as Spin} from 'react-bootstrap'
import './Spinner.scss'
function Spinner() {
  return (
      <div className='Main'>
    <Spin className='spinner' animation='border'  role={'status'}  ></Spin>
    </div>
  )
}

export default Spinner