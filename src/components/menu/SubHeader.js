import React, { useState } from 'react';
import { Link } from '@reach/router';
import Breakpoint, { BreakpointProvider } from "react-socks";
import Popover from '@mui/material/Popover';

const Subheader = ({ path }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='sub-header hidden lg:block'>
      <button className="app-nav-icon" onClick={handleClick}>
        <div className="menu-line white"></div>
        <div className="menu-line1 white"></div>
        <div className="menu-line2 white"></div>
      </button>
      <BreakpointProvider>
        <Breakpoint l down>
          <Popover
            id={id}
            className='subheader-popover'
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}>
            <div className='navbar-item px-1'>
              <Link to="/">
                <img className='pointer' alt='' src={'/images/logo/logo.gif'} width={150} />
              </Link>
            </div>
            <div className={path === 'presale' ? 'navbar-item menu-active-item' : 'navbar-item'}>
              <Link to="/presale">
                <div className='flex gap-2 items-center'>
                  <i className="fa-solid fa-rocket-launch"></i>
                  <span>Presale</span>
                </div>
              </Link>
            </div>
            <div className={path === 'dashboard' ? 'navbar-item menu-active-item' : 'navbar-item'}>
              <Link to="/dashboard">
                <div className='flex gap-2 items-center'>
                  <i className="fa-solid fa-landmark"></i>
                  <span>Dashboard</span>
                </div>
              </Link>
            </div>
            <div className={path === 'account' ? 'navbar-item menu-active-item' : 'navbar-item'}>
              <Link to="/account">
                <div className='flex gap-2 items-center'>
                  <i className="fa-solid fa-user"></i>
                  <span>Account</span>
                </div>
              </Link>
            </div>
            <div className={path === 'swap' ? 'navbar-item menu-active-item' : 'navbar-item'}>
              <Link to="/swap">
                <div className='flex gap-2 items-center'>
                  <i className="fa-solid fa-right-left"></i>
                  <span>Buy / Swap</span>
                </div>
              </Link>
            </div>
          </Popover>
        </Breakpoint>
      </BreakpointProvider>
    </div>
  )
}

export default Subheader;