import React, { useEffect, useState, useRef, Component, useLayoutEffect } from "react";
import BuyNft from "../../components/BuyNft";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import Select from "react-select";
import { getToken } from "../../../utils";
import { Link } from "react-router-dom";
import {
  PropagateLoader, BounceLoader, PacmanLoader
} from "react-spinners";
import Slider from "react-slick";

import AuthorList from "../../components/authorList";

import { useLocation, useHistory } from "react-router-dom";
import GetNftMarketAction from "../../../Redux/Actions/NftActions/GetNftMarketAction";
import GetNftMarketByIdAction from "../../../Redux/Actions/NftActions/GetNftMarketById";
import { toast, ToastContainer } from "react-toastify";
import GetFavouriteNftAction from "../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import marketplacebg from "../../../assets/images/market-place-banner.png";
import RemoveFavouriteNftAction from "../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import { Accordion, Button, Card, Form, NavLink } from "react-bootstrap";
import http from "../../../Redux/Api/http";
import { Redirect } from "@reach/router";
import NftItem from "../../Shared/NFT";
import Footer from "../../components/footer";
import API from "../../../Redux/Api";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

function MarketNfts() {
  const Marketplaceprodu = useSelector(
    (state) => state.GetNftMarket?.GetNftMarketResponse?.data
  );


  // const MyNfts = useSelector(
  //   (state) => state.GetMyAllNfts?.GetMyAllNftsResponse?.data
  // );

  const location = useLocation();
  const history = useHistory();

  const [isloading, setIsloading] = useState(true);
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);
  const [routee, setRoute] = useState(true);
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [loadmorebutton, setLoadmorebutton] = useState(true)
  const [NFTsonsale, setNFTsonsale] = useState(Marketplaceprodu?.filter((nft) => nft.isBidOpen != true).slice(0, 6));
  const [change, setchange] = useState(false);
  const [loadmorebutton1, setLoadmorebutton1] = useState(true)
  const [filter, setfilter] = useState([]);
  const [hotcollection, setHotCollection] = useState();
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [colLoading, setColLoading] = useState(true);
  const [buyNow, setBuyNow] = useState(false);
  const [auction, setAuction] = useState(false);
  const [pathname, setPathname] = useState();
  const [favcount, setFavCount] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [priceEnteries, setPriceEnteries] = useState();
  const [todaysPick, setTodaysPick] = useState();
  const [priceCheck, setPriceCheck] = useState(false);
  const [hasbids, setHasOffers] = useState(false);

  const [checkTrueItem, setCheckTrueItem] = useState("");
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);
  const [NFTsonBid, setNFTsonBid] = useState(Marketplaceprodu?.filter((nft) => nft.isBidOpen == true).slice(0, 6));

  const dispatch = useDispatch();
  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );
  const [marketNfts, SetMarketNfts] = useState(Marketplaceprodu?.slice(0, 6));
  const [height, Setheight] = useState(270);
  const searchRef = useRef();
  const GetNftCollectionCategories = useSelector(
    (state) =>
      state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse
        ?.data
  );
  useEffect(() => {
    setNFTsonsale(Marketplaceprodu?.filter((nft) => nft.isBidOpen != true).slice(0, 6));
    setAllData(Marketplaceprodu);
    setNFTsonBid(Marketplaceprodu?.filter((nft) => nft.isBidOpen == true).slice(0, 6))
  }, [Marketplaceprodu]);

  const apisCall = () => {
    dispatch(GetNftMarketAction());
  }
  const collectionOption = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "fruit", label: "fruit" },
  ];

  const customStyles = {
    option: (base, state) => ({
      ...base,
      background: "#212428",
      color: "#fff",
      borderRadius: state.isFocused ? "0" : 0,
      "&:hover": {
        background: "#16181b",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "#212428 !important",
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    control: (base, state) => ({
      ...base,
      padding: 2,
    }),
  };

  const loadMore = () => {
    let marketNftstate = NFTsonsale;
    let start = marketNftstate?.length;
    let end = marketNftstate?.length + 3;
    if (loadmorebutton === false) {
      setNFTsonsale([
        ...Marketplaceprodu?.filter((nft) => nft.isBidOpen != true).slice(0, 6),
      ]);

      setLoadmorebutton(true)
      setchange()
      return
    }
    if (Marketplaceprodu?.filter((nft) => nft.isBidOpen != true).length < end) setLoadmorebutton(false);
    if (filterData?.length) {
      setNFTsonsale([...marketNftstate, ...filterData?.slice(start, end)]);
    }
    else {
      setNFTsonsale([
        ...marketNftstate,
        ...Marketplaceprodu?.filter((nft) => nft.isBidOpen != true).slice(start, end),
      ]);
    }

  };
  const activeRemove = (e) => {
    const parentCls = e.target.parentNode.parentNode.parentNode.classList
    document.getElementById("SidefilterMenu").classList.remove(parentCls[1]);
  };
  const activeAdd = (e) => {
    // const parentCls = e.target.parentNode.parentNode.parentNode.classList
    const ress = document.getElementById("SidefilterMenu")
    console.log(ress);
    document.getElementById("SidefilterMenu").classList.add("active");
  };
  const priceFilter = async () => {
    const payload = {
      search: "",
      min: minPrice,
      max: maxPrice,
      collectionId: [
        0
      ],
      sortBy: 'string',
      sortIndex: 0
    }
    console.log("heeheheh", payload);
    if (minPrice && maxPrice) {
      await http
        .post(httpUrl + "/api/v1/Nft/GetMarketPlaceNftSearch", payload)
        .then((res) => {
          console.log("filtered dataaaaaaaaaaaaaa", res.data.data);
          setPriceEnteries(res.data.data)
          setBuyNow(false)
          setAuction(false)
          setPriceCheck(true)
        })
        .catch((error) => {
          console.log(error?.message);
        });
    }

  };
  const loadMore1 = () => {
    let marketNftstate = NFTsonBid;
    let start = marketNftstate?.length;
    let end = marketNftstate?.length + 3;
    if (loadmorebutton1 === false) {
      setNFTsonBid([
        ...Marketplaceprodu?.filter((nft) => nft.isBidOpen == true).slice(0, 3),
      ]);

      setLoadmorebutton1(true)
      setchange()
      return
    }
    if (Marketplaceprodu?.filter((nft) => nft.isBidOpen == true).length < end) setLoadmorebutton1(false);
    if (filterData?.length) {
      setNFTsonBid([...marketNftstate, ...filterData?.slice(start, end)]);
    }
    else {
      setNFTsonBid([
        ...marketNftstate,
        ...Marketplaceprodu?.filter((nft) => nft.isBidOpen == true).slice(start, end),
      ]);
    }
  };
  useEffect(async () => {
    var params = window.location.pathname;
    setPathname(params.split("/")[1]);
    setTimeout(async () => {
      API.GetAllPopularCollections.GetAllPopularCollectionsApi().then((payload) => {
        console.log("HOT COLLECTION", payload.data.data);
        setHotCollection(payload.data.data)
        setColLoading(false);
      })

      API.GetTodayNfts.GetTodayNftsApi().then((response) => {
        setTodaysPick(response.data.data)
        setIsloading(false)
      })
      // await http
      //   .get(httpUrl + "/api/v1/Nft/GetPopularNFtCollection")
      //   .then((res) => {
      //     console.log("HOT COLLECTION", res.data.data);
      //     setHotCollection(res.data.data);
      //     // setGetMasterAddress(res?.data?.data?.address);
      //   })
      //   .catch((error) => {
      //     console.log(error?.message);
      //   });

      await dispatch(GetNftMarketAction())
        .then((res) => {
        })
        .catch((error) => {

          toast.success(`${error?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      if (isConnected) {
        await dispatch(GetFavouriteNftAction());
      }
    }, 3000);
  }, []);

  const removeToFavourite = async (nftId, OwnerAddress, favCount) => {
    if (!favouriteInProgress) {
      const payload = {
        nftId: nftId,
        nftAddress: OwnerAddress,
      };

      await dispatch(RemoveFavouriteNftAction(payload))
        .then(async (resp) => {
          setFavouriteInProgress(false);

          if (resp?.isSuccess === true) {
            toast.error(`${resp?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log("favcount --", favCount);
            await dispatch(GetFavouriteNftAction());
            // setFavCount((favcount) => favcount - 1);
            // setTimeout(() => window.location.reload(), 2000);
          } else if (resp?.isSuccess === false) {
            toast.error(`${resp?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {
          setFavouriteInProgress(false);
          toast.error(`${error?.data?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  useEffect(() => {
    SetMarketNfts(Marketplaceprodu?.slice(0, 6));
    setAllData(Marketplaceprodu);
    setIsloading(false);

  }, [Marketplaceprodu]);

  useEffect(() => {
    SetMarketNfts(Marketplaceprodu?.slice(0, 6));
    setAllData(Marketplaceprodu);
    setIsloading(false);

  }, []);


  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img?.offsetHeight,
      });
    }
  };

  const addToFavourite = async (nftID, OwnerAddress) => {
    if (!isConnected) {
      toast.success(`Please connect to wallet first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!favouriteInProgress) {
      await axios
        .post(
          httpUrl + "/api/v1/Nft/AddFavouriteNft",
          {
            nftId: nftID,
            nftAddress: OwnerAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then(async (resp) => {
          setFavouriteInProgress(false);
          if (resp?.data?.isSuccess === true) {
            toast.success(`${resp?.data?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            console.log("favcount", favcount);
            // setFavCount((favcount) => favcount + 1);
            // setFavCount(...favCount, favCount)
            const result = await dispatch(GetFavouriteNftAction());
            console.log("resultttttttttttttttttt", result);
            // setTimeout(() => window.location.reload(), 2000);
          } else if (resp?.data?.isSuccess === false) {
            toast.error(`NFT already liked`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {
          setFavouriteInProgress(false);
          toast.error(`${error?.data?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setfilter(
      allData?.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      })
    );
  };
  const routeToMP = (e) => {
    setRoute(true);
    // window.open('/marketplace')
  };
  const setBuyNowFunc = (e) => {
    setAuction(false);
    setPriceCheck(false);
    setHasOffers(false);
    setBuyNow(true);
  };
  const setAuctionFunc = (e) => {
    setBuyNow(false);
    setPriceCheck(false);
    setHasOffers(false);
    setAuction(true);
  };
  const setHasOffersFunc = (e) => {
    setBuyNow(false);
    setPriceCheck(false);
    setAuction(false);
    setHasOffers(true);
  };

  const resetFilter = () => {
    SetMarketNfts(allData);
    setfilter([]);
    setFilterTrigger(false);

    console.log(marketNfts);
    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);
    SetMarketNfts(filter?.slice(0, 4));
    setFilterData(filter);
  };

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




  console.log(filter);

  return (
    <>

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
      {location.pathname !== "/" && (
        <div className="gradient-bg-light">
          <section className="jumbotron breadcumb no-bg">
            <div className="mainbreadcumb ">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12  col-sm-12">
                    <div className="small-header">
                      <div className="bg-layer"></div>
                      <span className="drop-span"></span>
                      <h1>Marketplace</h1>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active">Marketplace</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* {window.location.pathname.includes("marketplace") && (
        <section className="container p-b-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="items_filter w-100">
                <form
                  className=" form-dark w-100 formbg"
                  style={{ padding: "10px" }}
                  id="form_quick_search"
                  name="form_quick_search"
                  onReset={() => {
                    resetFilter();
                  }}
                  onSubmit={handlerSearchSubmit}
                >
                  <div className="row">
                    <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12 disblo">
                      <div className="d-flex align-items-start justify-content-center wid padding-shareef">
                        <input
                          className="form-control"
                          id="name_1"
                          name="name_1"
                          ref={searchRef}
                          placeholder="search item here..."
                          type="text"
                          onChange={(e) => handleSearchChange(e)}
                          style={{ width: "100%" }}
                        />
                        <button id="btn-submit">
                          <i className="fa fa-search bg-color-secondary"></i>
                        </button>

                        {filterTrigger && (
                          <button id="btn-submit" type="reset">
                            <i className="fas fa-sync bg-danger m-l-1"></i>
                          </button>
                        )}
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )} */}


      {pathname === "marketplace" ? (
        <>
          {/* Side Filter menu 
      ==================== */}
          {/* <div id="SidefilterMenu" className="Sidefiltermenu" >
        <div className="Sidefiltermenu-inner">
          <button onClick={(e)=> activeRemove(e)} className="Close-btn Close-filter-btn">
            <i className="fa fa-close"></i>
          </button>
          <h1><i className="fa fa-filter"></i> Filter</h1>
          <AccordionFilter/>
        </div>
      </div> */}
          {/* Side Filter menu 
      ===================== */}
          <section className="container">
            <div className="row">
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
              {isloading ? (
                <div className="col-sm-12 d-flex justify-content-center">
                  <BounceLoader color="#cb273a" size="60" />
                </div>
              ) :
                <>
                  <h2>Auction Items</h2>
                  {
                    NFTsonBid ?
                      <>
                        {
                          NFTsonBid?.length == 0 ?
                            <div className="col-sm-12 text-center" style={{ color: "white" }}>
                              No NFT Record Found
                            </div>
                            :
                            <>
                              {NFTsonBid?.map((nft, index) => {
                                return (
                                  <div className="col-lg-4 col-xl-4 col-sm-12 col-sm-12">

                                    <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} color={"#cb273a"} />

                                  </div>);
                              })}
                            </>
                        }
                      </> :
                      <div style={{ textAlign: "center" }}>
                        <PacmanLoader size={35} color={"white"} />
                      </div>
                  }
                  {
                    Marketplaceprodu?.filter((nft) => nft.isBidOpen == true)?.length > 6 ?
                      <div className="col-lg-12">
                        <div className="spacer-single"></div>
                        <span
                          onClick={loadMore1}
                          className="btn-main lead m-auto"
                        >
                          {
                            loadmorebutton1 ? "Load More" : "Load Less"
                          }
                        </span>
                      </div> : <></>
                  }
                  {/* <h3 className="style-brder">Sell</h3> */}
                  <h2 style={NFTsonsale ? {} : { paddingTop: "100px" }}        >Sell Items</h2>
                  {
                    NFTsonsale ?
                      <>
                        {
                          NFTsonsale?.length == 0 ?
                            <div className="col-sm-12 text-center" style={{ color: "white" }}>
                              No NFT Record Found
                            </div>
                            :
                            <>
                              {NFTsonsale?.map((nft, index) => {
                                return (
                                  <div className="col-lg-4 col-xl-4 col-sm-12 col-sm-12">

                                    <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} color={"#cb273a"} />

                                  </div>);
                              })}
                            </>
                        }
                      </> :
                      <div style={{ textAlign: "center" }}>
                        <PacmanLoader size={35} color={"white"} />
                      </div>
                  }
                  {
                    Marketplaceprodu?.filter((nft) => nft.isBidOpen != true)?.length > 6 ?
                      <div className="col-lg-12">
                        <div className="spacer-single"></div>
                        <span
                          onClick={loadMore}
                          className="btn-main lead m-auto"
                        >
                          {
                            loadmorebutton ? "Load More" : "Load Less"
                          }
                        </span>
                      </div> : <></>
                  }
                </>
              }
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="container ptb-o">
            <div className="row">
              <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6">
                <h2>Live Auctions</h2>
              </div>
              <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 text-right">
                <a className="reg-btn brdr-rod" href="/explore">See more</a>
              </div>
              <div className="col-lg-12 col-xl-12 col-md-6 col-sm-12">
                <div className="full-div space30"></div>
              </div>
              <Slider {...settings}>
                {marketNfts?.map((nft, index) => {
                  return (
                    <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} color={"black"} />
                  );
                })}
              </Slider>
            </div>
          </section>
          <section className="container">
            <div className="row">
              <div className="col-lg-12">
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
                {isloading ? (
                  <>
                    <div className="col-sm-12 d-flex justify-content-center">
                      <BounceLoader color="#cb273a" size="60" />
                    </div>
                  </>
                ) : (
                  <>
                    {Marketplaceprodu?.length == 0 ? (
                      <div className="col-sm-12 text-center" style={{ color: "white" }}>
                        No NFT Record Found
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="spacer-50"></div>
                    <section className="container ptb-o">
                      <div className="row">
                        <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6">
                          <h2>Popular Collections</h2>
                        </div>
                        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 text-right">
                          <a className="reg-btn brdr-rod" href="/explore">See more</a>
                        </div>
                        <div className="col-lg-12 col-xl-12 col-md-6 col-sm-12">
                          <div className="full-div space30"></div>
                        </div>
                        {/* <Slider {...settings}> */}
                        <div id="zero1" className="onStep fadeIn">
                          <div className="flex-div">

                          </div>


                          <div className='full-div'>
                            <div className='row'>
                              {hotcollection ? hotcollection.map((payload, index) => (
                                <>
                                  <div className='col-lg-6 col-md-6 col-sm-12 col-xl-3'>
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
                                            <h4><span>Created By</span> {payload.creatorName ? payload.creatorName: 'Unnamed'}</h4></div><div class="info-panel"><h6>Artist name</h6>
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
                        {/* </Slider> */}
                      </div>
                    </section>
                    <div className="spacer-50"></div>
                    <div className="full-div top-list-container">
                      <div className="col-lg-12 col-xl-12 col-sm-12 col-sm-12">
                        <h2>Top Seller</h2>
                      </div>
                      <div className="full-div space10"></div>
                      <AuthorList />
                    </div>
                    <div className="spacer-50"></div>
                    <div className="row">
                      <div className="full-div featured-nft-cntnr">
                        <div className="col-lg-12 col-xl-12 col-sm-12 col-sm-12">
                          <h2>Today's Picks</h2>
                        </div>
                        <div className="col-lg-12 col-xl-12 col-md-6 col-sm-12">
                          <div className="full-div space10"></div>
                        </div>
                        {colLoading ? (
                          <div className="col-sm-12 d-flex justify-content-center">
                            <BounceLoader color="white" size="60" />
                          </div>
                        ) : (
                          <>
                            <Slider {...settings}>
                              {todaysPick?.map((nft, index) => (
                                <NftItem nft={nft} likeAndDisLikeCallback={apisCall} color={"black"} />
                              ))}
                            </Slider>
                          </>
                        )}
                        <div className="full-div text-center">
                          <div className="spacer-20"></div>
                          <Link to="/allcollections" className="reg-btn trans brdr-rad">Load More</Link>
                          <div className="spacer-20"></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
export default MarketNfts;
