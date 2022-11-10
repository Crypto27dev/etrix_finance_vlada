import React from 'react';
import Reveal from 'react-awesome-reveal';
import { Chart } from "react-google-charts";
import { fadeInUp, IsMobile } from '../../utils';

const data = [
  ["Task", ""],
  ["BURN", 15],
  ["RESERVE", 10],
  ["TEAM", 10],
  ["MARKETING", 5],
  ["PUBLIC SALE", 38],
  ["LIQUIDITY", 20],
  ["ITO FEE", 2]
];

const options = {
  is3D: true,
  backgroundColor: 'transparent',
  legend: {
    alignment: 'center',
    textStyle: {
      color: '5CF28F',
    }
  }
};

const Tokenomics = () => {
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
        <div className='token'>
          <div className="row items-center">
            <div className='col-md-12'>
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                <h3 className="text-[50px] md:text-[40px] font-semibold text-white text-center">Tokenomics</h3>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                <div className='min-h-[500px] md:min-h-[200px] md:my-[40px]'>
                  <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={IsMobile() ? "200px" : "500px"}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Tokenomics;