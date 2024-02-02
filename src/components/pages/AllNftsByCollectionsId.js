import React, { useEffect, useState, useRef } from "react";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import GetAllNftsByCollectionIdAction, {
  GetAllNftsByCollectionIdRequest,
} from "../../Redux/Actions/NftActions/GetAllNftsByCollectionIdAction";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useHistory, useParams } from "react-router";
import { PropagateLoader, BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";
import GetFavouriteNftAction from "../../Redux/Actions/NftActions/GetFavouriteNftAction";
import RemoveFavouriteNftAction from "../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import AddFavouriteNftAction from "../../Redux/Actions/NftActions/AddFavouriteNftAction";
import GetNftCollectionByIdWithOutAccountAction from "../../Redux/Actions/NftActions/GetNftCollectionByIdWithOutAccountAction";
import { Dropdown, DropdownButton, SplitButton } from "react-bootstrap";
import NftItem from "../Shared/NFT";


import GetNftMarketAction from "../../Redux/Actions/NftActions/GetNftMarketAction";
import API from "../../Redux/Api";
const GlobalStyles = createGlobalStyle`

`;

const AllNftsByCollectionsId = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMore, setShowMore] = useState(false);
  const { id } = useParams();
  console.log(id);
  const GetAllNftsByCollectionId = useSelector(
    (state) =>
      state.GetAllNftsByCollectionId?.GetAllNftsByCollectionIdResponse?.data
  );
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);

  const GetNftCollectionByIdWithOutAccount = useSelector(
    (state) =>
      state?.GetNftCollectionByIdWithOutAccount
        ?.GetNftCollectionByIdWithOutAccountResponse?.data
  );

  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );

  const GetNftCollectionById = useSelector(
    (state) => state.GetNftCollectionById?.GetNftCollectionByIdResponse?.data
  );
  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );

  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

  const searchRef = useRef();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [favcount, setFavCount] = useState();

  const [filter, setfilter] = useState([]);
  const [getAllNftsByCollectionIdState, setGetAllNftsByCollectionIdState] =
    useState([]);
  const [height, Setheight] = useState(270);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [isloading, setIsloading] = useState(true);
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);
  const [collectionStats, setCollectionStats] = useState(false);
  const loadMore = () => {
    let collectionsState = getAllNftsByCollectionIdState;
    let start = collectionsState?.length;
    let end = collectionsState?.length + 4;
    setGetAllNftsByCollectionIdState([
      ...collectionsState,
      ...GetAllNftsByCollectionId?.slice(start, end),
    ]);
  };

  useEffect(() => {
    setGetAllNftsByCollectionIdState(GetAllNftsByCollectionId?.slice(0, 8));
    setAllData(GetAllNftsByCollectionId);
    console.log("&&&&&&", id)
    const res = API.GetCollectionStatsById.GetCollectionStatsByIdApi(id).then((response) => {
      console.log("*****")
      console.log(response.data.data)
      setCollectionStats(response.data.data)
      console.log("***")
    })
  }, [GetAllNftsByCollectionId, id]);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img.offsetHeight,
      });
    }
  };
  const apisCall = () => {
    dispatch(GetNftMarketAction());
  }
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



  useEffect(async () => {
    console.log("GetNftCollectionByIdWithOutAccount", GetNftCollectionByIdWithOutAccount);
    // await dispatch(GetNftCollectionByIdAction(id));

    await dispatch(GetNftCollectionByIdWithOutAccountAction(id));

    await dispatch(GetAllNftsByCollectionIdAction(id))
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
    return () => {
      dispatch(GetAllNftsByCollectionIdRequest());
    };
  }, []);

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setfilter(
      allData?.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
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

  const resetFilter = () => {
    setGetAllNftsByCollectionIdState(allData?.slice(0, 8));
    setfilter([]);
    setFilterTrigger(false);

    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);

    setGetAllNftsByCollectionIdState(filter?.slice(0, 8));
    setFilterData(filter);
  };


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

      <section className="profile-banner">
        <div className="container">
          <div className="banner">
            <img src={httpUrl + "/" + GetNftCollectionByIdWithOutAccount?.bannerImage} alt="Banner images" />
          </div>
        </div>
      </section >


      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="collection_logo_header d_profile cntr">
              <div style={{ position: "absolute" }} className=""    >

              </div>
              <div className="profile_avatar">
                <div className="d_profile_img">
                  <img
                    src={
                      httpUrl +
                      "/" +
                      GetNftCollectionByIdWithOutAccount?.logoImage
                    }
                    alt=""
                    style={{ height: 150, width: 150 }}
                  />
                  {/* <i className="fa fa-check"></i> */}
                </div>

                <div className="profile_name collection-desc">
                  <div className="text-pnl">
                    <h2>
                      {GetNftCollectionByIdWithOutAccount?.name}
                    </h2>
                    <h6 style={{ cursor: 'pointer' }} onClick={() => history.push(GetNftCollectionByIdWithOutAccount?.address === WalletAddress ? `/myprofile` : `/profile/${GetNftCollectionByIdWithOutAccount?.address}`)}>{GetNftCollectionByIdWithOutAccount?.createrName ? "Created by " + GetNftCollectionByIdWithOutAccount?.createrName : 'Created by Unnamed'}</h6>
                  </div>
                  {/* <h4>
                    {GetNftCollectionByIdWithOutAccount?.name}

                  </h4>
                  <h4>
                    {GetNftCollectionByIdWithOutAccount?.createrName ? GetNftCollectionByIdWithOutAccount?.createrName: 'Unnamed'}

                  </h4> */}
                  {/* {console.log(
                    GetAllNftsByCollectionId &&
                    GetAllNftsByCollectionId[0]?.ownerAddress,
                    WalletAddress
                  )} */}
                  {/* <span className="email-span" style={{ wordWrap: 'break-word', color: "white" }}>

                    {showMore ? GetNftCollectionByIdWithOutAccount?.description : `${GetNftCollectionByIdWithOutAccount?.description?.substring(0, 45)}`}
                    {GetNftCollectionByIdWithOutAccount?.description?.length > 45 ? (
                      <span className="btn-more-less" style={{ color: "orange", marginLeft: "5px", cursor: "pointer" }} onClick={() => setShowMore(!showMore)}>
                        {showMore ? " show less" : "...show more"}
                      </span>
                    ) : null
                    }
                  </span> */}
                  <div className="whte-txt">




                  </div>
                  <div className="pt-2"></div>
                  {GetNftCollectionByIdWithOutAccount?.address ==
                    WalletAddress && (
                      <button
                        onClick={() => {
                          history.push(`/addcollection/${id}`);
                        }}
                        className="btn btn-main mx-auto"
                      >
                        Update Collection
                      </button>
                    )}
                </div>

              </div>

            </div>
            <section className="container p-t-0">
              <div className="row">
                <div className="col-md-12 text-center">

                  <ul className="k-list">
                    <li>
                      <h3>{collectionStats?.totalNft}</h3>
                      <span>Items</span>
                    </li>
                    <li>
                      <h3>{collectionStats?.totalOwned}</h3>
                      <span>Owned</span>
                    </li>
                    <li className="active">
                      <h3>{collectionStats?.totalFloorPrice}</h3>
                      <span>floor price</span>
                    </li>
                    <li>
                      <h3>{collectionStats?.totalVolume}</h3>
                      <span>Volume</span>
                    </li>
                  </ul>

                </div>
                <div  className="text-center nrml-txt">
                  <p title={GetNftCollectionByIdWithOutAccount?.description}>{GetNftCollectionByIdWithOutAccount?.description?.length > 45 ? GetNftCollectionByIdWithOutAccount?.description?.substring(0, 45)+'...' : GetNftCollectionByIdWithOutAccount?.description}
                  </p>
                </div>
              </div>
            </section>
            <div style={{ display: "flex", justifyContent: "center" }} >


              {
                GetNftCollectionByIdWithOutAccount?.websiteLink && GetNftCollectionByIdWithOutAccount?.websiteLink != "null" ?

                  <a target="_blank" href={GetNftCollectionByIdWithOutAccount?.websiteLink} style={{ cursor: "pointer", color: "#E250E5", marginRight: "30px", fontSize: "15px" }}   ><i className="fa fa-globe web-color"  ></i></a>
                  : <></>
              }

              {
                GetNftCollectionByIdWithOutAccount?.discordLink && GetNftCollectionByIdWithOutAccount?.discordLink != "null" ?
                  <a target="_blank" href={GetNftCollectionByIdWithOutAccount?.discordLink} style={{ cursor: "pointer", color: "#E250E5", marginRight: "30px", fontSize: "15px" }}   ><i className="fab fa-discord discord-color"   ></i></a>
                  : <></>
              }
              {/* <a target="_blank" href={userData?.twitterLink} style={{cursor:"pointer",color:"white"}}><i className="fa fa-twitter"></i></a> */}

              {
                GetNftCollectionByIdWithOutAccount?.twitterLink && GetNftCollectionByIdWithOutAccount?.twitterLink != "null" ?

                  <a target="_blank" href={GetNftCollectionByIdWithOutAccount?.twitterLink} style={{ cursor: "pointer", color: "#E250E5", marginRight: "30px", fontSize: "15px" }}   ><i className="fa fa-twitter twitter-color"   ></i></a>
                  : <></>
              }
              {
                GetNftCollectionByIdWithOutAccount?.instagramLink && GetNftCollectionByIdWithOutAccount?.instagramLink != "null" ?

                  <a target="_blank" href={GetNftCollectionByIdWithOutAccount?.instagramLink} style={{ cursor: "pointer", color: "#E250E5", marginRight: "30px", fontSize: "15px" }}   ><i className="fa fa-instagram insta-color"  ></i></a>
                  : <></>
              }

              {
                GetNftCollectionByIdWithOutAccount?.mediumLink && GetNftCollectionByIdWithOutAccount?.mediumLink != "null" ?
                  <a target="_blank" href={GetNftCollectionByIdWithOutAccount?.mediumLink} style={{ cursor: "pointer", color: "#E250E5", marginRight: "30px", fontSize: "15px" }}   ><i className="fa fa-medium medium-color"   ></i></a>
                  : <></>
              }
              {/* <a target="_blank" href={userData?.twitterLink} style={{cursor:"pointer",color:"white"}}><i className="fa fa-twitter"></i></a> */}

              {
                GetNftCollectionByIdWithOutAccount?.tLink && GetNftCollectionByIdWithOutAccount?.tLink != "null" ?

                  <a target="_blank" href={GetNftCollectionByIdWithOutAccount?.tLink} style={{ cursor: "pointer", color: "#E250E5", marginRight: "30px", fontSize: "15px" }}   ><i className="fa fa-telegram telegram-color"   ></i></a>
                  : <></>
              }
              {/* <a target="_blank" href={userData?.yourSiteLink}  style={{cursor:"pointer",color:"white"}}><i className="fa fa-yourSiteLink"></i></a> */}

            </div>
          </div>
        </div>
      </section>
      <section className="container mb-cntr">
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
                    // style={{}}
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
              {/* <div className="dropdownSelect one">
                <Select
                  className="select1"
                  styles={customStyles}
                  menuContainerStyle={{ zIndex: 999 }}
                  defaultValue={options[0]}
                  options={options}
                />
              </div>
              <div className="dropdownSelect two">
                <Select
                  className="select1"
                  styles={customStyles}
                  defaultValue={options1[0]}
                  options={options1}
                />
              </div>
              <div className="dropdownSelect three">
                <Select
                  className="select1"
                  styles={customStyles}
                  defaultValue={options2[0]}
                  options={options2}
                />
              </div> */}
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="row">
              {isloading ? (
                <>
                  <div className="col-sm-12 d-flex justify-content-center">
                    <BounceLoader color="white" size="60" />
                  </div>
                </>
              ) : (
                <>
                  {getAllNftsByCollectionIdState?.length == 0 ? (
                    <div className="col-sm-12 text-center" style={{ color: "white" }} >
                      No NFT Record Found
                    </div>
                  ) : (
                    ""
                  )}
                  {getAllNftsByCollectionIdState?.map((item, index) => (
                    // <div
                    //   key={index}
                    //   className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                    //   onClick={() => {
                    //     item?.ownerAddress == WalletAddress
                    //       ? history.push(`/mynftdetails/${item?.id}`)
                    //       : history.push(
                    //           `/usernftdetail/${item?.id}/${item?.accountId}`
                    //         );
                    //   }}
                    // >
                    //   <div className="nft__item m-0">
                    //     <div className="author_list_pp">
                    //       <span
                    //         onClick={() =>
                    //           window.open(item.authorLink, "_self")
                    //         }
                    //       >
                    //         <img
                    //           className="lazy"
                    //           src={httpUrl + "/" + item?.ownerImage}
                    //           alt=""
                    //         />
                    //         <i className="fa fa-check"></i>
                    //       </span>
                    //     </div>
                    //     <div className="nft__item_wrap">
                    //       <span>
                    //         <img
                    //           onLoad={onImgLoad}
                    //           src={`${httpUrl}/${item.image}`}
                    //           className="lazy "
                    //           style={{
                    //             width: "100%",
                    //             height: 200,
                    //             borderRadius: 8,
                    //             objectFit: "contain",
                    //           }}
                    //           alt=""
                    //         />
                    //       </span>
                    //     </div>
                    //     <div className="nft__item_info d-flex justify-content-between">
                    //       <span
                    //         onClick={() => window.open(item.nftLink, "_self")}
                    //         className="d-flex flex-column"
                    //       >
                    //         <h4>{item.name}</h4>
                    //         <span>{item.blockChainName}</span>
                    //       </span>
                    //       <div className="nft__item_price d-flex align-items-end">
                    //         <span>Price: {item.buyPrice}</span>
                    //       </div>

                    //       <div className="nft__item_like d-flex justify-content-end">
                    //         <div
                    //         // onClick={() =>
                    //         //   removeToFavourite(
                    //         //     favourite?.id,
                    //         //     favourite?.ownerAddress
                    //         //   )
                    //         // }
                    //         >
                    //           <i
                    //             style={{ color: "red" }}
                    //             className="fa fa-heart"
                    //           ></i>
                    //         </div>
                    //         {/* <span>{favourite?.likes}</span> */}
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                    <div className="col-lg-4 col-xl-4 col-sm-12 col-sm-12">


                      <NftItem nft={item} key={index} likeAndDisLikeCallback={apisCall} color={"black"} />

                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="dull-div">
            {!isloading && (
              <>
                {filterData?.length && filterTrigger ? (
                  <>
                    {getAllNftsByCollectionIdState?.length <
                      filterData?.length && (
                        <div className="col-lg-12">
                          <div className="spacer-single"></div>
                          <span
                            onClick={loadMore}
                            className="btn-main lead m-auto"
                          >
                            Load More
                          </span>
                        </div>
                      )}
                  </>
                ) : (
                  <>
                    {getAllNftsByCollectionIdState?.length <
                      GetAllNftsByCollectionId?.length &&
                      !filterTrigger && (
                        <div className="col-lg-12">
                          <div className="spacer-single"></div>
                          <span
                            onClick={loadMore}
                            className="btn-main lead m-auto"
                          >
                            Load More
                          </span>
                        </div>
                      )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default AllNftsByCollectionsId;
