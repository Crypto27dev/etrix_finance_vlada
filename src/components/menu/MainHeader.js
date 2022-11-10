import React, { useEffect } from "react";
import { Link } from '@reach/router';
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { useScrollSection } from "react-scroll-section";
import Popover from '@mui/material/Popover';
import { IsMobile } from '../../utils';

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);

const MainHeader = function () {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const section1 = useScrollSection('section1');
  const section2 = useScrollSection('section2');
  const section3 = useScrollSection('section3');
  const section4 = useScrollSection('section4');
  const section5 = useScrollSection('section5');
  const section6 = useScrollSection('section6');

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        totop.classList.add("show");

      } else {
        header.classList.remove("sticky");
        totop.classList.remove("show");
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

  return (
    <header id="myHeader" className='navbar white'>
      <div className='container'>
        <div className='row w-100-nav'>
          <div className='logo px-0'>
            <div className='navbar-title navbar-item'>
              <NavLink to="/">
                {IsMobile() ? (
                  <img
                    src="/images/logo/logo.gif"
                    className="img-fluid"
                    alt="#"
                    width="140"
                  />
                ) : (
                  <img
                    src="/images/logo/logo.gif"
                    className="img-fluid"
                    alt="#"
                    width="150"
                  />
                )}
              </NavLink>
            </div>
          </div>
          <BreakpointProvider>
            <Breakpoint l down>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}>
                <div className='navbar-item'>
                  <span onClick={() => { section1.onClick(); handleClose(); }} selected={section1.selected}>
                    Home
                  </span>
                </div>
                <div className='navbar-item'>
                  <span onClick={() => { section2.onClick(); handleClose(); }} selected={section2.selected}>
                    Who We Are?
                  </span>
                </div>
                <div className='navbar-item'>
                  <span onClick={() => { section3.onClick(); handleClose(); }} selected={section3.selected}>
                    Exchange
                  </span>
                </div>
                <div className='navbar-item'>
                  <span onClick={() => { section4.onClick(); handleClose(); }} selected={section4.selected}>
                    Road Map
                  </span>
                </div>
                <div className='navbar-item'>
                  <span onClick={() => { section5.onClick(); handleClose(); }} selected={section5.selected}>
                    Our Team
                  </span>
                </div>
                <div className='navbar-item'>
                  <span onClick={() => { section6.onClick(); handleClose(); }} selected={section6.selected}>
                    FAQs
                  </span>
                </div>
              </Popover>
            </Breakpoint>

            <Breakpoint xl>
              <div className='menu'>
                <div className='navbar-item'>
                  <span onClick={section1.onClick} selected={section1.selected}>
                    Home
                    <div className='lines'></div>
                  </span>
                </div>
                <div className='navbar-item'>
                  <span onClick={section2.onClick} selected={section2.selected}>
                    Who We Are?
                    <div className='lines'></div>
                  </span>
                </div>
                <div className='navbar-item'>
                  <span onClick={section3.onClick} selected={section3.selected}>
                    Exchange
                    <div className='lines'></div>
                  </span>
                </div>
                <div className='navbar-item'>
                  <span onClick={section4.onClick} selected={section4.selected}>
                    Road Map
                    <div className='lines'></div>
                  </span>
                </div>
                <div className='navbar-item'>
                  <span onClick={section5.onClick} selected={section5.selected}>
                    Our Team
                    <div className='lines'></div>
                  </span>
                </div>
                <div className='navbar-item'>
                  <span onClick={section6.onClick} selected={section6.selected}>
                    FAQs
                    <div className='lines'></div>
                  </span>
                </div>
              </div>
            </Breakpoint>
          </BreakpointProvider>

          <div className='mainside'>
            <Link to="/presale">Launch DApp</Link>
          </div>
        </div>

        <button className="nav-icon" onClick={handleClick}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>
      </div>
    </header >
  );
}

export default MainHeader;