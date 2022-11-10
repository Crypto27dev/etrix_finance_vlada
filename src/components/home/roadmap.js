import React from "react";
import Reveal from 'react-awesome-reveal';
import { fadeInUp } from '../../utils';

const RoadMap = () => {
  return (
    <div className="relative">
      <div className='roadmap-light'>
        <div className='flash-light'></div>
      </div>
      <div className="container">
        <div className="roadmap mt-[100px]">
          <div className="row">
            <div className="col-md-12">
              <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                <h3 className="text-[50px] md:text-[40px] font-semibold text-white text-center">Road Map</h3>
              </Reveal>
            </div>
            <div className="col-md-12 mt-5">
              <div className="roadmap-timeline">
                <div className="timeline"></div>
                <div className="row">
                  <div className="col-md-3 roadmap-item">
                    <span className="roadmap-time active">Q4 2022</span>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={400} duration={600} triggerOnce>
                      <div>
                        <ul className="roadmap-data">
                          <li>Presale on *TBA* Platform</li>
                          <li>Pre-Launch Marketing</li>
                          <li>Etrix.Finance Audit</li>
                          <li>Dashboard Stress Test</li>
                          <li>Multi Community Creation</li>
                          <li>Multi Language Website/Docs</li>
                          <li>Multi Language Docs</li>
                          <li>Youtube Marketing Campaign</li>
                          <li>Coingecko Listing</li>
                          <li>Coinmarketcap Listing</li>
                          <li>Coin Trackers Listing</li>
                          <li>DappRadar Listing</li>
                          <li>Rewards Program</li>
                          <li>Bounty Program</li>
                          <li>Cross-Chain Integration</li>
                        </ul>
                      </div>
                    </Reveal>
                  </div>
                  <div className="col-md-3 roadmap-item">
                    <span className="roadmap-time">Q1 2023</span>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
                      <div>
                        <ul className="roadmap-data">
                          <li>Dashboard V2 / Update UI/UX</li>
                          <li>Social Media Marketing</li>
                          <li>SEO</li>
                          <li>Expand Dev Team</li>
                          <li>Partnerships DeFi</li>
                          <li>Cross-Chain Integration</li>
                          <li>DAO</li>
                          <li>Articles in Yahoo Finance, MarketWatch, Nasdaq, etc</li>
                          <li>PR Marketing</li>
                          <li>Stablecoin farming/node investments</li>
                          <li>Protocol owned liquidity bonds</li>
                        </ul>
                      </div>
                    </Reveal>
                  </div>
                  <div className="col-md-3 roadmap-item">
                    <span className="roadmap-time">Q2 2023</span>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={800} duration={600} triggerOnce>
                      <div>
                        <ul className="roadmap-data">
                          <li>OnRamp Integration</li>
                          <li>NFT Collections</li>
                          <li>NFT for special benefits (staking, royalties, airdrops, voting rights, etc)</li>
                          <li>Etrix.io Merch</li>
                          <li>Development Mobile Application iOS and Android</li>
                        </ul>
                      </div>
                    </Reveal>
                  </div>
                  <div className="col-md-3 roadmap-item">
                    <span className="roadmap-time">Q3 2023</span>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={1000} duration={600} triggerOnce>
                      <div>
                        <ul className="roadmap-data">
                          <li>Etrix decentralized exchange DEX (etrix.exchange)</li>
                          <li>Borrow & Lend Dapp</li>
                        </ul>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadMap;