import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import heart from "../../assets/images/heart-icon.png";
import defaultImg from "../../assets/images/default.png";
import { useDispatch, useSelector } from 'react-redux';
import GetFavouriteNftAction from '../../Redux/Actions/NftActions/GetFavouriteNftAction';
import GetNftMarketAction from '../../Redux/Actions/NftActions/GetNftMarketAction';
import { toast } from "react-toastify";
import http from '../../Redux/Api/http';


const NftItem = ({ nft, likeAndDisLikeCallback }) => {
    const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

    const history = useHistory();
    const dispatch = useDispatch()
    const WalletAddress = useSelector(
        (state) => state.WalletConnction?.WalletResponse?.accounts
    );
    const isConnected = useSelector((state) => state.Login?.authResponse?.data);
    const myFouritesNFTs = useSelector(
        (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
    );
    const [buttonclicked,setbuttonclicked]=useState(false);
    const [countoffav,setcountoffav]=useState(0);
    const [favnft,setfavnft]=useState(false);
    useEffect(()=>
    {
        if(myFouritesNFTs?.some((data) => data.id === nft?.id))
        {
            setfavnft(true);
        }
        else
        {
            setfavnft(false);
        }
          setcountoffav(nft?.nftFavouritesCount)
    },[])
    const removeFromLike = () => {
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
                likeAndDisLikeCallback()
            setbuttonclicked(false)
            setfavnft(false)
            setcountoffav(countoffav-1)
            }).catch(error => {

                setbuttonclicked(false)
            })
        }).catch(error => {
            
            setbuttonclicked(false)
        })
    }


    const addToLike = () => {
        
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
                likeAndDisLikeCallback()
                setfavnft(true)
                setcountoffav(countoffav+1)
                setbuttonclicked(false)
            }).catch(error => {

                setbuttonclicked(false)
            })
        }).catch(error => {

            setbuttonclicked(false)
        })

    }
    return (

        <div className="nft_coll">
            <div className="nft_wrap">
                <span
                    className="pic-demo">
                    <span className="heart-span" style={{ cursor: "pointer" }} onClick={buttonclicked?<></>:favnft?removeFromLike:addToLike    } >
                        {
                            myFouritesNFTs?.some((data) => data.id === nft?.id) ? <img src={heart}  /> : <i className='fa fa-heart mr-1'
                                />
                        }
                        {" "}
                        {countoffav}</span>   
                    <div className="table-cell">
                        <div className="table-cell-center"
                         onClick={() => {
                            history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                        }}
                        style={{cursor:'pointer'}}>
                            <img
                                src={httpUrl + "/" + nft?.image}
                                className="lazy img-fluid"
                                alt="" />
                        </div>
                    </div>
                </span>
            </div>
            <div className="nft_coll_pp">
                <span
                    onClick={() => {
                        history.push(
                            localStorage.getItem("userblock")==="true" && nft?.ownerAddress === WalletAddress ?'/connectwallet': 
                            nft.ownerAddress === WalletAddress
                                ? `/myprofile`
                                : `/profile/${nft.ownerAddress}`
                        );
                    }}
                >
                    <img
                        className="lazy"
                        src={
                            nft?.ownerImage
                                ? httpUrl + "/" + nft?.ownerImage
                                : defaultImg
                        }
                        alt=""
                    />
                    
                    {nft?.isVerfiedAccount?<i className="fa fa-check"></i>:<></>}       
                </span>
            </div>
            <div className="nft_coll_info">
                <span className="color-txt"
                  onClick={() =>
                    history.push(
                        `/nftsbycollections/${nft?.collectionId}`
                    )
                }>
                    {nft?.collectionName}
                </span>
                <span
                onClick={() => {
                    history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                }}
                >
                    <h4> {nft?.name}</h4>
                </span>
                <span>
                    Price {" " +   nft?.sellPrice==0?  nft?.buyPrice:  nft?.sellPrice  + " "} RLC
                </span>
                <div className="full-div">
                    <a
                        onClick={() => {
                            history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                        }}
                        className="view-all-btn"
                    >
                        Detail{" "}
                        <i
                            className="fa fa-angle-right"
                            aria-hidden="true"
                        ></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NftItem








