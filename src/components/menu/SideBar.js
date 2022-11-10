import { useCallback, useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { useMediaQuery } from 'react-responsive';
import { createGlobalStyle } from 'styled-components';
// import { getMarketCap } from '../../core/web3';
// import * as selectors from '../../store/selectors';
// import { getMagicPriceInWeb3 } from '../../core/web3';
import '../../pages/App/app.scss';

const GlobalStyles = createGlobalStyle`
  .social-icons span {
    text-shadow: none;
    color: #fff !important;
    padding: 5px 10px 8px;
    text-align: center;
    font-size: 22px;
    border-radius: 5px;
    margin: 16px;
  }

  .menu-text {
    font-family: "Poppins";
    font-weight: 400;
    font-size: 16px;
    @media only screen and (max-width: 768px) {
      margin-left: 8px !important;
    }
  }
`;

const path_list = ['', 'presale', 'dashboard', 'account', 'swap', 'etrix_control/admin'];

const Sidebar = ({ path }) => {
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    let path_name = path;
    if (!path_list.includes(path))
      path_name = '';
    if (path_name === 'etrix_control/admin')
      setAdmin(true);
    else
      setAdmin(false);
  }, [path]);

  return (
    <>
      <GlobalStyles />
      <div className='navbar-light'>
        <img className='star1' src="/images/banner/star.png" alt="" />
      </div>
      <div className='my-navbar'>
        <div className='navbar-star-group'>
          <img className='star2' src="/images/banner/star.png" alt="" />
          <img className='star3' src="/images/banner/star.png" alt="" />
          <img className='star4' src="/images/banner/small-star.png" alt="" />
        </div>
        <div className="navbar-content z-50">
          <div className='logo-img flex flex-col space-y-2 items-center pt-3 pb-4'>
            <Link className='cursor-pointer' to='/'>
              <img alt='' src={'/images/logo/logo.gif'} width={200} />
            </Link>
          </div>

          <nav>
            {!isAdmin ? (
              <>
                <Link
                  to='/'
                  className={`menu-item ${path === ''
                    ? 'menu-active-item block transition duration-200  text-white'
                    : 'block transition duration-200 app-gray hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-house-chimney"></i>
                    <div className='menu-text text-lg'>Home</div>
                  </div>
                </Link>
                <Link
                  to='/presale'
                  className={`menu-item ${path === 'presale'
                    ? 'menu-active-item block transition duration-200  text-white'
                    : 'block transition duration-200  app-gray hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-rocket-launch"></i>
                    <div className='menu-text text-lg'>Presale</div>
                  </div>
                </Link>
                <Link
                  to='/dashboard'
                  className={`menu-item ${path === 'dashboard'
                    ? 'menu-active-item block transition duration-200  text-white'
                    : 'block transition duration-200  app-gray hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-landmark"></i>
                    <div className='menu-text text-lg'>Dashboard</div>
                  </div>
                </Link>
                <Link
                  to='/account'
                  className={`menu-item ${path === 'account'
                    ? 'menu-active-item block transition duration-200  text-white'
                    : 'block transition duration-200  app-gray hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-user"></i>
                    <div className='menu-text text-lg'>Account</div>
                  </div>
                </Link>
                <Link
                  to='/swap'
                  className={`menu-item ${path === 'swap'
                    ? 'menu-active-item block transition duration-200  text-white'
                    : 'block transition duration-200  app-gray hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-right-left"></i>
                    <div className='menu-text text-lg'>Buy / Swap</div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                {/********************** ADMIN ****************************/}
                <Link
                  to='/etrix_control/admin'
                  className={`menu-item ${path === 'etrix_control/admin'
                    ? 'menu-active-item block transition duration-200  text-white'
                    : 'block transition duration-200  app-gray hover:text-white'
                    }`}
                >
                  <div className='flex space-x-6 align-items-center'>
                    <i className="fa-solid fa-grid-2"></i>
                    <div className='text-lg'>Administrator</div>
                  </div>
                </Link>
                {/********************** ADMIN ****************************/}
              </>
            )}
          </nav>
        </div>
        <div className='align-self-center text-white mb-[40px]' align="center">
          <p>Copyright © 2022<br />ETRIX, LLC</p>
          <p className='text-effect'>All Rights Reserved.</p>
        </div>
        <div className='footer-star-group'>
          <img src="/images/banner/planet.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
