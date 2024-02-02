import React, { useEffect, useState, useRef } from "react";
import SellNftToMarket from "./SellToMarkePlace";
import { Link, useHistory } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import GetMyAllNftsAction from "../../../Redux/Actions/NftActions/GetMyAllNftsAction";
import RemoveFavouriteNftAction from "../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import GetFavouriteNftAction from "../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import defaultImg from "../../../assets/images/default.png";

import { toast, ToastContainer } from "react-toastify";

import GetNftMarketAction from "../../../Redux/Actions/NftActions/GetNftMarketAction";
import NftItem from "../../Shared/NFT";
import API from "../../../Redux/Api";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

function MyNfts({ status, filterNfts }) {
  const history = useHistory();
  const [isloading, setIsloading] = useState(true);

  const dispatch = useDispatch();
  const searchRef = useRef();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);
  const [pageSize, setPage] = useState(3);

  const [filter, setfilter] = useState([]);
  const [filter1, setfilter1] = useState([]);

  const MyNfts = useSelector(
    (state) => state.GetMyAllNfts?.GetMyAllNftsResponse?.data
  );
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );

  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );

  const [todaysPick, SetTodaysPick] = useState(MyNfts);
  const [nfts, Setnfts] = useState(MyNfts);
  const [marketNfts, SetMarketNfts] = useState(MyNfts?.filter((nft) => nft.staus == 'ReadyForSell').slice(0, 3));
  const [height, Setheight] = useState(270);
  const apisCall = () => {
    dispatch(GetNftMarketAction());
  }
  useEffect(() => {
    if (status == 'TodayPick') {
      API.GetTodayNfts.GetTodayNftsApi().then((response) => {
        SetTodaysPick(response.data.data)
        setIsloading(false)
      })
    }
    // Setnfts(MyNfts?.filter((nft) => nft.staus == 'ReadyForSell'));
    // setAllData(MyNfts?.filter((nft) => nft.staus == status));
  }, [MyNfts]);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("HEDUWDUWDUWDW", filterNfts)
    console.log("STATUS", status)
    if (status == 'OnSale') {
      API.GetNftsFilter.GetNftsFilterApi(filterNfts).then((response) => {
        console.log("response.data.data", response.data.data)
        setPage(3)
        Setnfts(response.data.data);
        setAllData(response.data.data);
        setIsloading(false)

      })

    } else if (status == 'Owner') {
      API.GetNftsFilter.GetNftsFilterApi(filterNfts).then((response) => {
        console.log("response.data.data", response.data.data)
        setPage(3)
        Setnfts(response.data.data);
        setAllData(response.data.data);
        setIsloading(false)
      })
    }
    else if (status == 'Created') {
      API.GetNftsFilter.GetNftsFilterApi(filterNfts).then((response) => {
        console.log("response.data.data", response.data.data)
        setPage(3)
        Setnfts(response.data.data);
        setAllData(response.data.data);
        setIsloading(false)

      })
    }
    else if (status == 'AllNFT') {
      API.GetNftsFilter.GetNftsFilterApi(filterNfts).then((response) => {
        console.log("response.data.data", response.data.data)
        setPage(3)
        Setnfts(response.data.data);
        setAllData(response.data.data);
        setIsloading(false)

      })
    }
    else if (status == 'LiveAuction') {
      API.GetNftsFilter.GetNftsFilterApi(filterNfts).then((response) => {
        console.log("response.data.data", response.data.data)
        setPage(3)
        Setnfts(response.data.data);
        setAllData(response.data.data);
        setIsloading(false)

      })
    }
    else if (status == 'TodayPick') {
      API.GetNftsFilter.GetNftsFilterApi(filterNfts).then((response) => {
        console.log("response.data.data", response.data.data)
        setPage(3)
        Setnfts(response.data.data);
        setAllData(response.data.data);
        setIsloading(false)

      })
    }

  }, [filterNfts, status]);

  // useEffect(async () => {
  //   await dispatch(GetMyAllNftsAction())
  //     .then((res) => {
  //       setIsloading(false);
  //     })
  //     .catch((error) => {
  //       setIsloading(false);
  //       toast.success(`${error?.message}`, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     });
  // }, []);

  const loadMore = () => {
    setPage((prev) => prev + 3)

    //   let nftState = nfts;
    //   let start = nftState?.length;
    //   let end = nftState?.length + 3;

    //   if (filterData?.length) {
    //     Setnfts([...nftState, ...filterData?.slice(start, end)]);
    //   } else {
    //     Setnfts([...nftState, ...MyNfts?.slice(start, end)]);
    //   }
    // };
    // const onImgLoad = ({ target: img }) => {
    //   let currentHeight = height;
    //   if (currentHeight < img.offsetHeight) {
    //     Setheight({
    //       height: img?.offsetHeight,
    //     });
    //   }
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

            await dispatch(GetFavouriteNftAction());
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

  const removeToFavourite = async (nftId, OwnerAddress) => {
    if (!favouriteInProgress) {
      const payload = {
        nftId: nftId,
        nftAddress: OwnerAddress,
      };

      await dispatch(RemoveFavouriteNftAction(payload))
        .then(async (resp) => {
          setFavouriteInProgress(false);

          if (resp?.isSuccess === true) {
            toast.success(`${resp?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            await dispatch(GetFavouriteNftAction());
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

  const handleSearchChange = (e) => {
    const { value } = e.target;
    console.log('value', value)
    setfilter(
      nfts?.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  const handleSearchChange1 = (e) => {
    const { value } = e.target;
    console.log('value', value)
    setfilter1(
      todaysPick?.filter((item) =>
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
  const resetFilter1 = () => {
    SetTodaysPick(allData?.slice(0, 4));
    setfilter([]);
    setFilterTrigger(false);

    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);

    Setnfts(filter);
    setFilterData(filter);
  };

  const handlerSearchSubmit1 = (e) => {
    e.preventDefault();
    setFilterTrigger(true);

    SetTodaysPick(filter1);
    setFilterData(filter1);
  };

  return (
    <>
      <div className="row">
        <div className="flex-div">
          <div>
            <h1>{nfts ? nfts.length == 1 ? nfts.length + ' Item' : nfts.length + ' Items' : 'No items'}</h1>
          </div>
        </div>
        {status == 'TodayPick' ? (
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12">
          <div className="items_filter w-100">
            <form
              className="row form-dark w-100"
              id="form_quick_search"
              name="form_quick_search"
              onReset={() => {
                resetFilter1();
              }}
              onSubmit={handlerSearchSubmit1}
            >
              <div className="col-sm-12 d-flex align-items-start justify-content-center">
                <input
                  className="form-control black"
                  id="name_1"
                  name="name_1"
                  ref={searchRef}
                  placeholder="search item here..."
                  type="text"
                  onChange={(e) => handleSearchChange1(e)}
                  style={{ width: "100%", color: "black" }}
                />
                <button id="btn-submit">
                  <i className="fa fa-search bg-color-secondary"></i>
                </button>
                
                {filterTrigger && (
                  <button id="btn-submit" type="reset">
                    <i class="fas fa-sync bg-danger m-l-1"></i>
                  </button>
                )}
                
                <div className="clearfix"></div>
              </div>
            </form>

          </div>
        </div>
        ): (
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
                  className="form-control black"
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
                
                {filterTrigger && (
                  <button id="btn-submit" type="reset">
                    <i class="fas fa-sync bg-danger m-l-1"></i>
                  </button>
                )}
                
                <div className="clearfix"></div>
              </div>
            </form>

          </div>
        </div>
        )}
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
            {/* {console.log("Created nfts", MyNfts, status)} */}
            {nfts?.length == 0 ? (
              <div className="col-sm-12 text-center" style={{ color: "white" }}>No NFT Record Found</div>
            ) : (
              ""
            )}
            {status == 'OnSale' && (
              <>
                {nfts?.slice(0, pageSize).map((nft, index) => (
                  <>
                    {(
                      <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                        <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />
                      </div>
                    )}
                  </>
                ))}
              </>
            )
            }
            {status == 'Owner' && (
              <>
                {nfts?.slice(0, pageSize).map((nft, index) => (
                  <>
                    {(
                      <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                        <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />
                      </div>
                    )}
                  </>
                ))}
              </>
            )
            }
            {status == 'Created' && (
              <>
                {nfts?.slice(0, pageSize).map((nft, index) => (
                  <>
                    {(
                      <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                        <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />
                      </div>
                    )}
                  </>
                ))}
              </>
            )
            }
            {status == 'AllNFT' && (
              <>
                {nfts?.slice(0, pageSize).map((nft, index) => (
                  <>
                    {(
                      <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                        <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />
                      </div>
                    )}
                  </>
                ))}
              </>
            )
            }
            {status == 'LiveAuction' && (
              <>
                {nfts?.slice(0, pageSize).map((nft, index) => (
                  <>
                    {(
                      <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                        <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />
                      </div>
                    )}
                  </>
                ))}
              </>
            )
            }
            {status == 'TodayPick' && (
              <>
                {todaysPick?.slice(0, pageSize).map((nft, index) => (
                  <>
                    {(
                      <div key={index} className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor">
                        <NftItem nft={nft} likeAndDisLikeCallback={apisCall} />
                      </div>
                    )}
                  </>
                ))}
              </>
            )
            }

            {nfts?.length > pageSize && (
              <div className="col-lg-12">

                <div className="spacer-single"></div>
                <span onClick={loadMore} className="btn-main lead m-auto">
                  Load More
                </span>
              </div>
            )}

            {/* Loadmore
            {status === 'ReadyForSell' ? (
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
                    {marketNfts?.length < MyNfts?.length && !filterTrigger && (
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

export default MyNfts;
