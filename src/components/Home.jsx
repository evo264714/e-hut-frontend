import React from 'react';
import Slider from 'react-slick';
import AllProducts from './AllProducts';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to E-Hut</h1>

      <Slider {...settings} className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <div>
          <img src="https://i.ibb.co.com/1mR365R/img3.webp" alt="Slide 1" className="w-full h-96 object-cover" />
        </div>
        <div>
          <img src="https://i.ibb.co.com/1Tn65TP/img2.jpg" alt="Slide 2" className="w-full h-96 object-cover" />
        </div>
        <div>
          <img src="https://i.ibb.co.com/cC6nsMT/img1.webp" alt="Slide 3" className="w-full h-96 object-cover" />
        </div>
      </Slider>

      <AllProducts />
    </div>
  );
};

export default Home;
