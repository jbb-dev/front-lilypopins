import React, { useState } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css'; 
import { avatarGirl } from '../Others/avatar'
import { avatarBoy } from '../Others/avatar'
import './carouselAvatar.css'


const CarouselAvatar = () => {
  return (
  <div className='main-carousel-avatar'>
    <Carousel plugins={['arrows']}>
        <img src={avatarGirl[0]} />
        <img src={avatarGirl[2]} />
        <img src={avatarGirl[3]} />
    </Carousel>
  </div>)
}

export default CarouselAvatar;