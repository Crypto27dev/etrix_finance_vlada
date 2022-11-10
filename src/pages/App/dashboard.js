import React, { useState, useEffect, useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Slider from '@mui/material/Slider';
import { Reveal } from 'react-awesome-reveal';
import Sidebar from '../../components/menu/SideBar';
import { IsSmMobile, numberWithCommas, fadeInUp, fadeIn } from '../../utils';
import { config, def_config } from '../../config';
import Subheader from '../../components/menu/SubHeader';
import ConnectWallet from '../../components/menu/ConnectWallet';
import { useSigningClient } from '../../context/web3Context';

const ChartURL = `https://teams.bogged.finance/embeds/chart?address=${config.ETR_CONTRACT}&chain=bsc&charttype=line&theme=bg:06302566|bg2:036b60FF|primary:024643FF|secondary:5cf28fff|text:F3F6FBFF|text2:F3F6FBFF|candlesUp:1BC870FF|candlesDown:ff4976ff|chartLine:15d465FF&defaultinterval=15m&showchartbutton=true`;

const DashboardBody = () => {
  const {
    balance
  } = useSigningClient();

  const DEF_APY = (def_config.APY * 100).toFixed(2);
  const [ETRPrice, setETRPrice] = useState('0.07');
  const [amount, setAmount] = useState(0);
  const [apy, setAPY] = useState(DEF_APY);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [futurePrice, setFuturePrice] = useState(0);
  const [days, setDays] = useState(30);
  const [initAmount, setInitAmount] = useState(0);
  const [wealth, setWealth] = useState(0);
  const [rewardEst, setRewardEst] = useState(0);
  const [potentialReturn, setPotentialReturn] = useState(0);

  useEffect(() => {
    setInitAmount((Number(amount) * Number(purchasePrice)));
    setWealth((Number(amount) * Number(ETRPrice)));
    const rewards = ((((Number(apy) + 100) / 100) ** (days / 365)) * Number(amount));
    setRewardEst(rewards);
    setPotentialReturn((rewards * Number(futurePrice)));
  }, [amount, apy, purchasePrice, futurePrice, days, ETRPrice]);

  const handleSlide = useCallback((event, value) => {
    setDays(value);
  }, []);

  const handleAmount = useCallback((event) => {
    setAmount(event.target.value);
  }, []);

  const handleAPY = useCallback((event) => {
    setAPY(event.target.value);
  }, []);

  const handlePurchasePrice = useCallback((event) => {
    setPurchasePrice(event.target.value);
  }, []);

  const handleFuturePrice = useCallback((event) => {
    setFuturePrice(event.target.value);
  }, []);

  const handleMax = useCallback(() => {
    if (balance.ETR !== '')
      setAmount(Number(balance.ETR));
    else {
      setAmount(0);
    }
  }, [balance]);

  return (
    <div className='app-body'>
      <Reveal keyframes={fadeInUp} className='onStep' delay={400} duration={1000} triggerOnce>
        <div className='row'>
          <div className='w-1/4 xl:w-1/2 lg:w-1/4 md:w-1/2 xsm:w-full mb-3'>
            <div className='app-card'>
              <div className='app-card-header'>
                <span className='text-[15px]'>ETR Price</span>
              </div>
              <div className='app-card-body my-1'>
                <p className='app-color font-semibold text-[30px] text-shorten'>$0.11</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className='w-1/4 xl:w-1/2 lg:w-1/4 md:w-1/2 xsm:w-full mb-3'>
            <div className='app-card'>
              <div className='app-card-header'>
                <span className='text-[15px]'>Market Cap</span>
              </div>
              <div className='app-card-body my-1'>
                <p className='font-semibold text-[30px] text-shorten'>--</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className='w-1/4 xl:w-1/2 lg:w-1/4 md:w-1/2 xsm:w-full mb-3'>
            <div className='app-card'>
              <div className='app-card-header'>
                <span className='text-[15px]'>APY</span>
              </div>
              <div className='app-card-body my-1'>
                <p className='app-color font-semibold text-[30px] text-shorten'>36,500.11%</p>
              </div>
              <div className='app-card-footer'>
                <p className='app-gray text-[14px]'>Daily % Rate (DPR)</p>
                <p className='app-color font-semibold text-[20px] text-shorten'>1.63%</p>
              </div>
            </div>
          </div>
          <div className='w-1/4 xl:w-1/2 lg:w-1/4 md:w-1/2 xsm:w-full mb-3'>
            <div className='app-card'>
              <div className='app-card-header'>
                <span className='text-[15px]'>Total Holders</span>
              </div>
              <div className='app-card-body my-1'>
                <p className='font-semibold text-[30px] text-shorten'>--</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className='w-1/2 xl:w-full xl:h-fit lg:w-1/2 md:w-full'>
            <p className='text-[18px] mt-2 mb-2'>ETR Chart</p>
            <div className='h-full'>
              <iframe
                title="Chart"
                src={ChartURL}
                frameBorder="0"
                className="chart_frame"
              ></iframe>
            </div>
          </div>
          <div className='w-1/2 xl:w-full xl:h-fit lg:w-1/2 md:w-full'>
            <p className='text-[18px] mt-2 mb-2'>Calculator</p>
            <div className='app-card'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='row'>
                    <div className='col-md-6 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>ETR Amount</label>
                        <div className="input-control">
                          <input type="number" name="amount" value={amount} className='input-main' onChange={handleAmount}></input>
                          <span className="input-suffix" onClick={handleMax}>MAX</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>APY (%)</label>
                        <div className="input-control">
                          <input type="number" name="apy" value={apy} className='input-main' onChange={handleAPY}></input>
                          <span className="input-suffix" onClick={() => setAPY(DEF_APY)}>Current</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>ETR Price at purchase ($)</label>
                        <div className="input-control">
                          <input type="number" name="purchasePrice" value={purchasePrice} className='input-main' onChange={handlePurchasePrice}></input>
                          <span className="input-suffix" onClick={() => setPurchasePrice(numberWithCommas(ETRPrice, 6))}>Current</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6 pb-3'>
                      <div className='input-form-control'>
                        <label className='input-label'>Future ETR Price ($)</label>
                        <div className="input-control">
                          <input type="number" name="futurePrice" value={futurePrice} className='input-main' onChange={handleFuturePrice}></input>
                          <span className="input-suffix" onClick={() => setFuturePrice(numberWithCommas(ETRPrice, 6))}>Current</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-12 pb-2 px-4'>
                  <span className='fs-14'>{days} days</span>
                  <Slider
                    size="large"
                    defaultValue={30}
                    value={days}
                    step={1}
                    min={1}
                    max={365}
                    onChange={handleSlide}
                  />
                </div>
                <div className='col-md-12 px-4'>
                  <div className="flex flex-column gap-2">
                    <div className='flex justify-between'>
                      <label className='calc-label'>Your initial investment</label>
                      <span>${numberWithCommas(initAmount, 5)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <label className='calc-label'>Current wealth</label>
                      <span>${numberWithCommas(wealth, 5)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <label className='calc-label'>ETR rewards estimation</label>
                      <span>{numberWithCommas(rewardEst, 5)} ETR</span>
                    </div>
                    <div className='flex justify-between'>
                      <label className='calc-label'>Potential return</label>
                      <span>${numberWithCommas(potentialReturn, 5)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <label className='calc-label'>Potential number of ETR Journeys</label>
                      <span>0</span>
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

const Dashboard = () => (
  <div className='full-container'>
    <Sidebar path="dashboard" />
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
        <Subheader path="dashboard" />
        <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
          <div className='app-title'>
            <p className='text-[20px] text-white'>Dashboard</p>
          </div>
        </Reveal>
        <Reveal keyframes={fadeIn} className='onStep' delay={0} duration={1000} triggerOnce>
          <ConnectWallet />
        </Reveal>

      </div>
      <div className='app-content'>
        {IsSmMobile() ? (
          <DashboardBody />
        ) : (
          <Scrollbars autoHide style={{ height: "100%" }}
            renderThumbVertical={({ style, ...props }) =>
              <div {...props} className={'thumb-horizontal'} />
            }>
            <DashboardBody />
          </Scrollbars>
        )}
      </div>
    </div>
  </div>
)
export default Dashboard;