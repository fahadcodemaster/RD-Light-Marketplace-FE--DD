import React, { useEffect } from 'react';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import bar from '../../assets/images/bar.png';
import nftpost1 from '../../assets/images/banner-img.jpg';
import banner from '../../assets/images/banner-2.png';
import bannerimg from "../../assets/images/banner-img.jpg";
import banner1 from "../../assets/images/small-banner1.png";
import banner2 from "../../assets/images/small-banner2.png";
import banner3 from "../../assets/images/small-banner3.png";
import banner4 from "../../assets/images/small-banner4.png";
import txtbg from "../../assets/images/txt-bg.png";
import txtbg1 from "../../assets/images/txt-bg1.png";
import txtbg2 from "../../assets/images/txt-bg2.png";
import txtbg3 from "../../assets/images/txt-bg3.png";
import nftpost from "../../assets/images/nft-post.png";
import Footer from "../components/footer";
import { PulseLoader, BounceLoader } from "react-spinners";
import AuthorList from "../../components/components/authorList";
import Slider from "react-slick";
import { Link, useHistory, useParams, Redirect } from "react-router-dom";



import { createGlobalStyle } from 'styled-components';
import { GetMyAllCollectionsRequest } from "../../Redux/Actions/CollectionAction/GetMyAllCollections";

import { useDispatch, useSelector } from "react-redux";
import API from '../../Redux/Api';
const Allcollections = function () {
  const history = useHistory();

  const dispatch = useDispatch();
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const GetAllCollections = useSelector(
    (state) => state?.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );
  const GetNftCollectionCategories = useSelector(
    (state) => state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse?.data
  );

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [allCollections, setAllCollections] = React.useState();
  const [collectionsCheck, setAllCollectionsCheck] = React.useState(true);
  const [popularCollections, setPopularCollections] = React.useState(true);
  const [todaysCollections, setTodaysCollections] = React.useState(true);
  const [hotCollections, setHotCollections] = React.useState(true);

  useEffect(() => {
    API.GetAllPopularCollections.GetAllPopularCollectionsApi().then((payload) => {
      setPopularCollections(payload.data.data)
    })
    API.GetAllTodayCollections.GetAllTodayCollectionsApi().then((payload) => {
      setTodaysCollections(payload.data.data)

    })
    API.GetHotCollections.GetHotCollectionsApi().then((payload) => {
      setHotCollections(payload.data.data)

    })
    API.GetAllCollections.GetAllCollcectionsApi().then((response)=>{
      setAllCollections(response.data.data)
  })

  }, [GetAllCollections])

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
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
          dots: true,
        },
      },
    ],
  };

  const handleBtnClick = () => {
    setOpenMenu(true);
    setOpenMenu1(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(true);
    setOpenMenu(false);
    setOpenMenu2(false);
    setOpenMenu3(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(true);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu3(false);

    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn3").classList.remove("active");
    document.getElementById("Mainbtn2").classList.add("active");
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(true);
    setOpenMenu(false);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn3").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  return (
    <>
      <section className="jumbotron breadcumb no-bg">
        <div className="mainbreadcumb ">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12  col-sm-12">
                <div className="middle-header" style={{ backgroundImage: `url(${banner})` }}>
                  <span className="drop-span"></span>
                  <h1>Discover NFT<br></br>
                    Collections</h1>
                  <p>Trendy and stylish NFT collections on Midnight Trade</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12  col-sm-12">
              <div className="col-lg-12 col-md-12  col-sm-12">
                <h5>Categories</h5>
              </div>


              <ul className="choose-select-list">
                <Slider {...settings}>
                  {GetNftCollectionCategories ? GetNftCollectionCategories.map((data, index) => (
                    <>
                      <li>
                        <a onClick={()=>{}} className="choose-item wid" href="#">
                          <div className="img-pnl">
                            <img src={bannerimg} />
                          </div>
                          <div className="txt-pnl" style={{ backgroundImage: `url(${txtbg})` }}>
                            <h6>{data.name}</h6>
                          </div>
                        </a>
                      </li>
                    </>
                  )) : <></>}
                </Slider>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="items_filter">
                <ul className="de_nav de_nav">
                  <li id="Mainbtn" className="active">
                    <span onClick={handleBtnClick}> All Collections</span>
                  </li>
                  <li id="Mainbtn1" className="">
                    <span onClick={handleBtnClick1}>Popular</span>
                  </li>
                  <li id="Mainbtn2" className="">
                    <span onClick={handleBtnClick2}>New</span>
                  </li>
                  <li id="Mainbtn3" className="">
                    <span onClick={handleBtnClick3}>Top Sellers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='tab-container full-div'>
            {/* Side Filter */}
            {/* <div className="side-filter-bar">
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
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                              Buy Now
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                            <label class="form-check-label" for="defaultCheck2">
                              On Auctions
                            </label>
                          </div>
                          <div class="form-check">
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
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck4" />
                            <label class="form-check-label" for="defaultCheck4">
                              Art
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck5" />
                            <label class="form-check-label" for="defaultCheck5">
                              Music
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck6" />
                            <label class="form-check-label" for="defaultCheck6">
                              Domain Names
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck7" />
                            <label class="form-check-label" for="defaultCheck7">
                              Virtual Worlds
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck8" />
                            <label class="form-check-label" for="defaultCheck8">
                              Trading  Cards
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck9" />
                            <label class="form-check-label" for="defaultCheck9">
                              Collectibles
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck10" />
                            <label class="form-check-label" for="defaultCheck10">
                              Sports
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                            <label class="form-check-label" for="defaultCheck11">
                              Utility
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
                          <img src={bar} />
                        </div>
                        <p>
                          <span>Price:</span> $800— $1,850
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
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                            <label class="form-check-label" for="defaultCheck11">
                              Audio
                            </label>
                          </div>
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
                              Ethereum
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                            <label class="form-check-label" for="defaultCheck11">
                              Polygon
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                            <label class="form-check-label" for="defaultCheck11">
                              Klaytn
                            </label>
                          </div>
                        </form>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            </div> */}
            {/* Side Filter */}
            <div className='tab-inner-container'>
              {openMenu && (
                <div id="zero1" className="onStep fadeIn">
                  <div className="flex-div">
                    <div>
                      <h1>{allCollections ? allCollections.length == 1 ? allCollections.length + ' Item' : allCollections.length + ' Items' : ''}</h1>
                    </div>
                    {/* <ul className='sort-list'>
                      <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                      <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                    </ul> */}
                  </div>

                  <div className='full-div'>
                    <div className='row'>
                      {allCollections ? allCollections.map((payload, index) => (
                        <>
                          <div className='col-lg-6 col-md-6 col-sm-12 col-xl-4'>
                            <div onClick={() => {
                              history.push(
                                `/nftsbycollections/${payload.id}`
                              );
                            }} style={{cursor:'pointer'}} class="nft nft-post collection">
                              <div class="itm">
                                <div class="nft-inner">
                                  <span class="heart-span">
                                    <i class="fa fa-heart mr-1" aria-hidden="true"></i> 0</span><div class="img-pnl">
                                    <img src={httpUrl + '/' + payload.bannerImage} />
                                    <div class="btn-cntnr">
                                      <button class="reg-btn">Place Bid</button>
                                    </div>
                                    <div class="bid-time-pnl">
                                      <h3><span>04</span>:<span>05</span>:<span>12</span>:<span>18</span></h3></div></div>
                                  <div class="text-pnl"><span class="owner-image">
                                    <div class="owner-image-inner">
                                      <img src={httpUrl + '/' + payload.logoImage} alt="" />
                                      <span class="check-span"><i class="fa fa-check" aria-hidden="true"></i></span></div>
                                  </span><div class="flex-div"><div class="collection-info"><h2>{payload.name}</h2>
                                    <h4><span></span></h4></div><div class="info-panel"><h6>Artist name</h6>
                                        <h2> marianna</h2><h3> marianna</h3></div><div class="post-bid-panel"><h3> Price</h3><p>
                                          0.023..</p><span class="future-price">$2156.68</span>
                                      </div>
                                    </div>
                                    <div class="space10"></div>
                                    <div class="flex-div bottom-btn">
                                      <a href="#" class="history-refresh-btn"><i class="fa fa-refresh" aria-hidden="true"></i>
                                        View History</a><a class="reg-btn small brdr-rad" href="#">Buy Now</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )) : (
                        <>
                          <div className="col-sm-12 d-flex justify-content-center">
                            <BounceLoader color="white" size="60" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                </div>

              )}
              {openMenu1 && (
                <div id="zero1" className="onStep fadeIn">
                  <div className="flex-div">
                    <div>
                      <h1>{popularCollections ? popularCollections.length == 1 ? popularCollections.length + ' Item' : popularCollections.length + ' Items' : ''}</h1>
                    </div>
                    {/* <ul className='sort-list'>
                      <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                      <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                    </ul> */}
                  </div>

                  <div className='full-div'>
                    <div className='row'>
                      {popularCollections ? popularCollections.map((payload, index) => (
                        <>
                          <div className='col-lg-6 col-md-6 col-sm-12 col-xl-4'>
                            <div onClick={() => {
                              history.push(
                                `/nftsbycollections/${payload.id}`
                              );
                            }} style={{cursor:'pointer'}} class="nft nft-post collection">
                              <div class="itm">
                                <div class="nft-inner">
                                  <span class="heart-span">
                                    <i class="fa fa-heart mr-1" aria-hidden="true"></i> 0</span><div class="img-pnl">
                                    <img src={httpUrl + '/' + payload.bannerImage} />
                                    <div class="btn-cntnr">
                                      <button class="reg-btn">Place Bid</button>
                                    </div>
                                    <div class="bid-time-pnl">
                                      <h3><span>04</span>:<span>05</span>:<span>12</span>:<span>18</span></h3></div></div>
                                  <div class="text-pnl"><span class="owner-image">
                                    <div class="owner-image-inner">
                                      <img src={httpUrl + '/' + payload.logoImage} alt="" />
                                      <span class="check-span"><i class="fa fa-check" aria-hidden="true"></i></span></div>
                                  </span><div class="flex-div"><div class="collection-info"><h2>{payload.name}</h2>
                                    <h4><span></span></h4></div><div class="info-panel"><h6>Artist name</h6>
                                        <h2> marianna</h2><h3> marianna</h3></div><div class="post-bid-panel"><h3> Price</h3><p>
                                          0.023..</p><span class="future-price">$2156.68</span>
                                      </div>
                                    </div>
                                    <div class="space10"></div>
                                    <div class="flex-div bottom-btn">
                                      <a href="#" class="history-refresh-btn"><i class="fa fa-refresh" aria-hidden="true"></i>
                                        View History</a><a class="reg-btn small brdr-rad" href="#">Buy Now</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )) : (
                        <>
                          <div className="col-sm-12 d-flex justify-content-center">
                            <BounceLoader color="white" size="60" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              )}
              {openMenu2 && (
                <div id="zero1" className="onStep fadeIn">
                  <div className="flex-div">
                    <div>
                      <h1>{todaysCollections ? todaysCollections.length == 1 ? todaysCollections.length + ' Item' : todaysCollections.length + ' Items' : ''}</h1>
                    </div>
                    {/* <ul className='sort-list'>
                      <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                      <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                    </ul> */}
                  </div>

                  <div className='full-div'>
                    <div className='row'>
                      {todaysCollections ? todaysCollections.map((payload, index) => (
                        <>
                          <div className='col-lg-6 col-md-6 col-sm-12 col-xl-4'>
                            <div onClick={() => {
                              history.push(
                                `/nftsbycollections/${payload.id}`
                              );
                            }} style={{cursor:'pointer'}} class="nft nft-post collection">
                              <div class="itm">
                                <div class="nft-inner">
                                  <span class="heart-span">
                                    <i class="fa fa-heart mr-1" aria-hidden="true"></i> 0</span><div class="img-pnl">
                                    <img src={httpUrl + '/' + payload.bannerImage} />
                                    <div class="btn-cntnr">
                                      <button class="reg-btn">Place Bid</button>
                                    </div>
                                    <div class="bid-time-pnl">
                                      <h3><span>04</span>:<span>05</span>:<span>12</span>:<span>18</span></h3></div></div>
                                  <div class="text-pnl"><span class="owner-image">
                                    <div class="owner-image-inner">
                                      <img src={httpUrl + '/' + payload.logoImage} alt="" />
                                      <span class="check-span"><i class="fa fa-check" aria-hidden="true"></i></span></div>
                                  </span><div class="flex-div"><div class="collection-info"><h2>{payload.name}</h2>
                                    <h4><span></span></h4></div><div class="info-panel"><h6>Artist name</h6>
                                        <h2> marianna</h2><h3> marianna</h3></div><div class="post-bid-panel"><h3> Price</h3><p>
                                          0.023..</p><span class="future-price">$2156.68</span>
                                      </div>
                                    </div>
                                    <div class="space10"></div>
                                    <div class="flex-div bottom-btn">
                                      <a href="#" class="history-refresh-btn"><i class="fa fa-refresh" aria-hidden="true"></i>
                                        View History</a><a class="reg-btn small brdr-rad" href="#">Buy Now</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )) : (
                        <>
                          <div className="col-sm-12 d-flex justify-content-center">
                            <BounceLoader color="white" size="60" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              )}
              {openMenu3 && (
                <div id="zero1" className="onStep fadeIn">
                  <div className="flex-div">
                    <div>
                      <h1>{hotCollections ? hotCollections.length == 1 ? hotCollections.length + ' Item' : hotCollections.length + ' Items' : ''}</h1>
                    </div>
                    {/* <ul className='sort-list'>
                      <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                      <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                    </ul> */}
                  </div>

                  <div className='full-div'>
                    <div className='row'>
                      {hotCollections ? hotCollections.map((payload, index) => (
                        <>
                          <div className='col-lg-6 col-md-6 col-sm-12 col-xl-4'>
                            <div onClick={() => {
                              history.push(
                                `/nftsbycollections/${payload.id}`
                              );
                            }} style={{cursor:'pointer'}} class="nft nft-post collection">
                              <div class="itm">
                                <div class="nft-inner">
                                  <span class="heart-span">
                                    <i class="fa fa-heart mr-1" aria-hidden="true"></i> 0</span><div class="img-pnl">
                                    <img src={httpUrl + '/' + payload.bannerImage} />
                                    <div class="btn-cntnr">
                                      <button class="reg-btn">Place Bid</button>
                                    </div>
                                    <div class="bid-time-pnl">
                                      <h3><span>04</span>:<span>05</span>:<span>12</span>:<span>18</span></h3></div></div>
                                  <div class="text-pnl"><span class="owner-image">
                                    <div class="owner-image-inner">
                                      <img src={httpUrl + '/' + payload.logoImage} alt="" />
                                      <span class="check-span"><i class="fa fa-check" aria-hidden="true"></i></span></div>
                                  </span><div class="flex-div"><div class="collection-info"><h2>{payload.name}</h2>
                                    <h4><span></span></h4></div><div class="info-panel"><h6>Artist name</h6>
                                        <h2> marianna</h2><h3> marianna</h3></div><div class="post-bid-panel"><h3> Price</h3><p>
                                          0.023..</p><span class="future-price">$2156.68</span>
                                      </div>
                                    </div>
                                    <div class="space10"></div>
                                    <div class="flex-div bottom-btn">
                                      <a href="#" class="history-refresh-btn"><i class="fa fa-refresh" aria-hidden="true"></i>
                                        View History</a><a class="reg-btn small brdr-rad" href="#">Buy Now</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )) : (
                        <>
                          <div className="col-sm-12 d-flex justify-content-center">
                            <BounceLoader color="white" size="60" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
        <div className='full-div spacer-40'></div>
      </section>
      <Footer />
    </>
  );
};
export default Allcollections;
