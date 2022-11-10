import React from 'react';
import Reveal from 'react-awesome-reveal';
import { fadeInUp } from '../../utils';

const Who = () => {
  return (
    <div className='relative'>
      <div className='who-light'>
        <div className='flash-light'></div>
        <img className='who-planet' src="/images/banner/planet.png" alt=""></img>
      </div>
      <img className='who-line sm:!w-[100px]' src="/images/banner/line1.png" alt=""></img>
      <div className='who-star-group'>
        <img className='star1' src="./images/banner/star.png" alt="" />
        <img className='star2' src="./images/banner/star.png" alt="" />
        <img className='star3' src="./images/banner/star.png" alt="" />
        <img className='star4' src="./images/banner/meteor2.png" alt="" />
      </div>
      <div className="container">
        <div className='who'>
          <div className="row items-center py-[90px] md:py-[50px]">
            <div className="col-md-6">
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                <h3 className="text-[50px] md:text-[40px] md:text-center font-semibold text-white">Who We Are?</h3>
              </Reveal>
            </div>
            <div className="col-md-6 relative md:mt-4">
              <Reveal className='onStep' keyframes={fadeInUp} delay={400} duration={600} triggerOnce>
                <h3 className="text-[20px] md:text-[18px] md:text-center text-white">Etrix is a recurring, automated revenue creating DeFi biological system filled by the ETR token. With Etrix, our financial backers will actually want to partake in the easy to use elements of auto-marking.</h3>
              </Reveal>
              <Reveal className='onStep mt-4 md:text-center' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
                <a href="https://docs.etrix.io/introduction/who-we-are"><span className="text-[20px] font-semibold text-white text-effect">Learn More <i className="fa-solid fa-arrow-up-right"></i></span></a>
              </Reveal>
            </div>
            <div className='col-md-12 relative'>
              <img className='star4' src="./images/banner/star.png" alt="" />
              <img className='mt-[120px] mx-auto' src="/images/banner/watermark1.png" alt=""></img>
              <img className='logo-watermark  sm:!w-[300px]' src="/images/banner/watermark2.png" alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Who;