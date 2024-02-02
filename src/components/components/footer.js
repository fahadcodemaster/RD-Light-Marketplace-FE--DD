import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import social1 from '../../assets/images/social-icon-1.png';
import social2 from '../../assets/images/social-icon-2.png';
import social3 from '../../assets/images/social-icon-3.png';
import aroow from '../../assets/images/send-arrow.png';
import footerlogo from '../../assets/images/footer-logo.png';

import { useHistory } from "react-router";
const getCurruntYear = () => {
  return new Date().getFullYear();
}
const Footer = () => {


  const history = useHistory();
  return (
    <footer class="container-fluid">
      <div class="row">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-12 col-sm-12">
              <img src={footerlogo} />
              <h5>Midnight Trades Slogan or details comes here with other infos,</h5>
              <ul className='socail-media-list'>
                <li><a target="_blank" href="https://twitter.com/redlight"><img src={social1} alt="twitter" /></a></li>
                {/* <li><a target="_blank" href="javascript:void(0);"><img src={social2} alt="Media" /></a></li> */}
                <li><a target="_blank" href="https://discord.com/invite/redlightfinance"><img src={social3} alt="Social Media" /></a></li>
              </ul>
              <p>
                Copyright &copy;  2022 Redlight Finance  All rights reserved.
              </p>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12">
              <ul className='three-child-list'>
                <li><a href="/">Home</a></li>
                <li><a href="/explore">Marketplace</a></li>
                <li><a href="/explore">Explore</a></li>
                <li><a href="/allcollections">Collections</a></li>
                <li><a href="/createnft">Create NFT </a></li>
                <li><a href="/myprofile">My Profile</a></li>
                <li><a href="/explore">NFTS</a></li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-12 col-sm-12">
              <h6>Subscribe Us</h6>
              <div className="subscribe-pnl">
                <input autoComplete="off" className="form-control" placeholder="Info@yourgmail.com" />
                <button><img src={aroow} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
};
export default Footer;
