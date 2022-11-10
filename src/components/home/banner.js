import React from 'react';
import Reveal from 'react-awesome-reveal';
import { fadeInUp, fadeIn } from '../../utils';

const Banner = () => {
  return (
    <div className='relative'>
      <div className='banner-light md:hidden'>
        <div className='flash-light'></div>
        <img className='banner-planet' src="/images/banner/planet.png" alt=""></img>
      </div>
      <div className="container">
        <div className='banner'>
          <div className="row items-center py-[90px]">
            <div className="col-md-5">
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                <h3 className="text-[60px] md:text-[50px] md:text-center font-semibold text-white"><span className="text-uppercase text-white">ETRIX.IO</span></h3>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
                <h1 className="text-[30px] md:text-[24px] md:text-center mt-3">Auto Staking Platform</h1>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={900} triggerOnce>
                <h1 className="text-[20px] md:text-[16px] md:text-center gray mt-3">Etrix is a global decentralized ecosystem where our stake holders achieve financial freedom though passive income in DeFi</h1>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={900} triggerOnce>
                <div className='mt-5 md:text-center'>
                  <a href="https://docs.etrix.io/" target="_blank" className="btn-main hover:text-white">Read Whitepaper</a>
                </div>
                <div className="mb-sm-30"></div>
              </Reveal>
            </div>
            <div className="col-md-7 relative">
              <Reveal className='onStep' keyframes={fadeIn} delay={900} duration={1500} triggerOnce>
                <img className="logo" src="./images/banner/banner.png" alt="" />
              </Reveal>
              <div className='star-group'>
                <img className='star1' src="./images/banner/star.png" alt="" />
                <img className='star2' src="./images/banner/star.png" alt="" />
                <img className='star3 md:hidden' src="./images/banner/star.png" alt="" />
                <img className='star4' src="./images/banner/star.png" alt="" />
                <img className='star5' src="./images/banner/small-star.png" alt="" />
                <img className='star6 md:hidden' src="./images/banner/small-star.png" alt="" />
                <img className='star7' src="./images/banner/small-star.png" alt="" />
                <img className='star8' src="./images/banner/small-star.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Banner;