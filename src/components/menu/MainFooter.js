const footer = () => (
  <footer className="footer-light">
    <div className="subfooter">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="flex flex-col justify-center items-center">
              <span className="mt-2 mb-4" onClick={() => window.open("", "_self")}>
                <img alt="" className="f-logo d-1" src="./images/logo/logo.gif" width="400" />
              </span>
              <span className="text-[20px] font-semibold gray">STAY CONNECTED</span>
            </div>
            <div className="social-icons">
              <a href="https://discord.com/channels/956252792908038247/956252793407176806" target="_blank" rel="noreferrer"><i className="fa-brands fa-discord fa-lg"></i></a>
              <a href="https://www.facebook.com/etrix.io" target="_blank" rel="noreferrer"><i className="fa fa-facebook fa-lg"></i></a>
              <a href="https://twitter.com/etrixofficial" target="_blank" rel="noreferrer"><i className="fa fa-twitter fa-lg"></i></a>
              <a href="https://www.instagram.com/etrix.io/" target="_blank" rel="noreferrer"><i className="fa fa-instagram fa-lg"></i></a>
              <a href="https://etrix.medium.com/" target="_blank" rel="noreferrer"><i className="fa fa-medium fa-lg"></i></a>
              <a href="https://www.reddit.com/r/etrixfinance/" target="_blank" rel="noreferrer"><i className="fa-brands fa-reddit-alien fa-lg"></i></a>
              <a href="https://#" target="_blank" rel="noreferrer"><i className="fa fa-linkedin fa-lg"></i></a>
              <a href="https://t.me/etrixofficial" target="_blank" rel="noreferrer"><i className="fa fa-telegram fa-lg"></i></a>
              <a href="https://#" target="_blank" rel="noreferrer"><i className="fa fa-pinterest fa-lg"></i></a>
              <a href="https://www.tiktok.com/@etrix.io" target="_blank" rel="noreferrer"><i className="fa-brands fa-tiktok fa-lg"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mainfooter">
      <div className="flex md:flex-col md:justify-center md:items-center text-center justify-between container">
        <span>Copyright © 2022, <span className="text-effect font-semibold">ETRIX.IO</span>. All Rights Reserved.</span>
        <span className="flex">
          Made with&nbsp;<img draggable="false" role="img" className="emoji" alt="❤" src="https://s.w.org/images/core/emoji/14.0.0/svg/2764.svg" width={15}></img>&nbsp;by&nbsp;<span className="text-effect font-bold">ETRIX.IO</span>
        </span>
      </div>
    </div>
  </footer>
);
export default footer;