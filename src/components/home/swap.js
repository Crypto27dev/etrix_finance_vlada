import React, { useEffect } from 'react';
import Reveal from 'react-awesome-reveal';
import $ from 'jquery';
import { fadeInUp } from '../../utils';

const SwapURL = 'https://app.bogged.finance/bsc/swap?&embed=1&tokenIn=BNB&tokenOut=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&theme=dark';

const Swap = () => {
  return (
    <div className='relative'>
      <div className='token-light'>
        <div className='flash-light'></div>
      </div>
      <div className='token-star-group'>
        <img className='star1' src="./images/banner/star.png" alt="" />
        <img className='star2' src="./images/banner/star.png" alt="" />
        <img className='star3' src="./images/banner/star.png" alt="" />
        <img className='star4' src="./images/banner/small-star.png" alt="" />
        <img className='star5' src="./images/banner/small-star.png" alt="" />
        <img className='star6' src="./images/banner/small-star.png" alt="" />
        <img className='planet md:hidden' src="./images/banner/planet.png" alt="" />
        <img className='planet2' src="./images/banner/planet2.png" alt="" />
        <img className='line md:!w-[150px]' src="./images/banner/line1.png" alt="" />
      </div>
      <div className="container">
        <div className='exchange'>
          <div className="row">
            <div className='col-md-6'>
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                <div>
                  <h3 className="text-[50px] md:text-[40px] font-semibold text-white">ETR Exchange</h3>
                  <p className='text-[20px] app-gray mt-3'>It is advantageous in cryptocurrency as it generates rewards by holding the coin on any exchange and generating passive income.</p>
                </div>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                <p className='text-[22px] text-white mt-5'>Available Soon On These Exchanges</p>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={400} duration={600} triggerOnce>
                <div className='flex flex-wrap gap-2 mt-3 mb-[50px]'>
                  <div className='exchange_llc'>
                    <img src="/images/swap/pancake.png" alt=""></img>
                  </div>
                  <div className='exchange_llc'>
                    <img src="/images/swap/whitebit.png" alt=""></img>
                  </div>
                  <div className='exchange_llc'>
                    <img src="/images/swap/bitmart.png" alt=""></img>
                  </div>
                  <div className='exchange_llc'>
                    <img src="/images/swap/lbank.png" alt=""></img>
                  </div>
                  <div className='exchange_llc'>
                    <img src="/images/swap/hotbit.png" alt=""></img>
                  </div>
                  <div className='exchange_llc'>
                    <img src="/images/swap/bkex.png" alt=""></img>
                  </div>
                  <div className='exchange_llc'>
                    <img src="/images/swap/xt.png" alt=""></img>
                  </div>
                  <div className='exchange_llc'>
                    <img src="/images/swap/ztglobal.png" alt=""></img>
                  </div>
                  <div className='exchange_llc'>
                    <img src="/images/swap/shibaswap.png" alt=""></img>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className='col-md-6 flex items-center justify-center mx-auto'>
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                <div className='swap-logo h-full'>
                  <div id="ripple"></div>
                  <div id="ripple2"></div>
                  <div id="ripple3"></div>
                  <img className='w-[300px]' src="/images/icons/etr_500.png" alt="" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Swap;