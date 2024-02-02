import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import heart from "../../../assets/images/heart-icon.png";
import defaultImg from "../../../assets/images/default.png";
import { useDispatch, useSelector } from 'react-redux';
import GetFavouriteNftAction from '../../../Redux/Actions/NftActions/GetFavouriteNftAction';
import { toast, ToastContainer } from "react-toastify";
import { BounceLoader } from "react-spinners";

import rlc from "../../../assets/images/RLF-icon.png";
import http from '../../../Redux/Api/http';
import GetMyAllNftsAction from "../../../Redux/Actions/NftActions/GetMyAllNftsAction";
import GetNftMarketAction from "../../../Redux/Actions/NftActions/GetNftMarketAction";
import moment from "moment";



const TestNfts = ({ nftFilter, status  }) => {
    const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

    const history = useHistory();
    const dispatch = useDispatch()
    const WalletAddress = useSelector(
        (state) => state.WalletConnction?.WalletResponse?.accounts
    );
    const myFouritesNFTs = useSelector(
        (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
    );
    const [days, setDays] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [hours, setHours] = useState();
    const [timer, setTimer] = useState(false);
    const [minutes, setMinutes] = useState();
    const [starttimein, setstarttimein] = useState(false);
    const [reaminingChech, setreaminingChech] = useState(false);
    const [Todaycheck, setTodaycheck] = useState(false);

    const [seconds, setSeconds] = useState();
    const [buttonclicked, setbuttonclicked] = useState(false);
    const [countoffav, setcountoffav] = useState(0);
    const [favnft, setfavnft] = useState(false);

    const [isloading, setIsloading] = useState(true);

    const searchRef = useRef();
    const [allData, setAllData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [filterTrigger, setFilterTrigger] = useState(false);


    const isConnected = useSelector((state) => state.Login?.authResponse?.data);

    const apisCall = () => {
        dispatch(GetNftMarketAction());
    }

    const [filter, setfilter] = useState([]);

    const MyNfts = useSelector(
        (state) => state.GetMyAllNfts?.GetMyAllNftsResponse?.data
    );

    const [pageSize, setPage] = useState(3);
    const [nfts, Setnfts] = useState(MyNfts?.slice(0, 3));
    // const [marketNfts, SetMarketNfts] = useState(MyNfts?.filter((nft) => nft.staus == 'ReadyForSell'));



    useEffect(() => {
        console.log(MyNfts)
        setAllData(MyNfts);
    }, [MyNfts]);

    useEffect(async () => {
        await dispatch(GetMyAllNftsAction())
            .then((res) => {
                setIsloading(false);
            })
            .catch((error) => {
                setIsloading(false);
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
    }, []);

    const loadMore = () => {
        setPage((prev) => prev + 3)

        //     let nftState = nfts;

        //    if (filterData?.length) {
        //         Setnfts([...nftState, ...filterData?.slice(page * pageSize, (pageSize * (page + 1)))]);
        //     } else {
        //         Setnfts([...nftState, ...marketNfts?.slice(page * pageSize, (pageSize * (page + 1)))]);
        //     }
    };


    const handleSearchChange = (e) => {
        const { value } = e.target;

        setfilter(
            allData?.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const resetFilter = () => {
        Setnfts(allData?.slice(0, 4));
        setfilter([]);
        setFilterTrigger(false);

        searchRef.current.value = "";
    };
    const handlerSearchSubmit = (e) => {
        e.preventDefault();
        setFilterTrigger(true);

        Setnfts(filter?.slice(0, 4));
        setFilterData(filter);
    };


    const [isInterval, setIsInterval] = useState(false);

    function setNftData(nft) {
        if (myFouritesNFTs?.some((data) => data.id === nft?.id)) {
            console.log("fav")
            setfavnft(true);
        }
        else {
            console.log("defav")
            setfavnft(false);
        }
        setcountoffav(nft?.nftFavouritesCount)
        if (nft && !isInterval) {
            console.log("myData.bidEndDate", nft?.bidEndDate);
            let eventTime = moment(nft?.bidEndDate).unix();
            const starttimecheck = moment(startDate).unix();

            if (moment(startDate).isBefore(nft?.bidStartDate)) {


                setstarttimein(true)
                eventTime = moment(nft?.bidStartDate).unix();

            }
            else if (moment(startDate).isSame(nft?.bidEndDate)) {
                setreaminingChech(true)
                setTodaycheck(true)
                return
            }
            else if (moment(nft?.bidEndDate).isBefore(startDate)) {
                setreaminingChech(true)
                setTodaycheck(false)
                return
            }
            console.log("eventTime", eventTime);
            const currentTime = moment().unix();
            console.log("currentTime", currentTime);


            const diffTime = eventTime - currentTime;
            console.log("difftime", diffTime);
            let duration = moment.duration(diffTime * 1000, "milliseconds");
            console.log("duration", duration);
            const interval = 1000;
            var timerID = setInterval(() => {

                setIsInterval(true);
                if (duration._milliseconds <= 0) {
                    setDays("0");
                    setHours("0");
                    setMinutes("0");
                    setSeconds("0");
                    setTimer(true);
                } else {
                    duration = moment.duration(duration - interval, "milliseconds");
                    // console.log("timestamp", duration);
                    setDays(duration.days());
                    setHours(duration.hours());
                    setMinutes(duration.minutes());
                    setSeconds(duration.seconds());
                    setTimer(true);
                }
            }, interval);
            return () => clearInterval(timerID);
        }
    }



    const removeFromLike = (nft) => {

        setbuttonclicked(true)
        if (!isConnected) {
            toast.error(`Please connect to wallet first`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setbuttonclicked(false)
            return;
        }
        http.put(httpUrl + "/api/v1/Nft/RemoveFavouriteNft", {
            "nftId": nft?.id,
            "nftAddress": nft?.ownerAddress
        }).then(resp => {
            toast.success(`Removed from favourite`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(GetFavouriteNftAction()).then(resp => {
                apisCall()
                setbuttonclicked(false)
                setfavnft(false)
                setcountoffav(countoffav - 1)
            }).catch(error => {

                setbuttonclicked(false)
            })
        }).catch(error => {

            setbuttonclicked(false)
        })
    }


    const addToLike = (nft) => {

        setbuttonclicked(true)
        if (!isConnected) {
            toast.warn(`Please connect to wallet first`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setbuttonclicked(false)
            return;
        }
        http.post(httpUrl + "/api/v1/Nft/AddFavouriteNft",
            {
                "nftId": nft?.id,
                "nftAddress": nft?.ownerAddress
            }
        ).then(resp => {
            toast.success(`Added to favourite`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            dispatch(GetFavouriteNftAction()).then(resp => {
                apisCall()
                setfavnft(true)
                setcountoffav(countoffav + 1)
                setbuttonclicked(false)
            }).catch(error => {

                setbuttonclicked(false)
            })
        }).catch(error => {

            setbuttonclicked(false)
        })

    }


    function getNftCard(nft) {
        // setNftData(nft)

        return (
            <div className={window.location.pathname.split("/")[1] == 'explore' ? 'col-lg-6 col-md-6 col-sm-12 col-xl-4' : ''}>
                <div className={nft?.isBidOpen ? "nft nft-post live" : "nft nft-post"}>
                    {/* <CustomSlide className="itm" index={1}> */}
                    <div className="nft-inner">
                        <span className="heart-span" style={{ cursor: "pointer" }} onClick={buttonclicked ? <></> : favnft ? ()=>removeFromLike(nft) : ()=>addToLike(nft)} >
                            {
                                myFouritesNFTs?.some((data) => data.id === nft?.id) ? <img src={heart} /> : <i className='fa fa-heart mr-1'
                                />
                            }
                            {" "}
                            {countoffav}</span>

                        <div className="img-pnl" onClick={() => history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`)}>
                            <img src={httpUrl + "/" + nft?.image} className="lazy img-fluid" alt="" style={{ textAlign: "center" }} />
                            {nft?.ownerAddress != WalletAddress && (
                                <div className='btn-cntnr'>
                                    <button className='reg-btn'>Place Bid</button>
                                </div>
                            )}
                            <div className='bid-time-pnl'>
                                <h3><span>{days ? days : days === 0 ? 0 : 0}{" "}</span>:<span>{hours ? hours : hours === 0 ? 0 : 0}{" "}</span>:<span>{minutes ? minutes : minutes === 0 ? 0 : 0}{" "}</span>:<span>{seconds ? seconds : seconds === 0 ? 0 : 0}{" "}</span></h3>
                            </div>
                        </div>
                        <div className="text-pnl">
                            <span className="owner-image" onClick={() => { history.push(nft.ownerAddress === WalletAddress ? `/myprofile` : `/profile/${nft.ownerAddress}`); }}>
                                <div className='owner-image-inner'>
                                    <img src={nft?.ownerImage ? httpUrl + "/" + nft?.ownerImage : defaultImg} alt="" />
                                    <span className='check-span'><i className='fa fa-check'></i></span>
                                </div>
                            </span>
                            <div className='flex-div'>
                                <div className='collection-info'>
                                    <h2>Neon City Collection</h2>
                                    <h4><span>Created By</span> {nft?.name}</h4>
                                </div>
                                <div className='info-panel'>
                                    <h6>{nft?.ownerName}</h6>
                                    <h2 onClick={() => window.open("", "_self")}> {nft?.name.length > 8 ? nft?.name.slice(0, 8) + "..." : nft?.name}</h2>
                                    <h3> {"#" + nft?.id}</h3>
                                </div>
                                <div className='post-bid-panel'>
                                    <h3> Price</h3>
                                    <p><img src={rlc} alt="RLC" />  {" " + nft?.sellPrice == 0 ? nft.buyPrice : nft?.sellPrice?.toString()?.length > 5 ?
                                        nft?.sellPrice?.toString()?.slice(0, 5) + ".." : nft?.sellPrice + " "}</p>
                                    <span className='future-price'>({nft?.sellPriceRateInUSD ? "$" + nft?.sellPriceRateInUSD : nft?.buyPriceRateInUSD})</span>
                                </div>
                            </div>
                            <div className='space10'></div>
                            <div className='flex-div bottom-btn'>
                                <a href="#" className='history-refresh-btn'><i className='fa fa-refresh'></i> View History</a>
                                {nft?.ownerAddress != WalletAddress && (
                                    <a onClick={() => history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`)} className='reg-btn small brdr-rad' href="javascript:void(0);">Buy Now</a>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* </CustomSlide> */}
                </div>
            </div>
        )
    }


    return (
        <>
            <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12">
                    <div className="items_filter w-100">
                        <form
                            className="row form-dark w-100"
                            id="form_quick_search"
                            name="form_quick_search"
                            onReset={() => {
                                resetFilter();
                            }}
                            onSubmit={handlerSearchSubmit}
                        >
                            <div className="col-sm-12 d-flex align-items-start justify-content-center">
                                <input
                                    className="form-control"
                                    id="name_1"
                                    name="name_1"
                                    ref={searchRef}
                                    placeholder="search item here..."
                                    type="text"
                                    onChange={(e) => handleSearchChange(e)}
                                    style={{ width: "100%", color: "black" }}
                                />
                                <button id="btn-submit">
                                    <i className="fa fa-search bg-color-secondary"></i>
                                </button>
                                {/* <div> */}
                                {filterTrigger && (
                                    <button id="btn-submit" type="reset">
                                        <i class="fas fa-sync bg-danger m-l-1"></i>
                                    </button>
                                )}
                                {/* </div> */}
                                <div className="clearfix"></div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
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
                    <>
                        <div className="col-sm-12 d-flex justify-content-center">
                            <BounceLoader color="white" size="60" />
                        </div>
                    </>
                ) : (
                    <>
                        {console.log("Created nfts", MyNfts?.filter((nft) => nft.staus == 'ReadyForSell'), status)}
                        {MyNfts?.filter((nft) => nft.staus == 'ReadyForSell')?.length == 0 ? (
                            <div className="col-sm-12 text-center" style={{ color: "white" }}>No NFT Record Found</div>
                        ) : (
                            ""
                        )}

                        {MyNfts?.filter((nft) => nft.staus == 'ReadyForSell')?.slice(0, pageSize)?.map((nft, index) => (
                            <>
                                <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                                    {getNftCard(nft)}
                                </div>
                            </>
                        ))}

                        {/* {status == "ReadyForSell" ? (
                            <>
                                {nfts?.map((nft, index) => (
                                    <>
                                        {console.log("SAD", nft)}

                                        {nft.staus == 'ReadyForSell' && (
                                            <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                                                {getNftCard(nft)}
                                            </div>
                                        )}
                                    </>
                                ))}
                            </>
                        ) : (
                            <>
                                {nfts?.map((nft, index) => (
                                    <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                                        {console.log("SAD NO", nft)}

                                        {getNftCard(nft)}
                                    </div>
                                ))}
                            </>
                        )} */}
                        {MyNfts?.filter((nft) => nft.staus == 'ReadyForSell')?.length >= pageSize && (
                            <div className="col-lg-12">

                                <div className="spacer-single"></div>
                                <span onClick={loadMore} className="btn-main lead m-auto">
                                    Load More
                                </span>
                            </div>
                        )}

                        {/* {status === 'ReadyForSell' ? (
                            <>
                                {filterData?.length && filterTrigger ? (
                                    <>
                                        {nfts?.length < filterData?.length && (
                                            <div className="col-lg-12">
                                                <div className="spacer-single"></div>
                                                <span onClick={loadMore} className="btn-main lead m-auto">
                                                    Load More Filter
                                                </span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {MyNfts?.filter((nft) => nft.staus == 'ReadyForSell')?.length < MyNfts?.length && !filterTrigger && (
                                            <div className="col-lg-12">

                                                <div className="spacer-single"></div>
                                                <span onClick={loadMore} className="btn-main lead m-auto">
                                                    Load More
                                                </span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {filterData?.length && filterTrigger ? (
                                    <>
                                        {nfts?.length < filterData?.length && (
                                            <div className="col-lg-12">
                                                <div className="spacer-single"></div>
                                                <span onClick={loadMore} className="btn-main lead m-auto">
                                                    Load More Filter
                                                </span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {nfts?.length < MyNfts?.length && !filterTrigger && (
                                            <div className="col-lg-12">
                                                <div className="spacer-single"></div>
                                                <span onClick={loadMore} className="btn-main lead m-auto">
                                                    Load More
                                                </span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )} */}
                    </>
                )}
            </div>
        </>
    );
}



export default TestNfts








