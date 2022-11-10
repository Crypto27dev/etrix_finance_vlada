import React from 'react';
import Reveal from 'react-awesome-reveal';
import { fadeInUp } from '../../utils';

const Team = () => {
  return (
    <div className='relative'>
      <div className='team-light'>
        <div className='flash-light'></div>
        <img className='line' src="/images/banner/line1.png" alt=""></img>
      </div>
      <div className='team-star-group'>
        <img className='star1' src="./images/banner/star.png" alt="" />
        <img className='star2' src="./images/banner/star.png" alt="" />
        <img className='star3' src="./images/banner/star.png" alt="" />
        <img className='star4' src="./images/banner/small-star.png" alt="" />
        <img className='star5' src="./images/banner/small-star.png" alt="" />
        <img className='star6' src="./images/banner/small-star.png" alt="" />
        <img className='planet' src="./images/banner/planet2.png" alt="" />
      </div>
      <div className="container">
        <div className='team mt-[70px]'>
          <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
            <h3 className="text-[50px] md:text-[40px] font-semibold text-white text-center">Our Team</h3>
          </Reveal>
          <div className="team-members row my-5 justify-center">
            <Reveal className='onStep w-1/4 lg:w-1/3 md:w-1/2' keyframes={fadeInUp} delay={400} duration={800} triggerOnce>
              <div className='member' onClick={() => window.open("https://www.linkedin.com/in/kevin-wolfe-7a671a1b2/", "_blank")}>
                <div className='relative'>
                  <img className='md:mx-auto' src="/images/team/kevin.png" alt="CEO"></img>
                  <a className='linkedin-icon' href="https://www.linkedin.com/in/kevin-wolfe-7a671a1b2/"><i className="fa fa-linkedin fa-lg"></i></a>
                </div>
                <span className='w-full inline-block member-name mt-3 xsm:!text-[14px]'>Kevin Wolfe</span>
                <h1 className='text-[15px] xsm:text-[11px] my-2'>Chief Executive Officer</h1>
              </div>
            </Reveal>
            <Reveal className='onStep w-1/4 lg:w-1/3 md:w-1/2' keyframes={fadeInUp} delay={600} duration={800} triggerOnce>
              <div className='member' onClick={() => window.open("https://www.linkedin.com/in/loganhurley1/", "_blank")}>
                <div className='relative'>
                  <img className='md:mx-auto' src="/images/team/logan.jpg" alt="CFO"></img>
                  <a className='linkedin-icon' target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/loganhurley1/"><i className="fa fa-linkedin fa-lg"></i></a>
                </div>
                <span className='w-full inline-block member-name mt-3 xsm:!text-[14px]'>Logan Hurley</span>
                <h1 className='text-[15px] xsm:text-[11px] my-2'>Chief Financial Officer</h1>
              </div>
            </Reveal>
            <Reveal className='onStep w-1/4 lg:w-1/3 md:w-1/2' keyframes={fadeInUp} delay={600} duration={800} triggerOnce>
              <div className='member' onClick={() => window.open("https://www.linkedin.com/in/jennifermadison12/", "_blank")}>
                <div className='relative'>
                  <img className='md:mx-auto' src="/images/team/jennifer.jpg" alt="CTO"></img>
                  <a className='linkedin-icon' target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/jennifermadison12/"><i className="fa fa-linkedin fa-lg"></i></a>
                </div>
                <span className='w-full inline-block member-name mt-3 xsm:!text-[14px]'>Jennifer Madison</span>
                <h1 className='text-[15px] xsm:text-[11px] my-2'>Chief Technology Officer</h1>
              </div>
            </Reveal>
            <Reveal className='onStep w-1/4 lg:w-1/3 md:w-1/2' keyframes={fadeInUp} delay={800} duration={800} triggerOnce>
              <div className='member' onClick={() => window.open("https://www.linkedin.com/in/sam-lambert-781230100/", "_blank")}>
                <div className='relative'>
                  <img className='md:mx-auto' src="/images/team/samlambert.jpg" alt="Specialist"></img>
                  <a className='linkedin-icon' target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/sam-lambert-781230100/"><i className="fa fa-linkedin fa-lg"></i></a>
                </div>
                <span className='w-full inline-block member-name mt-3 xsm:!text-[14px]'>Sam Lambert</span>
                <h1 className='text-[15px] xsm:text-[11px] my-2'>Blockchain Specialist</h1>
              </div>
            </Reveal>
            <Reveal className='onStep w-1/4 lg:w-1/3 md:w-1/2' keyframes={fadeInUp} delay={800} duration={800} triggerOnce>
              <div className='member' onClick={() => window.open("https://www.linkedin.com/in/jessica-bass-878a61200/", "_blank")}>
                <div className='relative'>
                  <img className='md:mx-auto' src="/images/team/jessica.jpg" alt="Specialist"></img>
                  <a className='linkedin-icon' target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/jessica-bass-878a61200/"><i className="fa fa-linkedin fa-lg"></i></a>
                </div>
                <span className='w-full inline-block member-name mt-3 xsm:!text-[14px]'>Jessica Bass</span>
                <h1 className='text-[15px] xsm:text-[11px] my-2'>Sale And Marketing</h1>
              </div>
            </Reveal>
            <Reveal className='onStep w-1/4 lg:w-1/3 md:w-1/2' keyframes={fadeInUp} delay={1000} duration={800} triggerOnce>
              <div className='member'>
                <div className='relative'>
                  <img className='md:mx-auto' src="/images/team/kostadin.jpg" alt="Specialist"></img>
                  {/* <a className='linkedin-icon' target="_blank" rel="noreferrer" href="#"><i className="fa fa-linkedin fa-lg"></i></a> */}
                </div>
                <span className='w-full inline-block member-name mt-3 xsm:!text-[14px]' href="#">Kostadin Gorgiev</span>
                <h1 className='text-[15px] xsm:text-[11px] my-2'>Lead Developer</h1>
              </div>
            </Reveal>
            <Reveal className='onStep w-1/4 lg:w-1/3 md:w-1/2' keyframes={fadeInUp} delay={1000} duration={800} triggerOnce>
              <div className='member'>
                <div className='relative'>
                  <img className='md:mx-auto' src="/images/team/maya.jpg" alt="Specialist"></img>
                  {/* <a className='linkedin-icon' target="_blank" rel="noreferrer" href="#"><i className="fa fa-linkedin fa-lg"></i></a> */}
                </div>
                <span className='w-full inline-block member-name mt-3 xsm:!text-[14px]' href="#">Maya Cho</span>
                <h1 className='text-[15px] xsm:text-[11px] my-2'>Advisor</h1>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Team;