import React, { useEffect, useState } from 'react';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import { useHistory } from "react-router";
import { Link, useHistory, useParams, Redirect } from "react-router-dom";

import bar from '../../assets/images/bar.png';
import nftpost1 from '../../assets/images/banner-img.jpg';
import banner from '../../assets/images/banner-1.png';
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
import defaultImg from "../../assets/images/default.png";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import API from '../../Redux/Api';
import { isUndefined, toInteger } from 'lodash';
import { PulseLoader, BounceLoader } from "react-spinners";
import NftItem from '../Shared/NFT';
import moment from "moment";
import GetNftMarketAction from "../../Redux/Actions/NftActions/GetNftMarketAction";
import Slider from "react-slick";
import AuthorList from '../components/authorList';
import MyNfts from './MyNfts/MyNfts';
import RangeSlider from 'react-bootstrap-range-slider';
var arr = []



function Explore() {
    const history = useHistory();

    const Marketplaceprodu = useSelector(
        (state) => state.GetNftMarket?.GetNftMarketResponse?.data
    );
    const GetAllCollections = useSelector(
        (state) => state?.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
    );

    const GetNftCollectionCategories = useSelector(
        (state) => state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse?.data
    );

    const WalletAddress = useSelector(
        (state) => state.WalletConnction?.WalletResponse?.accounts
    );

    const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;


    const dispatch = useDispatch();
    const [allData, setAllData] = useState([]);
    const [days, setDays] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [timer, setTimer] = useState(false);
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [favnft, setfavnft] = useState(false);
    const [isInterval, setIsInterval] = useState(false);
    const [countoffav, setcountoffav] = useState(0);
    const [reaminingChech, setreaminingChech] = useState(false);
    const [Todaycheck, setTodaycheck] = useState(false);
    const [todayNfts, setTodayNfts] = useState(false);
    const [error, setError] = useState(false);
    const [allCollections, setAllCollections] = useState();
    const [minValue, setMinValue] = useState();
    const [maxValue, setMaxValue] = useState();

    const [filterState, setFilterState] = React.useState({
        topFilter: "AllNFT",
        walletAddress: 'nill',
        pageSize: 0,
        currentPage: 0,
        buyNow: false,
        onAuctions: false,
        hasOffers: false,
        image: false,
        video: false,
        categories: [

        ],
        min: 0,
        max: 0,
        sortBy: "",
        sortIndex: 0,
        search: ""
    });



    useEffect(() => {
        API.GetAllCollections.GetAllCollcectionsApi().then((response) => {
            console.log('GetAllCollections', GetAllCollections)
            setAllCollections(response.data.data)
        })
        API.GetNftMarket.GetNftMarketApi().then((response) => {
            setAllData(response.data.data)
            console.log(response.data.data)
        })
        API.GetTodayNfts.GetTodayNftsApi().then((response) => {
            setTodayNfts(response.data.data)
        })

    }, [])






    const [openMenu, setOpenMenu] = React.useState(true);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const [openMenu2, setOpenMenu2] = React.useState(false);
    const [openMenu3, setOpenMenu3] = React.useState(false);
    const [openMenu4, setOpenMenu4] = React.useState(false);
    const [setter, setSetter] = React.useState(false);

    useEffect(() => {

        API.GetNftsFilter.GetNftsFilterApi(filterState).then((response) => {
            if (openMenu || openMenu2) {
                // Setnfts(response.data.data?.slice(0, 3));
                setAllData(response.data.data);
            }
            else if (openMenu3) {
                setTodayNfts(response.data.data)
            }
        })


    }, [filterState || openMenu2 || openMenu || openMenu3])

    const apisCall = () => {
        dispatch(GetNftMarketAction());
    }


    const filtering = (status, id) => {
        if (status == true) {
            document.getElementById(`defaultCheck${id}`).removeAttribute('checked')

            setFilterState((prev) => {
                filterState.categories.filter((item, i) => item != id)
            })

        }
        else {
            setFilterState((prev) => {
                return { ...prev, categories: [...filterState.categories, id] }
            })
            // arr.push(id)
            document.getElementById(`defaultCheck${id}`).setAttribute('checked', true)
        }
    }
    const setHighlight = (id) => {
        // document.getElementById('defaultCheck4').setAttribute('checked', true)
        // const set = new Set();
        console.log(id)
        // arr.push(id)
        filterState.categories.some(element => element == id) ? filtering(true, id) : filtering(false, id)
        // arr.some(element => element == id) ? document.getElementById('defaultCheck4').setAttribute('checked', true): document.getElementById('defaultCheck4').removeAttribute('checked')
        setFilterState((prev, index) => filterState.categories.some(element => element == id) ? { ...prev, categories: filterState.categories.filter((item, i) => item != id) } : { ...prev, categories: [...filterState.categories, id] })
        setSetter(GetNftCollectionCategories.filter((item) => item.id === id ? item.id === id : false))
    }

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
        setOpenMenu(true);
        setOpenMenu1(false);
        setOpenMenu2(false);
        setOpenMenu3(false);
        setOpenMenu4(false);
        document.getElementById("Mainbtn").classList.add("active");
        document.getElementById("Mainbtn1").classList.remove("active");
        document.getElementById("Mainbtn2").classList.remove("active");
        document.getElementById("Mainbtn3").classList.remove("active");
        document.getElementById("Mainbtn4").classList.remove("active");
    };
    const handleBtnClick1 = () => {
        setOpenMenu(false);
        setOpenMenu1(true);
        setOpenMenu2(false);
        setOpenMenu3(false);
        setOpenMenu4(false);
        document.getElementById("Mainbtn").classList.remove("active");
        document.getElementById("Mainbtn1").classList.add("active");
        document.getElementById("Mainbtn2").classList.remove("active");
        document.getElementById("Mainbtn3").classList.remove("active");
        document.getElementById("Mainbtn4").classList.remove("active");
    };
    const handleBtnClick2 = () => {
        setOpenMenu(false);
        setOpenMenu1(false);
        setOpenMenu2(true);
        setOpenMenu3(false);
        setOpenMenu4(false);

        document.getElementById("Mainbtn").classList.remove("active");
        document.getElementById("Mainbtn1").classList.remove("active");
        document.getElementById("Mainbtn2").classList.add("active");
        document.getElementById("Mainbtn3").classList.remove("active");
        document.getElementById("Mainbtn4").classList.remove("active");

    };
    const handleBtnClick3 = () => {
        setOpenMenu(false);
        setOpenMenu1(false);
        setOpenMenu2(false);
        setOpenMenu3(true);
        setOpenMenu4(false);
        document.getElementById("Mainbtn").classList.remove("active");
        document.getElementById("Mainbtn1").classList.remove("active");
        document.getElementById("Mainbtn2").classList.remove("active");
        document.getElementById("Mainbtn3").classList.add("active");
        document.getElementById("Mainbtn4").classList.remove("active");
    };
    const handleBtnClick4 = () => {
        setOpenMenu(false);
        setOpenMenu1(false);
        setOpenMenu2(false);
        setOpenMenu3(false);
        setOpenMenu4(true);
        document.getElementById("Mainbtn").classList.remove("active");
        document.getElementById("Mainbtn1").classList.remove("active");
        document.getElementById("Mainbtn2").classList.remove("active");
        document.getElementById("Mainbtn3").classList.remove("active");
        document.getElementById("Mainbtn4").classList.add("active");
    };

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

    return (
        <>
            <section className="jumbotron breadcumb no-bg">
                <div className="mainbreadcumb ">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12  col-sm-12">
                                <div className="middle-header" style={{ backgroundImage: `url(${banner})` }}>
                                    <span className="drop-span"></span>
                                    <h1>Explore NFT<br></br>
                                        Collections and Items</h1>
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
                                {GetNftCollectionCategories ? (
                                    <Slider {...settings}>
                                        {GetNftCollectionCategories ? GetNftCollectionCategories.map((data, index) => (
                                            <>
                                                <li>
                                                    <a className={setter ? setter.some((prev) => prev.id === data.id) ? 'choose-item wid border-collection' : 'choose-item wid': 'choose-item wid'} onClick={() => setHighlight(data.id)} href="javascript:void(0);">
                                                        <div className="img-pnl">
                                                            <img src={bannerimg} />
                                                        </div>
                                                        <div className="txt-pnl" style={{ backgroundImage: `url(${txtbg})` }}>
                                                            <h6>{data.name}</h6>
                                                            {/* <p>1573 Items</p> */}
                                                        </div>
                                                    </a>
                                                </li>
                                            </>
                                        )) : <></>}
                                    </Slider>
                                ) : (
                                    <div className="col-sm-12 d-flex justify-content-center">
                                        <BounceLoader color="white" size="60" />
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="items_filter">
                                <ul className="de_nav de_nav">
                                    <li id="Mainbtn" className="active">
                                        <span onClick={handleBtnClick}> All NFTs</span>
                                    </li>
                                    <li id="Mainbtn1" className="">
                                        <span onClick={handleBtnClick1}>Collections</span>
                                    </li>
                                    <li id="Mainbtn2" className="">
                                        <span onClick={handleBtnClick2}>Live Auctions</span>
                                    </li>
                                    <li id="Mainbtn3" className="">
                                        <span onClick={handleBtnClick3}>Today's Picks</span>
                                    </li>
                                    <li id="Mainbtn4" className="">
                                        <span onClick={handleBtnClick4}>  Top Sellers</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='tab-container full-div'>
                        {/* Side Filter */}
                        {(openMenu || openMenu2 || openMenu3) && (
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
                                                            <input onChange={() => setFilterState((prev) => filterState.buyNow ? { ...prev, buyNow: false } : { ...prev, buyNow: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck8" />
                                                            <label class="form-check-label" for="defaultCheck8">
                                                                Buy Now
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input onChange={() => setFilterState((prev) => filterState.onAuctions ? { ...prev, onAuctions: false } : { ...prev, onAuctions: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck9" />
                                                            <label class="form-check-label" for="defaultCheck9">
                                                                On Auctions
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input onChange={() => setFilterState((prev) => filterState.hasOffers ? { ...prev, hasOffers: false } : { ...prev, hasOffers: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck10" />
                                                            <label class="form-check-label" for="defaultCheck10">
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
                                                            <input onChange={() => {
                                                                setSetter((prev)=> prev ? GetNftCollectionCategories.filter((item) => item.id === 1 ? item.id === 1 : false): false)
                                                                setFilterState((prev, index) => filterState.categories.some(element => element == 1) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 1) } : { ...prev, categories: [...filterState.categories, 1] })
                                                            }} class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                                            <label class="form-check-label" for="defaultCheck1">
                                                                Art
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 2) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 2) } : { ...prev, categories: [...filterState.categories, 2] })} class="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                                                            <label class="form-check-label" for="defaultCheck2">
                                                                Music
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 3) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 3) } : { ...prev, categories: [...filterState.categories, 3] })} class="form-check-input" type="checkbox" value="" id="defaultCheck3" />
                                                            <label class="form-check-label" for="defaultCheck3">
                                                                Photography
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 4) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 4) } : { ...prev, categories: [...filterState.categories, 4] })} class="form-check-input" type="checkbox" value="" id="defaultCheck4" />
                                                            <label class="form-check-label" for="defaultCheck4">
                                                                Utility
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 5) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 5) } : { ...prev, categories: [...filterState.categories, 5] })} class="form-check-input" type="checkbox" value="" id="defaultCheck5" />
                                                            <label class="form-check-label" for="defaultCheck5">
                                                                Certificate
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 6) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 6) } : { ...prev, categories: [...filterState.categories, 6] })} class="form-check-input" type="checkbox" value="" id="defaultCheck6" />
                                                            <label class="form-check-label" for="defaultCheck6">
                                                                Collectibles
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input onChange={() => setFilterState((prev, index) => filterState.categories.some(element => element == 7) ? { ...prev, categories: filterState.categories.filter((item, i) => item != 7) } : { ...prev, categories: [...filterState.categories, 7] })} class="form-check-input" type="checkbox" value="" id="defaultCheck7" />
                                                            <label class="form-check-label" for="defaultCheck7">
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
                                                            <input onChange={() => setFilterState((prev) => filterState.image ? { ...prev, image: false } : { ...prev, image: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
                                                            <label class="form-check-label" for="defaultCheck11">
                                                                Image
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input onChange={() => setFilterState((prev) => filterState.video ? { ...prev, video: false } : { ...prev, video: true })} class="form-check-input" type="checkbox" value="" id="defaultCheck11" />
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
                                <div id="zero1" className="onStep fadeIn">
                                    {/* {GetNftMarket ? GetNftMarket.map((payload, index)=>{}): ()} */}
                                    {/* <div className="flex-div">
                                        <div>
                                            <h1>{allData ? allData.length == 1 ? allData.length + ' Item' : allData.length + ' Items' : 'No items'}</h1>
                                        </div>
                                    </div> */}

                                    <div className='full-div'>
                                        <div id="zero2" className="onStep nft-poori-chahy fadeIn">
                                            <div className="flex-div">
                                            </div>
                                            <MyNfts filterNfts={filterState} status={'AllNFT'} />
                                        </div>
                                    </div>
                                </div>

                            )}
                            {openMenu1 && (
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
                                                        }} style={{ cursor: 'pointer' }} class="nft nft-post collection">
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
                                                                        <h4><span>Created By</span> {payload.CreaterName ? payload.CreaterName : 'Unnamed'}</h4></div><div class="info-panel"><h6>Artist name</h6>
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
                                <>
                                    <div id="zero1" className="onStep fadeIn">
                                        {/* {GetNftMarket ? GetNftMarket.map((payload, index)=>{}): ()} */}
                                        {/* <div className="flex-div">
                                            <div>
                                                <h1>{allData ? allData.length == 1 ? allData.length + ' Item' : allData.length + ' Items' : 'No items'}</h1>
                                            </div>
                                        </div> */}

                                        <div className='full-div'>
                                            <div id="zero2" className="onStep nft-poori-chahy fadeIn">
                                                <div className="flex-div">
                                                </div>
                                                <MyNfts filterNfts={filterState} status={'LiveAuction'} />
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}
                            {openMenu3 && (
                                <>
                                    <div id="zero1" className="onStep fadeIn">
                                        {/* {GetNftMarket ? GetNftMarket.map((payload, index)=>{}): ()} */}
                                        {/* <div className="flex-div">
                                            <div>
                                                <h1>{todayNfts ? todayNfts.length == 1 ? todayNfts.length + ' Item' : todayNfts.length + ' Items' : 'No items'}</h1>
                                            </div>
                                        </div> */}

                                        <div className='full-div'>
                                            <div id="zero2" className="onStep nft-poori-chahy fadeIn">
                                                <div className="flex-div">
                                                </div>
                                                <MyNfts filterNfts={filterState} status={'TodayPick'} />
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )}
                            {openMenu4 && (
                                <>
                                    <AuthorList />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <div className='full-div spacer-40'></div>
            <Footer />
        </>
    );
};
export default Explore;
