import React from 'react'

import './Ratings.scss'

interface Props {
    rating: number,
    numReviews: number,
}


const getColor=(color:number)=>{
    switch(color){
        case 5 : return '#ebeb10ec'
        case 4 : return '#c8c80ceb'
        case 3 : return '#ba9d0aeb'
        case 2 : return '#eb9310eb'
        case 1 : return '#eb1010eb'
    }
}


function Ratings({ rating, numReviews }: Props) {

    const color = getColor(rating)

    

    return (
        <div className='Rating_main'>
          



            <i style={{color:color}} className={rating >= 1 ? 'fas fa-star' :
                rating >= 1 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            <i style={{color:color}}  className={rating >= 2 ? 'fas fa-star' :
                rating >= 1.5  ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            <i  style={{color:color}} className={rating >= 3 ? 'fas fa-star' :
                rating >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>

            <i style={{color:color}}  className={rating >= 4 ? 'fas fa-star' :
                rating >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            <i style={{color:color}}  className={rating >= 5 ? 'far fa-star' :
                rating >=4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            <span>
                {rating && rating} reviews
            </span>



        </div>
    )
}

export default Ratings