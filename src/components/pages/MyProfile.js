import React, { useEffect, useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import MyNft from "./MyNfts/MyNfts";
import Footer from "../components/footer";
import bannerimg from '../../assets/images/profile-banner.png';
import { createGlobalStyle } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import bar from '../../assets/images/bar.png';
import { FaGlobe, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import MyCollections from "./MyCollections";
import hearticon from "../../assets/images/icon-heart.png";
import nfticon from "../../assets/images/nft-icon.png";
import collectionicon from "../../assets/images/collection-icon.png";
import GetMyAllCollectionsAction from "../../Redux/Actions/CollectionAction/GetMyAllCollections";
import AllFavourite from "./AllFavorite/AllFavourite";
import { WalletDisconnect } from "../../Redux/Actions/WalletActions/WalletAction";
import { AuthConnectRequest } from "../../Redux/Actions/AuthActions/AuthConnectAction";
import { LogoutAction } from "../../Redux/Actions/AuthActions/LogoutAction";
import { ValidateSignatureRequest } from "../../Redux/Actions/AuthActions/ValidateSignatureAction";
import { Dropdown, DropdownButton, SplitButton } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';
import http from "../../Redux/Api/http";
import moment from "moment";
import lINK from '../../assets/images/LINK.png';
import API from "../../Redux/Api";
import rlc from "../../assets/images/RLF-icon.png";
// import Slider from 'react-rangeslider'
import { SingleSlider } from 'react-slider-kit';
import TestNfts from "./MyNfts/TestNfts";
import { toInteger } from "lodash";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const initialState = { isDisable: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 'clicked':
      return { isDisable: true };
    case 'notClicked':
      return { isDisable: false };
  }
}
const GlobalStyles = createGlobalStyle`

`;
const changeImage = (event) => {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};
const MyProfile = function () {
  const [value, setValue] = useState();
  const [value1, setValue1] = useState();
  const [route, setRoute] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [ProfileData, setprofiledata] = useState(false);
  const [nftHistory, setNftHistory] = useState();
  const history = useHistory();
  const [state, disableDispatch] = useReducer(reducer, initialState)
  const location = useLocation()
  useEffect(() => {
    if (location.state?.center) {
      handleBtnClick1()
    }
  }, [location.state])
  const dispatch = useDispatch();
  const User = useSelector((state) => state.Login);

  const myAllCollectionsState = useSelector(
    (state) => state.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );

  const MyNfts = useSelector(
    (state) => state.GetMyAllNfts?.GetMyAllNftsResponse?.data
  );


  const Logoutt = async () => {
    await dispatch(WalletDisconnect());
    await dispatch(AuthConnectRequest());
    await dispatch(LogoutAction());
    await dispatch(ValidateSignatureRequest());
  };


  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );
  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );
  var counter = 0
  useEffect(() => {
    console.log(MyProfile)
    setprofiledata(MyProfile)
    API.GetNftHistoryByAccount.GetNftHistoryByAccountApi().then((response) => {
      setNftHistory(response.data.data)
    })
    // getNftHistory()

    // /api/v1/Nft/GetNftActivityHistory
  }, [MyProfile])
  const [marketNfts, setMarketNfts] = React.useState(MyNfts?.filter((nft) => nft.staus == 'ReadyForSell'));
  const [offers, setHasOffers] = React.useState(true);
  const [auction, setAuction] = React.useState(true);
  const [buyNow, setBuyNow] = React.useState(true);
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [openMenu4, setOpenMenu4] = React.useState(false);
  const [openMenu5, setOpenMenu5] = React.useState(false);
  const [error, setError] = useState(false);
  const [minValue, setMinValue] = useState();
  const [maxValue, setMaxValue] = useState();


  const [filterState, setFilterState] = React.useState({
    topFilter: "OnSale",
    walletAddress: WalletAddress ? WalletAddress : 'nill',
    pageSize: 0,
    currentPage: 0,
    buyNow: false,
    onAuctions: false,
    hasOffers: false,
    categories: [

    ],
    min: 0,
    max: 0,
    sortBy: "",
    sortIndex: 0,
    search: ""
  });


  // const getNftHistory = () => {
  //   MyNfts.forEach(element => {

  //   });
  //   API.GetNftActivityHistory.GetNftActivityByHistoryApi()

  // }


  const priceHandler = () => {
    if (minValue > maxValue) {
      setError(true)
      return
    }
    if (maxValue == 0) {
      setError(true)
      return
    }
    if ((minValue && maxValue) && (minValue <= maxValue)) {
      setFilterState((prev) => {
        return { ...prev, min: toInteger(minValue), max: toInteger(maxValue) }
      })
      setError(false)
    }
  }

  const handleBtnClick = () => {
    setFilterState((prev) => filterState.topFilter ? { ...prev, topFilter: 0 } : { ...prev, topFilter: 0 })
    setOpenMenu(true);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    setOpenMenu5(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    document.getElementById("Mainbtn5").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setFilterState((prev) => filterState.topFilter ? { ...prev, topFilter: "Owner" } : { ...prev, topFilter: "Owner" })
    setFilterState((prev) => {
      return { ...prev, buyNow: false }
    })
    setOpenMenu1(true);
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    setOpenMenu5(false);

    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    document.getElementById("Mainbtn5").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setFilterState((prev) => filterState.topFilter ? { ...prev, topFilter: "Created" } : { ...prev, topFilter: "Created" })
    setFilterState((prev) => {
      return { ...prev, buyNow: false }
    })
    setOpenMenu2(true);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    setOpenMenu5(false);

    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    document.getElementById("Mainbtn5").classList.remove("active");
  };
  const handleBtnClick3 = () => {
    setFilterState((prev) => filterState.topFilter ? { ...prev, topFilter: "Favorite " } : { ...prev, topFilter: "Favorite " })
    setFilterState((prev) => {
      return { ...prev, buyNow: false }
    })
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(true);
    setOpenMenu4(false);
    setOpenMenu5(false);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    document.getElementById("Mainbtn5").classList.remove("active");
  };
  const handleBtnClick4 = () => {
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(true);
    setOpenMenu5(false);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.add("active");
    document.getElementById("Mainbtn5").classList.remove("active");
  };
  const handleBtnClick5 = () => {
    setOpenMenu2(false);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);
    setOpenMenu4(false);
    setOpenMenu5(true);
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn4").classList.remove("active");
    document.getElementById("Mainbtn5").classList.add("active");
  };
  const text = MyProfile?.bio ? MyProfile?.bio?.toString() : '';
  return (
    <div className="gradient-bg-light">
      <GlobalStyles />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <div className="profile-banner">
        <div className="container">
          {ProfileData?.profileBannerImage && (
            <div className="banner">

              <img src={httpUrl + "/" + ProfileData?.profileBannerImage} alt="Banner images" />


              <div className="share-list-pnl">
                <ul className="share-list-list">
                  {/* <li><a href="javascript:void(0);"><i class="fa fa-share-alt"></i></a></li> */}
                  <li><a onClick={() => history.push('/settings')} href="javascript:void(0);"><i class="fa fa-cog"></i></a></li>
                </ul>
              </div>
            </div>
          )}
          {!ProfileData?.profileBannerImage && (
            <div className="banner">

              <img src={bannerimg} alt="Banner images" />


              <div className="share-list-pnl">
                <ul className="share-list-list">
                  {/* <li><a href="javascript:void(0);"><i class="fa fa-share-alt"></i></a></li> */}
                  <li><a onClick={() => history.push('/settings')} href="javascript:void(0);"><i class="fa fa-cog"></i></a></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="profile-image-holder">
        <div className="img-pnl">
          {ProfileData?.profileImage ? (
            <div><img src={httpUrl + "/" + ProfileData?.profileImage} alt="profile.png" /></div>
          ) : (
            <div style={{ color: 'white' }}> <FaUserCircle size="2x" /> </div>
          )}
          <span className="check-span"><i class="fa fa-check"></i></span>
        </div>
        <div className="text-pnl">
          <h2>
            {ProfileData?.username ? ProfileData?.username : "Unnamed"}
          </h2>
          <p id="wallet">
            {/* <span className="email-span" style={{ wordWrap: 'break-word' }}>{ProfileData?.email} </span><br /> */}
            <img src={rlc} style={{
              display: "inline-block",
              maxWidth: "20px",
              marginRight: "4px",
              marginBottom: "4px"

              // display: inline-block;
              // max-width: 20px;
              // margin-right: 4px;
            }} />
            {WalletAddress}{" "}
            <CopyToClipboard
              text={WalletAddress}
              onCopy={() => {
                disableDispatch({ type: 'clicked' })
                toast.success("Address copied successfully", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: true,
                  progress: undefined,
                });
                setTimeout(() => {
                  disableDispatch({ type: 'notClicked' })
                }, 5000);
              }}
            >
              <button
                id="btn_copy"
                title="Copy Address"
                disabled={state.isDisable}
              >
                Copy
              </button>
            </CopyToClipboard>

          </p>
          <br />
          {text && (
            <p id="wallet" className="email-span" style={{ wordWrap: 'break-word' }}>
              {showMore ? text : `${text?.substring(0, 45)}`}
              {text?.length > 45 ? (
                <span className="btn-more-less" style={{ color: "orange", marginLeft: "5px", cursor: "pointer" }} onClick={() => setShowMore(!showMore)}>
                  {showMore ? " show less" : "...show more"}
                </span>
              ) : null
              }</p>
          )}
          <div className="user-social-contacts">
            {
              ProfileData?.instagramLink && ProfileData?.instagramLink != "null" ?
                <a target="blank" href={ProfileData?.instagramLink} style={{ cursor: "pointer", color: "#E250E5", marginRight: "30px", fontSize: "15px" }}   ><i class="fab fa-discord"></i></a>
                : <></>
            }
            {
              ProfileData?.twitterLink && ProfileData?.twitterLink != "null" ?
                <a target="blank" href={ProfileData?.twitterLink} style={{ cursor: "pointer", color: "#E250E5", marginRight: "30px", fontSize: "15px" }}   ><i className="fa fa-twitter"   ></i></a>
                : <></>
            }
            {/* <a target="_blank" href={userData?.twitterLink} style={{cursor:"pointer",color:"white"}}><i className="fa fa-twitter"></i></a> */}
            {
              ProfileData?.yourSiteLink && ProfileData?.yourSiteLink != "null" ?
                <a target="blank" href={ProfileData?.yourSiteLink} style={{ cursor: "pointer", color: "#E250E5", marginRight: "30px", fontSize: "15px" }}   ><i class="fa fa-globe" aria-hidden="true"></i></a>
                : <></>
            }

            {
              ProfileData?.faceBook && ProfileData?.faceBook != "null" ?
                <a target="blank" href={ProfileData?.faceBook} style={{ cursor: "pointer", color: "#E250E5", marginRight: "30px", fontSize: "15px" }}   ><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
                : <></>
            }
            {/* <a target="_blank" href={userData?.yourSiteLink}  style={{cursor:"pointer",color:"white"}}><i className="fa fa-yourSiteLink"></i></a> */}
          </div>
        </div>
      </div>


      <section className="container p-t-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="de_nav de_nav">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}> On Sale</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}> Owned</span>
                </li>
                <li id="Mainbtn2" className="">
                  <span onClick={handleBtnClick2}> Created</span>
                </li>
                <li id="Mainbtn3" className="">
                  <span onClick={handleBtnClick3}> Favourites</span>
                </li>
                <li id="Mainbtn4" className="">
                  <span onClick={handleBtnClick4}> Collections</span>
                </li>
                <li id="Mainbtn5" className="">
                  <span onClick={handleBtnClick5}> Activity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='tab-container full-div'>
          {/* Side Filter */}
          {(openMenu || openMenu1 || openMenu2 || openMenu3) && (
            <div className="side-filter-bar">
              <div className="filter-head-pnl">
                <h5>Filters</h5>
                <i className="fa fa-clock"></i>
              </div>
              <div className="filter-body-pnl">
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Status <i className='fa fa-angle-down'></i>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <form>
                          <div class="form-check">
                            <input onChange={() => setFilterState((prev) => filterState.buyNow ? { ...prev, buyNow: false } : { ...prev, buyNow: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                              Buy Now
                            </label>
                          </div>
                          <div class="form-check">
                            <input onChange={() => setFilterState((prev) => filterState.onAuctions ? { ...prev, onAuctions: false } : { ...prev, onAuctions: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                            <label class="form-check-label" for="defaultCheck2">
                              On Auctions
                            </label>
                          </div>
                          <div onChange={() => setFilterState((prev) => filterState.hasOffers ? { ...prev, hasOffers: false } : { ...prev, hasOffers: true })} class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" />
                            <label class="form-check-label" for="defaultCheck3">
                              Has Offers
                            </label>
                          </div>
                        </form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Categories <i className='fa fa-angle-down'></i>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <form>
                          <div class="form-check">
                            {/* {console.log()} */}
                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 1) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 1) } : { ...prev, categories: [1] })} class="form-check-input" type="checkbox" value="" id="defaultCheck4" />
                            <label class="form-check-label" for="defaultCheck4">
                              Art
                            </label>
                          </div>
                          <div class="form-check">
                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 2) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 2) } : { ...prev, categories: [2] })} class="form-check-input" type="checkbox" value="" id="defaultCheck5" />
                            <label class="form-check-label" for="defaultCheck5">
                              Music
                            </label>
                          </div>
                          <div class="form-check">
                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 3) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 3) } : { ...prev, categories: [3] })} class="form-check-input" type="checkbox" value="" id="defaultCheck6" />
                            <label class="form-check-label" for="defaultCheck6">
                              Photography
                            </label>
                          </div>
                          <div class="form-check">
                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 4) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 4) } : { ...prev, categories: [4] })} class="form-check-input" type="checkbox" value="" id="defaultCheck7" />
                            <label class="form-check-label" for="defaultCheck7">
                              Utility
                            </label>
                          </div>
                          <div class="form-check">
                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 5) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 5) } : { ...prev, categories: [5] })} class="form-check-input" type="checkbox" value="" id="defaultCheck8" />
                            <label class="form-check-label" for="defaultCheck8">
                              Certificate
                            </label>
                          </div>
                          <div class="form-check">
                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 6) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 6) } : { ...prev, categories: [6] })} class="form-check-input" type="checkbox" value="" id="defaultCheck9" />
                            <label class="form-check-label" for="defaultCheck9">
                              Collectibles
                            </label>
                          </div>
                          <div class="form-check">
                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 7) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 7) } : { ...prev, categories: [7] })} class="form-check-input" type="checkbox" value="" id="defaultCheck10" />
                            <label class="form-check-label" for="defaultCheck10">
                              Sports
                            </label>
                          </div>
                        </form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="2">
                        Price <i className='fa fa-angle-down'></i>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <div className='bar-pnl'>
                          <p>Min price</p>
                          <span style={{ color: "white" }}>{minValue ? minValue : 0}</span>
                          <div>
                            <RangeSlider
                              onLoadStart={0}
                              onChange={e => setMinValue(e.target.value)}
                            />
                          </div>
                          <p>Max price</p>
                          <span style={{ color: "white" }}>{maxValue ? maxValue : 0}</span>
                          <div>
                            <RangeSlider
                              onChange={e => setMaxValue(e.target.value)}
                            />
                          </div>
                          <div className='col-md-12 text-align-left'>
                            <button disabled={error} onClick={() => priceHandler()} className={error ? "reg-btn grey" : "reg-btn blue"} href="javascript:void(0);">Apply </button>
                          </div>
                        </div>
                        <p>
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="3">
                        File  <i className='fa fa-angle-down'></i>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                        <form>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                            <label class="form-check-label" for="defaultCheck11">
                              Image
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                            <label class="form-check-label" for="defaultCheck11">
                              Video
                            </label>
                          </div>
                          {/* <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                          <label class="form-check-label" for="defaultCheck11">
                            Audio
                          </label>
                        </div> */}
                        </form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="4">
                        Chains <i className='fa fa-angle-down'></i>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        <form>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                            <label class="form-check-label" for="defaultCheck11">
                              RLC
                            </label>
                          </div>
                        </form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </div>
          )}

          {/* Side Filter */}
          <div className='tab-inner-container'>
            {openMenu && (
              <div id="zero2" className="onStep fadeIn">
                <div className="flex-div">
                  {/* <div>
                    <h1>{MyNfts ? MyNfts.length == 1 ? MyNfts?.filter((nft) => nft.staus == 'ReadyForSell').length + ' Item' : MyNfts?.filter((nft) => nft.staus == 'ReadyForSell').length + ' Items' : ''}</h1>
                  </div> */}
                  {/* <ul className='sort-list'>
                    <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                    <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                  </ul> */}
                </div>
                <MyNft filterNfts={filterState} status={'OnSale'} />
              </div>
            )}
            {openMenu1 && (
              <div id="zero2" className="onStep fadeIn">
                <div className="flex-div">
                  {/* <div>
                    <h1>{MyNfts ? MyNfts.length == 1 ? MyNfts.length + ' Item' : MyNfts.length + ' Items' : ''}</h1>
                  </div> */}
                  {/* <ul className='sort-list'>
                    <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                    <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                  </ul> */}
                </div>
                <MyNft filterNfts={filterState} status={'Owner'} />
              </div>
            )}
            {openMenu2 && (
              <div id="zero2" className="onStep fadeIn">
                <div className="flex-div">
                  {/* <div>
                    <h1>{MyNfts ? MyNfts.length == 1 ? MyNfts.length + ' Item' : MyNfts.length + ' Items' : ''}</h1>
                  </div> */}
                  {/* <ul className='sort-list'>
                    <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                    <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                  </ul> */}
                </div>
                <MyNft filterNfts={filterState} status={'Created'} />
              </div>
            )}
            {openMenu3 && (
              <div id="zero3" className="onStep fadeIn">
                <div className="flex-div">
                  <div>
                    <h1>{GetFavouriteNft ? GetFavouriteNft.length == 1 ? GetFavouriteNft.length + ' Item' : GetFavouriteNft.length + ' Items' : ''}</h1>

                  </div>
                  {/* <ul className='sort-list'>
                  <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                  <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                </ul> */}
                </div>
                <AllFavourite />
              </div>
            )}
            {openMenu4 && (
              <div id="zero1" className="onStep fadeIn">
                <div className="flex-div">
                  <div>
                    <h1>{myAllCollectionsState ? myAllCollectionsState.length == 1 ? myAllCollectionsState.length + ' Item' : myAllCollectionsState.length + ' Items' : ''}</h1>
                  </div>
                  {/* <ul className='sort-list'>
                  <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                  <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                </ul> */}
                </div>
                <MyCollections />
              </div>




            )}
            {openMenu5 && (
              <div id="zero3" className="onStep fadeIn">
                {/* <MyNft />{" "} */}
                <div className="full-div">
                  <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                      {nftHistory ? nftHistory.map((payload) => (
                        <>
                          <div style={{ cursor: 'pointer' }} onClick={() => history.push(`/usernftdetail/${payload?.nftId}/${ProfileData?.id}`)} className="activity-pnl">
                            <div className="left-pnl">
                              <div className="img-pnl">
                                {/* <img src={httpUrl + '/' + payload.nftImage} /> */}
                                {payload?.nftImage.split(".")[1] === 'mp4' ? (
                                  <video
                                    style={{ width: '100%', height: "100%" }}
                                    src={`${httpUrl}/${payload?.nftImage}`}
                                    controls
                                    autoPlay
                                    currentTime={11.3}
                                  />
                                ) : (
                                  <img
                                    src={`${httpUrl}/${payload?.nftImage}`}
                                  />
                                )}
                              </div>
                              <div className="txt-pnl">
                                <h3>Acitivy Here</h3>
                                {/* {payload.ownerAccountAddress == WalletAddress && (

                            )} */}
                                <p>{payload.nftHistoryType} item #{payload.nftId} for {payload.nftPrice} RLC</p>
                                <span>At {moment(payload.createdAt.split('T')[0], "hours").format('Do [of] MMMM, YYYY')}</span>
                              </div>
                            </div>
                            <div className="right-pnl">
                              <a className="cart-btn" href="#"><i class="fa fa-shopping-cart"></i></a>
                            </div>
                          </div>
                        </>
                      )) : <>

                      </>}


                    </div>
                    {/* <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="full-div">
                        <div class="subscribe-pnl">
                          <input autocomplete="off" class="form-control" placeholder="Enter your word art" /><button>
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                      <div className="full-div">
                        <h5>Filter</h5>
                      </div>
                      <div className="full-div">
                        <ul className="filter-select-listing">
                          <li>
                            <a href="#"><i class="fa fa-bars"></i> Listings</a>
                          </li>
                          <li>
                            <a href="#"><i className="fa fa-heart"></i> Like</a>
                          </li>
                          <li>
                            <a href="#"><i class="fa fa-shopping-cart"></i> Purchases</a>
                          </li>
                          <li>
                            <a href="#"><i class="fa fa-percent"></i> Sales</a>
                          </li>
                          <li>
                            <a href="#"><i class="fa fa-sign-out"></i> Transfer</a>
                          </li>
                          <li>
                            <a href="#"><i className="fa fa-star"></i> Burns</a>
                          </li>
                          <li>
                            <a href="#"><i class="fa fa-window-maximize"></i> Bids</a>
                          </li>
                        </ul>
                        <a href="#" className="clear-btn">Clear All</a>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {openMenu && (

          <div id="zero1" className="onStep fadeIn">
            <MyCollections />
          </div>
        )}
        {openMenu1 && (
          <div id="zero2" className="onStep fadeIn">
            <MyNft />
          </div>
        )}
        {openMenu2 && (
          <div id="zero3" className="onStep fadeIn">
            <AllFavourite />
          </div>
        )}
        {openMenu3 && (
          <div id="zero3" className="onStep fadeIn">
            <MyNft />{" "}
          </div>
        )} */}
      </section>
      <div className="spacer-single"></div>
      <Footer />
    </div >
  );
};
export default MyProfile;
