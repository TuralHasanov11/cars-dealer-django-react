import React, { useEffect, useRef, useState } from 'react';
import "./LightboxCarousel.css"


export default function LightboxCarousel({images}) {

  const [slideIndex, setSlideIndex] = useState(1)
  const mySlides = useRef([])
  const demo = useRef([])

  useEffect(()=>{
    showSlides(slideIndex);
  }, [])

  function plusSlides(n) {
    setSlideIndex(slideIndex + n)
    showSlides(slideIndex + n);
  }

  function currentSlide(n) {
    setSlideIndex(n)
    showSlides(n);
  }

  function showSlides(n) {
    let i;
    let currentIndex = n
    if (n > mySlides.current.length) {
      setSlideIndex(1)
      currentIndex = 1
    }
    if (n < 1) {
      setSlideIndex(mySlides.current.length)
      currentIndex = mySlides.current.length
    }
    for (i = 0; i < mySlides.current.length; i++) {
      mySlides.current[i].style.display = "none";
    }
    for (i = 0; i < demo.current.length; i++) {
      demo.current[i].className = demo.current[i].className.replace(" lightbox-active", "");
    }
    mySlides.current[currentIndex-1].style.display = "block";
    demo.current[currentIndex-1].className += " lightbox-active";
  }

  return <>
    <div className="lightbox-container">
      {images?.map((image, index) => (<div key={index} ref={(element) => {mySlides.current[index] = element}} className="lightbox-mySlides lightbox-fade">
        <div className="lightbox-numbertext">{index+1} / {images?.length}</div>
          <img src={`${image.image}`} style={{width:'100%'}} />
      </div>))}

      <a className="lightbox-prev" onClick={()=>{plusSlides(-1)}}>&#10094;</a>
      <a className="lightbox-next" onClick={()=>{plusSlides(1)}}>&#10095;</a>

      <div className="lightbox-row">
        {images?.map((image, index) => (<div key={index} className="lightbox-column">
          <img ref={(element) => {demo.current[index] = element}}  className="lightbox-demo lightbox-cursor" src={`${image.image}`} style={{width:'100%'}} onClick={()=>{currentSlide(index+1)}} alt={`${image.type}`} />
        </div>))}
      </div>
    </div>
  </>;
}
