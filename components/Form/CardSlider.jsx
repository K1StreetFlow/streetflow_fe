// CardSlider.jsx
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute z-999 top-1/4 transform -translate-y-1/2 left-2 cursor-pointer bg-black bg-opacity-10 p-3 rounded-full" onClick={onClick}>
      <FaArrowLeft className="text-white" />
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute top-1/4 transform -translate-y-1/2 right-2 cursor-pointer bg-black bg-opacity-10 p-3 rounded-full" onClick={onClick}>
      <FaArrowRight className="text-white" />
    </div>
  );
};

const CardSlider = ({ cards }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    variableWidth: true,
    centerMode: true,
    centerPadding: '0',
  };

  return (
    <div className="relative">
      <Slider {...settings} className="mx-0 -ml-2 mr-0 -mr-2">
        {cards}
      </Slider>
    </div>
  );
};

export default CardSlider;
