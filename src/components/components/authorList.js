import React, { Component, useEffect, useState, } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import http from "../../Redux/Api/http";
import { FaUser } from "react-icons/fa";
import { PropagateLoader, BounceLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import defaultImg from "../../assets/images/default.png";
import bannerimg from "../../assets/images/banner-img.jpg";
import bnb from "../../assets/images/bnb.png";
import Verify from "../../assets/images/Verify.png";

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}
const AuthorList = () => {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  useEffect(() => {
    http
      .get(httpUrl + "/api/v1/Nft/GetTopSeller")
      .then(async (res) => {
        console.log(
          "Responseeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          res.data.data.accountList
        );
        setData(res.data.data.accountList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, []);

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {loading ? (
        <div className="col-sm-12 d-flex justify-content-center">
          <BounceLoader color="white" size="60" />
        </div>
      ) : (
        <>
        {data.length === 0 &&(
          <span style={{color:'white'}}>
            No Record Found
          </span>
        )}
          {/* <div className="nft author_list ol-styling"> */}
            <Slider {...settings}>
              {data?.map((payload, index) => (
                <>
                  <CustomSlide className="itm" index={1}>
                    <ul className='socail-media-list'>
                    <li className="full-div">
                    <div className='row'>

                      <div className="top-creator-post">
                        <div className="top-creator-post-inner">
                          <div className="nft-img-pnl" onClick={() => history.push(payload?.address === WalletAddress ? `/myprofile` : `/profile/${payload?.address}`)} >
                            <img className="lazy" src={payload?.profileImage ? httpUrl + "/" + payload?.profileImage : defaultImg} alt="" />
                            <span className="check-span"><i className="fa fa-check"></i></span>
                          </div>
                          <div className="txt-pnl">
                            <div className="txt-inner">
                              <h4 onClick={() => window.open("", "_self")}>{payload?.username ? payload.username : "Unnamed"}</h4>
                              <p><span>{payload.accountStatus}</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </li>

                    </ul>
                  </CustomSlide>
                </>
              ))}
            </Slider>
          {/* </div> */}
        </>
      )}

      <div></div>
    </>
  );
};
export default AuthorList;
