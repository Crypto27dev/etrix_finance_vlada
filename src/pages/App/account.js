import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Sidebar from '../../components/menu/SideBar';
import { Reveal } from 'react-awesome-reveal';
import RebaseBar from '../../components/app/RebaseBar';
import { IsSmMobile, fadeInUp, fadeIn } from '../../utils';
import Subheader from '../../components/menu/SubHeader';
import ConnectWallet from '../../components/menu/ConnectWallet';
import { config } from '../../config';

const ChartURL = `https://teams.bogged.finance/embeds/chart?address=${config.ETR_CONTRACT}&chain=bsc&charttype=line&theme=bg:06302566|bg2:036b60FF|primary:024643FF|secondary:5cf28fff|text:F3F6FBFF|text2:F3F6FBFF|candlesUp:1BC870FF|candlesDown:ff4976ff|chartLine:15d465FF&defaultinterval=15m&showchartbutton=true`;

const AccountBody = () => {
  return (
    <div className='app-body'>
      <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
        <div className='row'>
          <div className='w-1/2 xl:w-full lg:w-1/2 md:w-full'>
            <div className='row h-full'>
              <div className='w-1/2 mb-4 xl:w-1/4 xl:!mb-0 lg:w-1/2 lg:!mb-4 xsm:w-full'>
                <div className='app-card'>
                  <div className='app-card-header'>
                    <span className='text-[15px]'>Your Earnings / Daily</span>
                  </div>
                  <div className='app-card-body my-1'>
                    <p className='app-color font-semibold text-[30px] text-shorten'>--</p>
                  </div>
                  <div className='app-card-footer'>
                    <span className='text-white text-[20px]'>--</span>
                  </div>
                </div>
              </div>
              <div className='w-1/2 mb-4 xl:w-1/4 xl:!mb-0 lg:w-1/2 lg:!mb-4 xsm:w-full'>
                <div className='app-card'>
                  <div className='app-card-header'>
                    <span className='text-[15px]'>Total Earned</span>
                  </div>
                  <div className='app-card-body my-1'>
                    <p className='app-color font-semibold text-[30px] text-shorten'>--</p>
                  </div>
                  <div className='app-card-footer'>
                    <span className='text-white text-[20px]'>--</span>
                  </div>
                </div>
              </div>
              <div className='w-1/2 xl:w-1/4 lg:w-1/2 xsm:w-full xsm:mb-4'>
                <div className='app-card'>
                  <div className='app-card-header'>
                    <span className='text-[15px]'>APY</span>
                  </div>
                  <div className='app-card-body my-1'>
                    <p className='app-color font-semibold text-[30px] text-shorten'>$36,500.11%</p>
                  </div>
                  <div className='app-card-footer'>
                    <span className='text-white text-[16px]'>Daily % Rate (DPR): ~1.63%</span>
                  </div>
                </div>
              </div>
              <div className='w-1/2 xl:w-1/4 lg:w-1/2 xsm:w-full'>
                <div className='app-card'>
                  <div className='app-card-header'>
                    <span className='text-[15px]'>Your Balance</span>
                  </div>
                  <div className='app-card-body my-1'>
                    <p className='app-color font-semibold text-[30px] text-shorten'>--</p>
                  </div>
                  <div className='app-card-footer'>
                    <span className='text-white text-[20px]'>--</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/2 xl:w-full xl:mt-4 lg:w-1/2 md:w-full lg:mt-0 md:mt-4'>
            <div className='h-full'>
              <iframe
                title="Chart"
                src={ChartURL}
                frameBorder="0"
                className="chart_frame"
              ></iframe>
            </div>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-md-12'>
            <p className='text-[20px] text-white'>Rebase & Claim Activity</p>
            <div className='app-card mt-2'>
              <div className='row'>
                <div className='w-3/12 xl:w-1/2 sm:w-full sm:mb-4'>
                  <div className='app-sub2card flex flex-col justify-between'>
                    <RebaseBar />
                    <div className='mb-4'>
                      <p className='text-white text-[18px] text-center'>Next Rebase <br />Amount</p>
                      <p className='app-color font-semibold text-[20px] text-center'>$0</p>
                      <p className='app-gray text-[14px] text-center'>0 ETR</p>
                    </div>
                    <p className='app-gray text-[14px] text-center'>ETR is Auto-Compounding</p>
                  </div>
                </div>
                <div className='w-4/12 xl:w-1/2 sm:w-full sm:mb-4'>
                  <div className='flex flex-col justify-between h-full'>
                    <p className='text-white text-[18px]'>Your Daily Claim Quote:</p>
                    <span className='app-gray text-[14px] mt-2'>If you choose to take your weekly claim, click below for 1% to maximize your growth. If you'd like to take more earnings, swap here.</span>
                    <div className='app-sub2card flex flex-row justify-between items-center mt-3'>
                      <div className='flex gap-2 items-center'>
                        <img src="/images/icons/etr.png" width={30} alt=""></img>
                        <span className='text-white text-[16px]'>CLAIM ETR</span>
                      </div>
                      <span className='app-yellow'>0</span>
                    </div>
                    <div className='flex flex-col my-3 gap-2'>
                      <div className='flex justify-between'>
                        <span className='app-gray text-[14px]'>Your Earnings/Daily: 1.63%</span>
                        <span className='text-white'>0 ($0)</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='app-gray text-[14px]'>Recommended Claim:1%</span>
                        <span className='text-white'>0 ($0)</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='app-gray text-[14px]'>Claim Tax: 1%</span>
                        <span className='text-white'>0 ($0)</span>
                      </div>
                      <hr />
                      <div className='flex justify-between items-center'>
                        <div className='flex flex-col gap-2'>
                          <span className='app-gray text-[14px]'>Estimated Amount</span>
                          <span className='app-gray text-[14px]'>You'll Receive in BUSD</span>
                        </div>
                        <span className='app-color font-semibold text-[16px]'>$0</span>
                      </div>
                    </div>
                    <div className='text-center'>
                      <button className='btn-main'>Weekly Claim (1%)</button>
                    </div>
                  </div>
                </div>
                <div className='w-5/12 xl:w-full xl:mt-4 sm:w-full'>
                  <div className='app-sub2card !h-fit'>
                    <p className='text-[18px]'>Tax / Reflections Guide</p>
                    <hr />
                    <div className='row'>
                      <div className='col-md-6'>
                        <p className='text-white text-[16px]'>Regular Tax :</p>
                        <div className='flex justify-between'>
                          <span className='app-gray text-[14px]'>Transfer Tax</span>
                          <span className='text-[14px]'>13%</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='app-gray text-[14px]'>Sell Tax</span>
                          <span className='text-[14px]'>20%</span>
                        </div>
                      </div>
                      <div className='col-md-6'>
                        <p className='text-white text-[16px]'>Whale Tax :</p>
                        <div className='flex justify-between'>
                          <span className='app-gray text-[14px]'>{`USD < 1% of LP`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 mt-2'>
                    <div className='flex justify-between'>
                      <span className='app-gray text-[16px] font-semibold'>Current ETR Price</span>
                      <span className='text-[16px]'>--&nbsp;</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='app-gray text-[16px] font-semibold'>Next Reward Amount</span>
                      <span className='text-[16px] app-yellow'>--&nbsp;</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='app-gray text-[16px] font-semibold'>Next Reward Amount USD</span>
                      <span className='text-[16px]'>--&nbsp;</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='app-gray text-[16px] font-semibold'>Next Reward Yield</span>
                      <span className='text-[16px]'>--&nbsp;</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='app-gray text-[16px] font-semibold'>ROI (30-Days Rate)</span>
                      <span className='text-[16px]'>--&nbsp;</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='app-gray text-[16px] font-semibold'>ROI (30-Days Rate) USD</span>
                      <span className='text-[16px]'>--&nbsp;</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

const Account = () => (
  <div className='full-container'>
    <Sidebar path="account" />
    <div>
      <div className='app-container'>
        <div className='app-star-group'>
          <img className='planet1' src="/images/banner/planet.png" alt=""></img>
          <img className='planet2' src="/images/banner/planet.png" alt=""></img>
          <img className='planet3' src="/images/banner/planet.png" alt=""></img>
          <img className='star1' src="/images/banner/star.png" alt=""></img>
          <img className='star2' src="/images/banner/small-star.png" alt=""></img>
          <img className='star3' src="/images/banner/small-star.png" alt=""></img>
          <img className='star4' src="/images/banner/star.png" alt=""></img>
          <img className='star5' src="/images/banner/small-star.png" alt=""></img>
          <img className='star6' src="/images/banner/small-star.png" alt=""></img>
          <img className='star7' src="/images/banner/small-star.png" alt=""></img>
          <img className='star8' src="/images/banner/small-star.png" alt=""></img>
          <img className='star9' src="/images/banner/small-star.png" alt=""></img>
          <img className='star10' src="/images/banner/star.png" alt=""></img>
        </div>
        <div className='app-header'>
          <Subheader path="account" />
          <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
            <div className='app-title'>
              <p className='text-[20px] text-white'>Your Account Activity</p>
            </div>
          </Reveal>
          <Reveal keyframes={fadeIn} className='onStep' delay={0} duration={1000} triggerOnce>
            <ConnectWallet />
          </Reveal>

        </div>
        <div className='app-content'>
          {IsSmMobile() ? (
            <AccountBody />
          ) : (
            <Scrollbars autoHide style={{ height: "100%" }}
              renderThumbVertical={({ style, ...props }) =>
                <div {...props} className={'thumb-horizontal'} />
              }>
              <AccountBody />
            </Scrollbars>
          )}
        </div>
      </div>
    </div>

  </div>
)
export default Account;