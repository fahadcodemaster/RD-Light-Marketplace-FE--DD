import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import BuyUserNft from "./BuyUserNft";
import http from "../../../Redux/Api/http";
import { PulseLoader } from "react-spinners";
import bnbimg from "../../../assets/images/bnb.png";
import { useDispatch, useSelector } from "react-redux";
import RemoveFavouriteNftAction from "../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import GetFavouriteNftAction from "../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import defaultImg from "../../../assets/images/default.png";
import NftItem from "../../Shared/NFT";


import GetNftMarketAction from "../../../Redux/Actions/NftActions/GetNftMarketAction";
function UserNfts() {
  const dispatch = useDispatch();


  const [userNftData, setUserNftData] = useState();
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [loading, setLoading] = useState(true);
  const [numItems, setNumItems] = useState(4)
  const history = useHistory();
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);

  const isConnected = useSelector((state) => state.Login?.authResponse?.data);
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );

  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );

  useEffect(async () => {
    if (isConnected) {
      await dispatch(GetFavouriteNftAction());
    }
  }, [])

  useEffect(async () => {
    let params = window.location.pathname;

    await http
      .get(
        httpUrl +
        `/api/v1/Account/GetUserAccount?address=${params.split("/")[2]}`
      )
      .then((res) => {
        console.log("res", res.data.data.nftRequestModelList);
        setUserNftData(res.data.data.nftRequestModelList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const [nfts, Setnfts] = useState([userNftData?.slice(0, 4)]);
  const [height, Setheight] = useState(270);

  const loadMore = () => {
    if (userNftData?.length > numItems) {
      setNumItems((prev) => prev + 4)
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
          console.log("COUNT", resp);
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

            // console.log("favcount", favcount);
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
  const apisCall = () => {
    dispatch(GetNftMarketAction());
  }

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img.offsetHeight,
      });
    }
  };
  return (
    <div className="row">
      {loading ? (
        <PulseLoader color="white" size="11" />
      ) : (
        <>
          {/* {console.log("user created nfts", nfts.length)} */}
          {/* //workhere */}
          <div>
            <h1>{userNftData?.length} Items</h1>
          </div>
          {userNftData?.length == 0 ? (
            <div className="col-sm-12 text-center" style={{ color: "white" }}>No NFT Record Found</div>
          ) : (
            ""
          )}
          {userNftData?.slice(0, numItems).map((nft, index) => (
            <div className="col-lg-4 col-xl-4 col-sm-12 col-sm-12">


              <NftItem nft={nft} key={index} likeAndDisLikeCallback={apisCall} color={"black"} />

            </div>

          ))}

          {userNftData?.length > numItems && (
            <div className="col-lg-12">
              <div className="spacer-single"></div>
              <span onClick={loadMore} className="btn-main lead m-auto">
                Load More
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserNfts;
