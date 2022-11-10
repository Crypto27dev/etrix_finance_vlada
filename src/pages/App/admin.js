import { useState } from 'react';
import Reveal from 'react-awesome-reveal';
import { createGlobalStyle } from 'styled-components';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import moment from 'moment';
import $ from 'jquery';
import { toast } from 'react-toastify';
import Scrollbars from 'react-custom-scrollbars';
import Sidebar from '../../components/menu/SideBar';
import Subheader from '../../components/menu/SubHeader';
import ConnectWallet from '../../components/menu/ConnectWallet';
import { fadeIn, fadeInUp, isEmpty, IsSmMobile } from '../../utils';
import { useSigningClient } from '../../context/web3Context';

const GlobalStyles = createGlobalStyle`
  .admin-content {
    .btn-main {
      width: 200px;
      padding: 5px 10px;
    }
  }

  .admin-input-section {
    gap: 5px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    span {
      white-space: nowrap;
      width: 320px;
    }

    select {
      width: 100%;
      background: transparent;
      border: solid 1px white;
      border-radius: 4px;
      padding: 10px;
      outline: none;

      option {
        width: 100%;
        background: white;
        color: black;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
      }
    }
  }

  input {
    background: transparent;
	  border: 1px solid white;
    border-radius: 5px;
    font-size: 16px !important;
    padding: 10px !important;
    width: 100%;
  }

  .presale-content {
    max-width: 1000px;
    background: rgba(0, 0, 0, 0.2);
    border: solid 1.5px rgba(140, 145, 255, 0.15);
    border-radius: 8px;
    padding: 10px;
    &.main {
      background: linear-gradient(180deg, #291C75 0%, rgba(99, 86, 233, 0) 100%);
    }
  }

  .admin-presale-inner {
    border-radius: 12px;
    padding: 10px 60px 40px;
    position: relative;
    background: transparent;
    h3 {
      line-height: 2;
    }
    @media only screen and (max-width: 1024px) {
      padding: 60px 40px 40px;
    }
    @media only screen and (max-width: 768px) {
      span, button {
        width: 100%;
      }
    }
  }
  
  .gap-row-2 {
    row-gap: 0.5rem;
  }

  .select-date {
    .MuiFormControl-root {
      margin: 0;
    }
    .MuiOutlinedInput-root {
      border: solid 1px white !important;
      background: transparent !important;
      color: white !important;
      &:hover {
        border: solid 1px white !important;
      }
    }
    .MuiOutlinedInput-input {
      padding: 10px !important;
    }
  
    .MuiOutlinedInput-notchedOutline {
      border: none !important;
    }

    .MuiSvgIcon-root {
      color: white !important;
    }
  }
`;


const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '10px 0',
          width: '100%'
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '10px 0',
          width: '100%'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: '#50BFA5',
          borderColor: '#50BFA5',
          outlineColor: '#50BFA5',
          '&:hover': {
            border: 'none'
          }
        },
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            top: '-10px !important',
            color: 'white',
          }
        },
        shrink: {
          color: 'white',
          fontSize: '18px',
          top: '-10px',
          transform: 'translate(14px, -9px) scale(0.75)'
        },
      }
    }
  }
});

const AdminBody = () => {
  const [date_start, setDate_start] = useState();
  const [date_end, setDate_end] = useState(new Date());
  const [feeOnNormal, setFeeOnNormal] = useState(true);
  const [initDistribution, setInitDistribution] = useState(true);
  const [input_data, setInputData] = useState({
    liquidity_receiver: '',
    treasury_receiver: '',
    risk_free_value_receiver: '',
    operation_receiver: '',
    x_magic_receiver: '',
    future_ecosystem_receiver: '',
    burn_receiver: '',
    fee_kind: 0,
    total: '',
    liquidity_fee: '',
    risk_free_value_fee: '',
    treasury_fee: '',
    fee_fee: '',
    operation_fee: '',
    x_magic_fee: '',
    burn_fee: '',
    min_cap: '',
    max_cap: ''
  });

  const {
    setPresaleStartTime,
    setPresaleEndTime,
    setFeesOnNormalTransfer,
    setInitialDistributionFinished,
    setFeeReceivers,
    setFees,
    setMaxCap,
    setMinCap
  } = useSigningClient();

  const handleDate_start = (newValue) => {
    setDate_start(newValue);
  };

  const handleDate_end = (newValue) => {
    setDate_end(newValue);
  };

  const handleFeeOnNormal = (event) => {
    setFeeOnNormal(event.target.value === '0' ? false : true);
  }

  const handleInitDistribution = (event) => {
    setInitDistribution(event.target.value === '0' ? false : true);
  }

  const onClick_SetStartDate = async () => {
    const start = Math.floor(dayjs(date_start).valueOf() / 1000);
    const timezoneOffset = new Date().getTimezoneOffset() * 60;
    const real_time = start - timezoneOffset;
    let result = await setPresaleStartTime(real_time);
    if (result.success) {
      toast.success('Updated the start time successfully.');
    }
  }

  const onClick_SetEndDate = async () => {
    const end = Math.floor(dayjs(date_end).valueOf() / 1000);
    const timezoneOffset = new Date().getTimezoneOffset() * 60;
    const real_time = end - timezoneOffset;
    let result = await setPresaleEndTime(real_time);
    if (result.success) {
      toast.success('Updated the end time successfully.');
    }
  }

  const onClick_FeesOnNormal = async () => {
    let result = await setFeesOnNormalTransfer(feeOnNormal);
    if (result.success) {
      toast.success('Updated the value successfully.');
    }
  }

  const onClick_InitDistribution = async () => {
    let result = await setInitialDistributionFinished(initDistribution);
    if (result.success) {
      toast.success('Updated the value successfully.');
    }
  }

  const onClick_MinCap = async () => {
    if (isEmpty(input_data.min_cap) || Number(input_data.min_cap) === 0) {
      $(`input[name='min_cap']`).focus();
      toast.warning('Please insert a valid value');
      return;
    }
    let result = await setMinCap(input_data.min_cap);
    if (result.success) {
      toast.success('Updated the value successfully.');
    }
  }

  const onClick_MaxCap = async () => {
    if (isEmpty(input_data.max_cap) || Number(input_data.max_cap) === 0) {
      $(`input[name='max_cap']`).focus();
      toast.warning('Please insert a valid value');
      return;
    }
    let result = await setMaxCap(input_data.max_cap);
    if (result.success) {
      toast.success('Updated the value successfully.');
    }
  }

  const receiver_Validation = () => {
    let result = true;
    if (isEmpty(input_data.liquidity_receiver)) {
      $(`input[name='liquidity_receiver']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.treasury_receiver)) {
      $(`input[name='treasury_receiver']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.risk_free_value_receiver)) {
      $(`input[name='risk_free_value_receiver']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.operation_receiver)) {
      $(`input[name='operation_receiver']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.x_magic_receiver)) {
      $(`input[name='x_magic_receiver']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.future_ecosystem_receiver)) {
      $(`input[name='future_ecosystem_receiver']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.burn_receiver)) {
      $(`input[name='burn_receiver']`).focus();
      result = false;
    }
    if (!result) {
      toast.warning('Please insert a valid value');
    }
    return result;
  }

  const fee_Validation = () => {
    let result = true;
    if (isEmpty(input_data.fee_kind)) {
      $(`input[name='fee_kind']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.total)) {
      $(`input[name='total']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.liquidity_fee)) {
      $(`input[name='liquidity_fee']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.risk_free_value_fee)) {
      $(`input[name='risk_free_value_fee']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.treasury_fee)) {
      $(`input[name='treasury_fee']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.fee_fee)) {
      $(`input[name='fee_fee']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.operation_fee)) {
      $(`input[name='operation_fee']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.x_magic_fee)) {
      $(`input[name='x_magic_fee']`).focus();
      result = false;
    }
    else if (isEmpty(input_data.burn_fee)) {
      $(`input[name='burn_fee']`).focus();
      result = false;
    }
    if (!result) {
      toast.warning('Please insert a valid value');
    }
    return result;
  }

  const onClick_FeesReceiver = async () => {
    if (!receiver_Validation()) {
      return;
    }
    const result = await setFeeReceivers(input_data);
    if (result.success) {
      toast.success('Updated the value successfully.');
    }
  }

  const onClick_SetFees = async () => {
    if (!fee_Validation()) {
      return;
    }
    const result = await setFees(input_data)
    if (result.success) {
      toast.success('Updated the value successfully.');
    }
  }

  const handleChange = (event) => {
    const inputData = input_data;
    inputData[event.target.name] = event.target.value;
    setInputData(inputData);
  }

  const handleFeeKind = (event) => {
    const inputData = input_data;
    inputData.fee_kind = Number(event.target.value);
    setInputData(inputData);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='app-body'>
          <div className='row'>
            <div className='w-1/2 md:w-full mb-3'>
              <div className='app-card justify-start'>
                <div className='app-card-header'>
                  <span className='text-[15px]'>&nbsp;</span>
                </div>
                <div className='app-card-body'>
                  <div className="admin-input-section select-date">
                    <span className='text-left text-[15px]'>Start Time: </span>
                    <div className='flex gap-4'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          value={date_start}
                          onChange={handleDate_start}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      <button className='btn-main btn4' onClick={() => { onClick_SetStartDate() }}>SET</button>
                    </div>
                  </div>
                  <div className="admin-input-section select-date">
                    <span className='text-left text-[15px]'>End Time: </span>
                    <div className='flex gap-4'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          value={date_end}
                          onChange={handleDate_end}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      <button className='btn-main btn4' onClick={() => { onClick_SetEndDate() }}>SET</button>
                    </div>
                  </div>
                  <div className='admin-input-section'>
                    <span className='text-left text-[15px]'>Min Cap ($BUSD)</span>
                    <div className='flex gap-4'>
                      <input name="min_cap" type="number" onChange={handleChange}></input>
                      <button className='btn-main btn4' onClick={() => { onClick_MinCap() }}>SET</button>
                    </div>
                  </div>
                  <div className='admin-input-section'>
                    <span className='text-left text-[15px]'>Max Cap ($BUSD)</span>
                    <div className='flex gap-4'>
                      <input name="max_cap" type="number" onChange={handleChange}></input>
                      <button className='btn-main btn4' onClick={() => { onClick_MaxCap() }}>SET</button>
                    </div>
                  </div>
                  <div className="admin-input-section">
                    <span className='text-left text-[15px]'>FeesOnNormalTransfer: </span>
                    <div className='flex gap-4'>
                      <select name="fee_on_normal" onChange={handleFeeOnNormal}>
                        <option value='1'>True</option>
                        <option value='0'>False</option>
                      </select>
                      <button className='btn-main btn4' onClick={() => { onClick_FeesOnNormal() }}>SET</button>
                    </div>
                  </div>
                  <div className="admin-input-section">
                    <span className='text-left text-[15px]'>InitialDistribution: </span>
                    <div className='flex gap-4'>
                      <select name="init_distribution" onChange={handleInitDistribution}>
                        <option value='1'>True</option>
                        <option value='0'>False</option>
                      </select>
                      <button className='btn-main btn4' onClick={() => { onClick_InitDistribution() }}>SET</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-1/2 md:w-full mb-3'>
              <div className='app-card'>
                <div className='app-card-header'>
                  <span className='text-[18px]'>Fees Receivers</span>
                </div>
                <div className='app-card-body'>
                  <div className='flex flex-column'>
                    <span className='text-left text-[15px]'>Liquidity Receiver</span>
                    <input name="liquidity_receiver" type="text" onChange={handleChange}></input>
                  </div>

                  <div className='flex flex-column'>
                    <span className='text-left text-[15px]'>Treasury Receiver</span>
                    <input name="treasury_receiver" type="text" onChange={handleChange}></input>
                  </div>

                  <div className='flex flex-column'>
                    <span className='text-left text-[15px]'>Risk Free Value Receiver</span>
                    <input name="risk_free_value_receiver" type="text" onChange={handleChange}></input>
                  </div>

                  <div className='flex flex-column'>
                    <span className='text-left text-[15px]'>Operation Receiver</span>
                    <input name="operation_receiver" type="text" onChange={handleChange}></input>
                  </div>

                  <div className='flex flex-column'>
                    <span className='text-left text-[15px]'>xETR Receiver</span>
                    <input name="x_magic_receiver" type="text" onChange={handleChange}></input>
                  </div>

                  <div className='flex flex-column'>
                    <span className='text-left text-[15px]'>Future Ecosystem Receiver</span>
                    <input name="future_ecosystem_receiver" type="text" onChange={handleChange}></input>
                  </div>

                  <div className='flex flex-column'>
                    <span className='text-left text-[15px]'>Burn Receiver</span>
                    <input name="burn_receiver" type="text" onChange={handleChange}></input>
                  </div>
                  <div className='flex items-center justify-end pt-3'>
                    <button className='btn-main btn4' onClick={onClick_FeesReceiver}>SET</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/2 md:w-full mb-3'>
            <div className='app-card'>
              <div className='app-card-header'>
                <span className='text-[18px]'>Fees</span>
              </div>
              <div className='app-card-body'>
                <div className='flex flex-column'>
                  <span className='text-left text-[15px]'>Fee Kind</span>
                  <div className="admin-input-section">
                    <select name="fee_kind" onChange={handleFeeKind}>
                      <option value='0'>Buy</option>
                      <option value='1'>Sell</option>
                      <option value='2'>Whale</option>
                      <option value='3'>Invadator</option>
                    </select>
                  </div>
                </div>
                <div className='flex flex-column'>
                  <span className='text-left text-[15px]'>Total</span>
                  <input name="total" type="number" onChange={handleChange}></input>
                </div>
                <div className='flex flex-column'>
                  <span className='text-left text-[15px]'>Liquidity Fee</span>
                  <input name="liquidity_fee" type="number" onChange={handleChange}></input>
                </div>
                <div className='flex flex-column'>
                  <span className='text-left text-[15px]'>Risk Free Value</span>
                  <input name="risk_free_value_fee" type="number" onChange={handleChange}></input>
                </div>
                <div className='flex flex-column'>
                  <span className='text-left text-[15px]'>Treasury Fee</span>
                  <input name="treasury_fee" type="number" onChange={handleChange}></input>
                </div>
                <div className='flex flex-column'>
                  <span className='text-left text-[15px]'>Fee Fee</span>
                  <input name="fee_fee" type="number" onChange={handleChange}></input>
                </div>
                <div className='flex flex-column'>
                  <span className='text-left text-[15px]'>Operation Fee</span>
                  <input name="operation_fee" type="number" onChange={handleChange}></input>
                </div>
                <div className='flex flex-column'>
                  <span className='text-left text-[15px]'>xETR Fee</span>
                  <input name="x_magic_fee" type="number" onChange={handleChange}></input>
                </div>
                <div className='flex flex-column'>
                  <span className='text-left text-[15px]'>Burn Fee</span>
                  <input name="burn_fee" type="number" onChange={handleChange}></input>
                </div>
                <div className='flex items-center justify-end pt-3'>
                  <button className='btn-main btn4' onClick={onClick_SetFees}>SET</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider >
    </>
  );
};

const Admin = () => (
  <div className='full-container'>
    <GlobalStyles />
    <Sidebar path="etrix_control/admin" />
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
      <div className='app-header xl:items-center sm:flex-col'>
        <Subheader path="presale" />
        <Reveal keyframes={fadeInUp} className='onStep' delay={0} duration={800} triggerOnce>
          <div className='app-title'>
            <p className='text-[20px] sm:text-center text-white'>Admin Panel</p>
            <p className='text-[16px] xl:hidden app-gray'>Only Owner can change info</p>
          </div>
        </Reveal>
        <Reveal keyframes={fadeIn} className='onStep' delay={0} duration={1000} triggerOnce>
          <ConnectWallet />
        </Reveal>
      </div>
      <div className='app-content admin-content'>
        {IsSmMobile() ? (
          <AdminBody />
        ) : (
          <Scrollbars autoHide style={{ height: "100%" }}
            renderThumbVertical={({ style, ...props }) =>
              <div {...props} className={'thumb-horizontal'} />
            }>
            <AdminBody />
          </Scrollbars>
        )}
      </div>
    </div >
  </div >
);

export default Admin;