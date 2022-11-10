/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo, useState, useEffect, useCallback } from 'react';
import { Reveal } from 'react-awesome-reveal';
import { createGlobalStyle } from 'styled-components';
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ReactToolTip from 'react-tooltip';
import { Scrollbars } from 'react-custom-scrollbars';
import Sidebar from '../../components/menu/SideBar';
import SelectCoin from '../../components/app/SelectCoin';
import { fadeInUp, fadeIn, IsSmMobile, numberWithCommas } from '../../utils';
import { config, def_config } from '../../config';
import Subheader from '../../components/menu/SubHeader';
import ConnectWallet from '../../components/menu/ConnectWallet';

const GlobalStyles = createGlobalStyle`
  .swap-card {
    width: 600px;
    padding: 15px 20px;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    @media only screen and (max-width: 1279px) {
      width: 500px;
    }

    @media only screen and (max-width: 639px) {
      width: 100%;
    }
  }

  .input-token-panel {
    display: flex;
    position: relative;
    background: linear-gradient(135deg, rgba(0, 245, 255, 0.2) 0%, rgba(0, 232, 125, 0.2) 87.58%, rgba(0, 230, 106, 0.2) 100%);
    border-radius: 20px;
    flex-direction: column;
    text-align: left;
    padding: 20px 16px 10px;
    gap: 10px;
    border: solid 1px #036b60;
  }

  .input-token {
    width: 60%;
    background: transparent;
    outline: none;
    font-family: "Poppins", Helvetica, Arial, sans-serif;
    font-size: 22px;
    color: #ffb84d;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: right;
  }

  .slippage-form {
    width: 60%;
    border: solid 1px white;
    border-radius: 10px;
    .input-slippage {
      width: 100%;
      background: transparent;
      outline: none;
      padding: 5px 10px;
      font-family: 'Poppins';
      font-size: 16px;
      font-weight: 400;
      color: white;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }  

  .btn-change {
    background-color: #ffb84d !important;
    border-radius: 50% !important;
    &:hover {
      background: #e9c083 !important;
    }
  }

  .btn-swap {
    width: 100%;
    padding: 10px;
    font-family: 'Poppins';
    font-size: 18px;
    border-radius: 8px;
    background: linear-gradient(90deg, #7A1BFF -3.88%, #5947FF 100%);
    &.approve {
      background: #4ed047;
    }
    :disabled {
      background: #626262b3;
    }
  }

  .btn-max {
    padding: 0px 5px;
    margin: 10px 10px 10px 0px;
    &:hover {
      background: #0d6b4a;
      border-radius: 8px;
    }
  }

  .btn-select-coin {
    padding: 0px 15px;
    margin: 10px 0px;
    &:hover {
      background: #4c3486;
      border-radius: 8px;
    }
  }

  .swap-color {
    color: #ffb84d;
  }

  .MuiChip-label {
    padding-left: 8px;
    padding-right: 8px;
    font-size: 18px;
  }

  .calc-label {
    font-family: "Poppins";
    font-size: 16px;
    font-weight: 400;
    color: #BCC3CF;
  }
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#137655',
  borderRadius: '20px',
  boxShadow: 24,
  pt: 4,
  pb: 4,
  px: 3,
};

const magic_coin = [
  { code: 2, label: 'ETR' },
];

const coinLabel = (arrange, coinType) => {
  if (arrange && coinType === 0) {
    return 'BNB';
  } else if (arrange && coinType === 1) {
    return 'BUSD';
  } else {
    return 'ETR';
  }
}

const SwapBody = () => {
  const DEF_APY = def_config.APY;
  const SWAP_FEE = def_config.SWAP_FEE;
  const AUTO_SLIPPAGE = def_config.AUTO_SLIPPAGE;
  const balance = 0; //useSelector(selectors.userBalance);
  //   const wallet = useSelector(selectors.userWallet);
  //   const web3 = useSelector(selectors.web3State);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [coinType, setCoinType] = useState(0);
  const [fromBalance, setFromBalance] = useState(0);
  const [toBalance, setToBalance] = useState(0);
  const [insufficient, setInsufficient] = useState(false);
  const [isApprovedBUSD, setApproveBUSD] = useState(false);
  const [isApprovedETR, setApproveETR] = useState(false);
  const [providerFee, setProviderFee] = useState(0);
  const [amountPerMagic, setAmountPerMagic] = useState(0);
  const [slippage, setSlippage] = useState(AUTO_SLIPPAGE);
  const [reserves, setReserves] = useState([]); // 0: ETR 1: BUSD
  const [priceImpact, setPriceImpact] = useState(0);
  const [amountMinMax, setAmountMinMax] = useState(0);

  const [coin_arrange, setCoinArrange] = useState(true); // true: From, false: To
  const [exactToken, setExactToken] = useState(true); // true: From, false: To
  const [tokenAmountA, setTokenAmountA] = useState('');
  const [tokenAmountB, setTokenAmountB] = useState('');

  const [tradingTax, setTradingTax] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleSelectCoin = useCallback((e, value) => {
    setCoinType(value);
  }, []);

  const handleFromPercent = async (value) => { }

  const handleSwapMax = (type) => { }

  const handleSlippage = (value) => {
    setSlippage(value);
    if (exactToken) {
      setAmountMinMax(tokenAmountB * (1 - value / 100));
    } else {
      setAmountMinMax(tokenAmountA * (1 + value / 100));
    }
  }

  const onClick_ApproveETR = async () => { }

  const onClick_ApproveBUSD = async () => { }

  const onClick_ChangeCoin = async () => {
    const arrange = !coin_arrange;
    setCoinArrange(arrange);
    if (exactToken) {
      setTokenAmountB(tokenAmountA);
      handleChangeTokenAmount(tokenAmountA, 'in', arrange);
    } else {
      setTokenAmountA(tokenAmountB);
      handleChangeTokenAmount(tokenAmountB, 'out', arrange);
    }
    setExactToken(!exactToken);
  }

  const onChangeTokenAmountA = async (event) => {
    setTokenAmountA(event.target.value);
    handleChangeTokenAmount(Number(event.target.value), 'out');
    setExactToken(true);
  }
  const onChangeTokenAmountB = async (event) => {
    setTokenAmountB(event.target.value);
    handleChangeTokenAmount(Number(event.target.value), 'in');
    setExactToken(false);
  }

  const handleChangeTokenAmount = async (amount, type, arrange = coin_arrange) => {
    if (type === 'out') {
      if (Number(amount) === 0) {
        setTokenAmountB('');
      } else { }
    } else if (type === 'in') {
      if (Number(amount) === 0) {
        setTokenAmountA('');
      } else { }
    }
  }

  const priceImpactCalculation = (reserve, amountTraded) => { // reserve should be ETR.
    const fee = 0.003;
    const amountInWithFee = Number(amountTraded * (1 - fee))
    const reserveTokenFrom = Number(reserve)
    const priceImpact = amountInWithFee / (reserveTokenFrom + amountInWithFee)
    const priceImpactPersent = (priceImpact * 100).toFixed(2);
    setPriceImpact(priceImpactPersent)
  }

  const receiveCoinType = useMemo(() => {
    let type = 0;
    if (exactToken) {
      if (coin_arrange) {
        type = 'ETR';
      } else {
        type = coinType === 0 ? 'BNB' : 'BUSD';
      }
    } else {
      if (coin_arrange) {
        type = coinType === 0 ? 'BNB' : 'BUSD';
      } else {
        type = 'ETR';
      }
    }
    return type;
  }, [coinType, coin_arrange, exactToken]);

  const addTokenCallback = useCallback(async () => {
    const tokenAddress = config.MagicAddress;
    const tokenSymbol = 'ETR';
    const tokenDecimals = 18;
    const tokenImage = ``;

    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log('Adding ETR token');
      } else {
        console.log('ETR token has been added to you wallet!')
      }
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleSwap = async () => { }

  const initialize = useCallback(async () => { }, []);

  useEffect(() => {
    const getTokenPrice = async () => { }
    getTokenPrice();
  }, []);

  useEffect(() => {
    let price = 0;
    let tax = 0;
    if (coin_arrange && Number(tokenAmountB) > 0) {
      price = Number(tokenAmountA) / Number(tokenAmountB);
      tax = Number(tokenAmountB) * def_config.BUY_FEE;
    } else if (!coin_arrange && Number(tokenAmountA) > 0) {
      price = Number(tokenAmountB) / Number(tokenAmountA);
      tax = Number(tokenAmountA) * def_config.SELL_FEE;
    }

    setTradingTax(tax);
    setAmountPerMagic(numberWithCommas(price, 10));
    setProviderFee(Number(tokenAmountA) * SWAP_FEE);
  }, [tokenAmountA, tokenAmountB, coin_arrange, SWAP_FEE]);

  useEffect(() => {
    if (Number(tokenAmountA) > fromBalance) {
      setInsufficient(true);
    } else {
      setInsufficient(false);
    }
  }, [tokenAmountA, fromBalance]);

  useEffect(() => {
    if (coin_arrange) {
      if (coinType === 0) {
        setFromBalance(Number(balance.bnbBalance));
      } else if (coinType === 1) {
        setFromBalance(Number(balance.busdBalance));
      }
      setToBalance(Number(balance.magicBalance));
    } else {
      if (coinType === 0) {
        setToBalance(Number(balance.bnbBalance));
      } else if (coinType === 1) {
        setToBalance(Number(balance.busdBalance));
      }
      setFromBalance(Number(balance.magicBalance));
    }
  }, [balance, coin_arrange, coinType]);

  useEffect(() => {
    initialize();
  }, [initialize]);
  return (
    <div className='app-body'>
      <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
        <div className='app-card swap-card'>
          <div className='row'>
            <div className='col-md-12 align-items-stretch pb-3'>
              <div className='full-card text-center flex flex-col justify-between align-items-center h-full'>
                <>
                  <div className='main-card pb-2 w-full'>
                    <div className="flex align-items-center justify-between">
                      <div className='flex-column text-left'>
                        <span className='text-[24px] font-semibold ls-1 mb-1 text-left'>Swap</span>
                        {coin_arrange ? (
                          <p className='mb-2'>Buy ETR below using <b>BNB</b> or <b>BUSD</b></p>
                        ) : (
                          <p className='mb-2'>Sell <b>ETR</b> below</p>
                        )}
                      </div>
                      <IconButton component="span" sx={{ color: '#ffb84d' }} onClick={handleOpen}>
                        <i className="fa-light fa-gear"></i>
                      </IconButton>
                    </div>
                    <div className="input-token-panel">
                      <div className='flex justify-between'>
                        <span className="text-[18px] font-semibold app-bright">From</span>
                        <span className='text-[18px] app-bright cursor-pointer' onClick={() => handleSwapMax(1)}>Balance: {numberWithCommas(fromBalance)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        {coin_arrange ? (
                          <SelectCoin className='select-coin' value={coinType} onChange={handleSelectCoin} />
                        ) : (
                          <SelectCoin className='select-coin' value={2} coins={magic_coin} />
                        )}
                        {coin_arrange ? (
                          <button className='btn-max swap-color' onClick={() => handleFromPercent(100)}>MAX</button>
                        ) : (
                          <>
                            <button className='btn-max swap-color' onClick={() => handleFromPercent(20)}>20%</button>
                            <button className='btn-max swap-color' onClick={() => handleFromPercent(50)}>50%</button>
                          </>
                        )}
                        <input type="number" className="input-token" name="input_from" placeholder='0.0' value={tokenAmountA} onChange={onChangeTokenAmountA} disabled></input>
                      </div>
                    </div>
                    <IconButton component="span" className="btn-main2 mt-2 mb-2 mx-auto w-10 h-10" onClick={onClick_ChangeCoin}>
                      <i className="fa-regular fa-arrow-down-arrow-up"></i>
                    </IconButton>
                    <div className="input-token-panel">
                      <div className='flex justify-between'>
                        <span className="text-[18px] font-semibold">To</span>
                        <span className='text-[18px] cursor-pointer' onClick={() => handleSwapMax(2)}>Balance: {numberWithCommas(toBalance)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        {coin_arrange ? (
                          <SelectCoin className='select-coin' value={2} coins={magic_coin} />
                        ) : (
                          <SelectCoin className='select-coin' value={coinType} onChange={handleSelectCoin} />
                        )}
                        <input type="number" className="input-token" name="input_from" placeholder='0.0' value={tokenAmountB} onChange={onChangeTokenAmountB} disabled></input>
                      </div>
                    </div>
                    <div className='flex flex-column mt-3'>
                      <div className='flex justify-between'>
                        <p className='app-gray'>Price</p>
                        <span className='fs-16'>{numberWithCommas(amountPerMagic, 8)} {coinType === 0 ? 'BNB' : 'BUSD'} per ETR</span>
                      </div>
                      <div className='flex justify-between'>
                        <p className='app-gray'>Slippage Tolerance</p>
                        <span className='fs-16'>{slippage} %</span>
                      </div>
                      <div className='flex justify-between'>
                        {coin_arrange ? (
                          <p className='text-center fs-14 app-gray mb-0'>Buy Tax (15%)</p>
                        ) : (
                          <>
                            <a className='text-center fs-14 app-gray hover:text-white cursor-pointer' data-tip data-for="main">Sell Tax (30%)</a>
                            <ReactToolTip className='tooltip' id="main" place={'top'} backgroundColor='#702ce9' textColor='white' type="dark" effect="solid" multiline={true}>
                              <span>Current Sell tax is subject to change. We've launched with 30% and will be reducing this % in the near term. We recommend holding your ETR.</span>
                            </ReactToolTip>
                          </>
                        )}
                        <span className='fs-16'>{numberWithCommas(tradingTax)}</span>
                      </div>
                    </div>
                    <div className='flex mt-2'>
                      {(tokenAmountA === '' || tokenAmountA === 0 || tokenAmountB === '' || tokenAmountB === 0) ? (
                        <button className="btn-swap" disabled>Enter an amount</button>
                      ) : (
                        <>
                          {insufficient ? (
                            <button className="btn-swap" disabled>Insufficient {coinLabel(coin_arrange, coinType)} balance</button>
                          ) : (
                            <>
                              {priceImpact > 90 ? (
                                <button className="btn-swap" disabled>Insufficient liquidity for this trade.</button>
                              ) : (
                                <>
                                  {priceImpact >= 15 ? (
                                    <button className="btn-swap" disabled>Price Impact Too High</button>
                                  ) : (
                                    <div className='flex gap-4 w-full'>
                                      {coin_arrange ? !isApprovedBUSD && (
                                        <button className="btn-swap approve" onClick={onClick_ApproveBUSD}>Approve BUSD</button>
                                      ) : !isApprovedETR && (
                                        <button className="btn-swap approve" onClick={onClick_ApproveETR}>Approve ETR</button>
                                      )}
                                      <button className="btn-swap" onClick={handleSwap} disabled={coin_arrange ? !isApprovedBUSD && 'disabled' : !isApprovedETR && 'disabled'}>SWAP</button>
                                    </div>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}

                      {/* 
                    {(tokenAmountA === '' || tokenAmountA === 0 || tokenAmountB === '' || tokenAmountB === 0) ? (
                      <button className="btn-swap" disabled>Enter an amount</button>
                    ) : (insufficient ? (
                      <>
                        <button className="btn-swap" disabled>Insufficient {coinLabel(coin_arrange, coinType)} balance</button>
                      </>
                    ) : (
                      <>
                        {coin_arrange ? !isApprovedBUSD && (
                          <button className="btn-swap approve" onClick={onClick_ApproveBUSD}>Approve BUSD</button>
                        ) : !isApprovedETR && (
                          <button className="btn-swap approve" onClick={onClick_ApproveETR}>Approve ETR</button>
                        )}
                        <button className="btn-swap" onClick={handleSwap} disabled={coin_arrange ? !isApprovedBUSD && 'disabled' : !isApprovedETR && 'disabled'}>SWAP</button>
                      </>
                    ))} */}
                    </div>
                    <div className='flex justify-center align-items-center gap-3 mt-2 cursor-pointer' onClick={addTokenCallback}>
                      <img src="/images/icons/metamask.png" alt="" width="30"></img>
                      <span className='fs-14'> Add <span className='app-color'>ETR</span> token to MetaMask</span>
                    </div>
                  </div>
                  <div className='main-card flex flex-col justify-center w-full mt-2' style={{ height: '120px' }}>
                    <div className='flex justify-between'>
                      {exactToken ? (
                        <p className='app-gray'>Minimum received</p>
                      ) : (
                        <p className='app-gray'>Maximum sold</p>
                      )}
                      <p>{numberWithCommas(amountMinMax, 5)} {receiveCoinType}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='app-gray'>Price Impact</p>
                      <p className={priceImpact < 3 ? 'text-green' : priceImpact < 15 ? 'text-warning' : 'text-error'}>{priceImpact < 0.01 ? '< 0.01%' : priceImpact + '%'}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='app-gray'>Liquidity Provider Fee</p>
                      <p>{numberWithCommas(providerFee, 8)} {coinLabel(coin_arrange, coinType)}</p>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Settings
          </Typography>
          <div id="modal-modal-description" className="mt-3">
            <div className="flex flex-column">
              <p className='app-gray'>Slippage tolerance</p>
              <div className="d-flex justify-content-between gap-2">
                <div className='slippage-form flex align-items-center'>
                  <input type="number" className="input-slippage" name="input_from" placeholder='0.0' onChange={(e) => handleSlippage(e.target.value)}></input>
                  <span className='fs-20 text-white px-2'>%</span>
                </div>
                <div className='flex align-items-center'>
                  <Chip label="0.1%" className='fs-20' variant={slippage === 0.1 ? 'filled' : ''} onClick={() => handleSlippage(0.1)} />
                  <Chip label="0.5%" className='fs-20' variant={slippage === 0.5 ? 'filled' : ''} onClick={() => handleSlippage(0.5)} />
                  <Chip label="1.0%" className='fs-20' variant={slippage === 1 ? 'filled' : ''} onClick={() => handleSlippage(1)} />
                  <Chip label="Auto" className='fs-20' variant={slippage === 0 ? 'filled' : ''} onClick={() => handleSlippage(AUTO_SLIPPAGE)} />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

const Swap = () => (
  <div className='full-container'>
    <GlobalStyles />
    <Sidebar path="swap" />
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
      <div className='app-header justify-end'>
        <Subheader path="swap" />
        <Reveal keyframes={fadeIn} className='onStep' delay={0} duration={1000} triggerOnce>
          <ConnectWallet />
        </Reveal>
      </div>
      <div className='app-content'>
        {IsSmMobile() ? (
          <SwapBody />
        ) : (
          <Scrollbars autoHide style={{ height: "100%" }}
            renderThumbVertical={({ style, ...props }) =>
              <div {...props} className={'thumb-horizontal'} />
            }>
            <SwapBody />
          </Scrollbars>
        )}
      </div>
    </div >
  </div >
);

export default Swap;