import React from "react";


import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const Slider = ({ array = [] }) => {
  return (
    <div>
      <Carousel
        infiniteLoop={true}
        showThumbs={true}  // hide thumbnails if you don't want them
        showStatus={false}
      >
        {array?.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              flex: 1,
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              maxHeight: '500px'
            }}
          >
            <img 
              src={item} 
              alt={`slide item-${index}`} 
              style={{ 
                maxHeight: '100%', 
                maxWidth: '100%', 
                objectFit: 'contain'
              }} 
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
