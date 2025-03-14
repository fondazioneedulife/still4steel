import React, { useState } from "react";
import './rectangle.css'
import { useNavigate } from "react-router-dom";
interface RectangleProps {
    titolo: string;
    imgSrc: string;
    link: string;
    imgHoverSrc: string;
  }
  
  const Rectangle: React.FC<RectangleProps> = ({ titolo, imgSrc, link, imgHoverSrc}) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false)
    return(
        <div className="container">
            <div className="row justify-content-center mt-2 ">
                <div className="col-11 col-md-6 col-lg-5 w-100">
                <div className="card cardRect d-flex align-items-center border-2 border-black" onClick={()=>navigate(link)}
                    onMouseEnter={()=> setIsHovered(true)}
                    onMouseLeave={()=> setIsHovered(false)}>
                    <div className="card-body d-flex flex-column align-items-center" >
                    <img className="imgRectangle" src={isHovered ? imgHoverSrc : imgSrc} alt={titolo} />
                    <p className="card-text mt-3 poppins-semibold fs-5">{titolo}</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Rectangle;