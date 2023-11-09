import React from 'react'

const Image = ({image}) => {
  return (
    <div>
      <div className="image">
       {image.map((item) => {
        return(
            <img src={item} alt=""  width={200} height={200}/>
        )
       })}
      </div>
    </div>
  )
}

export default Image
