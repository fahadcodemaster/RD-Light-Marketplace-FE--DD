import React, { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/footer";
import AddNftAction from "../../Redux/Actions/NftActions/AddNftAction";
import bannerimg from "../../assets/images/banner-img.jpg";
import banner1 from "../../assets/images/small-banner1.png";
import banner2 from "../../assets/images/small-banner2.png";
import banner3 from "../../assets/images/small-banner3.png";
import banner4 from "../../assets/images/small-banner4.png";
import txtbg from "../../assets/images/txt-bg.png";
import txtbg1 from "../../assets/images/txt-bg1.png";
import txtbg2 from "../../assets/images/txt-bg2.png";
import txtbg3 from "../../assets/images/txt-bg3.png";
import NFTdefault from "../../assets/images/NFTIMAGE.jpg";
import {
  Modal,
  Row,
  Col,
  Form as Formm,
} from "react-bootstrap";
import axios from "axios";
import http from "../../Redux/Api/http";
import moment from "moment";
import { PulseLoader, BounceLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Slider from "react-slick";

import GetMyAllNftsAction from "../../Redux/Actions/NftActions/GetMyAllNftsAction";
import Web3 from "web3";
import "react-datepicker/dist/react-datepicker.css";
import GetNftMarketAction from "../../Redux/Actions/NftActions/GetNftMarketAction";
import { useHistory, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  mint
} from "../../../src/metamask/index";
import GetMyNftByIdAction, {
  GetMyNftByIdRequest,
} from "../../Redux/Actions/NftActions/GetMyNftByIdAction";
import GetAllBlockChainAction from "../../Redux/Actions/Blockchain/GetAllBlockChainAction";
import GetMyAllCollectionsAction from "../../Redux/Actions/CollectionAction/GetMyAllCollections";
import GetAllCurrencyAction from "../../Redux/Actions/CurrencyAction/GetAllCurrencyAction";
import GetNftCollectionCategoriesAction from "../../Redux/Actions/CategoriesAction/GetNftCollectionCategoriesAction";
import { toInteger } from "lodash";


function CreateNFT() {
  const [errorMessage, setErrorMessage] = useState({
    NFT_name: "",
    NFT_price: "",
    image: "",
    royality: "",
    item_desc: ""
  })
  const GetNftCollectionCategories = useSelector(
    (state) =>
      state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse
        ?.data
  );


  const { id } = useParams();
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const getAllBlockchain = useSelector(
    (state) => state?.GetAllBlockChain?.GetAllBlockChainResponse?.data
  );

  const getAllCollection = useSelector(
    (state) => state?.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );

  const getAllCurrency = useSelector(
    (state) => state?.GetAllCurrency?.GetAllCurrencyResponse?.data
  );

  const history = useHistory();
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [isloadingnft, setIsloadingnft] = useState(true);
  const [UnlockAbleContentt, SetUnlockAbleContentt] = useState(false);
  const [SensitiveContentt, SetSensitiveContentt] = useState(false);

  const [collectionLoader, setCollectionLoader] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [finalCreatedProperties, setFinalCreatedProperties] = useState([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [currencyId, setCurrencyId] = useState(3);
  const [getAllCollectionData, setGetAllCollection] = useState();
  // const [allBlockchain, setAllBlockchain] = useState([]);
  const [showTokenId, setShowTokenId] = useState(false);
  const [getMasterAddress, setGetMasterAddress] = useState();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [borderCheck, setBorderCheck] = useState(false);
  const [img, setImg] = useState();
  const dispatch = useDispatch();


  function ParseFloat(str, val) {
    str = str.toString();
    str = str.slice(0, (str.indexOf(".")) + val + 1);
    return Number(str);
  }
  const showToastMessage = (msg, type) => {
    return (
      toast(msg, {
        position: "top-right",
        type,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    )

  }


  const [addPropertiesList, setAddPropertiesList] = useState([
    { name: "", type: "" },
  ]);

  const [addLevelsList, setAddLevelsList] = useState([
    { speed: "", value: 3, of: 5 },
  ]);

  const [addStatsList, setAddStatsList] = useState([
    { speed: "", value: 3, of: 5 },
  ]);

  const [files, SetFiles] = useState();
  const [FileError, SetFileError] = useState("");
  const fileschange = (e) => {
    const file = e.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif" ||
      file?.type === "video/mp4"
    ) {
      SetFileError(null);
      SetFiles(file);
      setErrorMessage((prev) => {
        return { ...prev, image: "" }
      })
    } else {
      SetFileError("Invalid File Format ");
      SetFiles(null);
      setErrorMessage((prev) => {
        return { ...prev, image: "Please select" }
      })
    }
  };

  const [show, setShow] = useState(false);
  const [levelShow, setLevelShow] = useState(false);
  const [statsShow, setStatsShow] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const [nftImage, setNftImage] = useState("")
  const [params, setParams] = useState();
  const [Updateloader, setUpdateloader] = useState(false)
  const [t_collectionid, sett_collectionid] = useState()
  const [categoryId, setCategoryId] = useState()
  const [t_BlockChianid, Sett_BlockChianid] = useState()
  const [setter, setSetter] = useState(false)
  const [setterCategory, setSetterCategory] = useState(false)

  useEffect(() => {
    if (getAllCollection) {
      setcollectiondata()
    }
  }, [getAllCollection])


  const setcollectiondata = async (e) => {
    setGetAllCollection(getAllCollection)
    sett_collectionid(getAllCollection[0]?.id)
    dispatch(GetAllBlockChainAction()).then(
      (blockchainApiData) => {
        Sett_BlockChianid(blockchainApiData?.data[0]?.chainID)
      }).catch((error) => { });
    setCollectionLoader(false)
  }

  const handleClose = () => setShow(false);

  const setHighlight = (id) => {
    // const set = new Set();
    console.log(id)
    setSetter(getAllCollection.filter((item) => item.id === id))
    sett_collectionid(id)
  }
  const setHighlightCategory = (id) => {
    // const set = new Set();
    setSetterCategory(GetNftCollectionCategories.filter((item) => item.id === id))
    setCategoryId(id)
  }


  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 3000);
  });
  useEffect(() => {
    setTimeout(() => {
      setPageLoader(false);
    }, 2000);
  });

  const [NFTData, SetNFTData] = useState({
    fileupload: "",
    NFT_name: "",
    item_desc: "",
    item_extLink: "",
    NFT_price: "",
    item_supply: 1,
    blockchain: "",
    item_Freezemetadata: "",
    item_UnlockAbleContent: "",
    item_PropertyList: addPropertiesList,
    item_LevelsList: addLevelsList,
    item_StatsList: addStatsList,
    item_contactAddress: "",
    item_tokenId: "",
    collection: "",
    payment_token: 3,
    bidStart: "",
    bidEnd: "",
    royality: ""
  });


  useEffect(() => {
    if (getAllCurrency?.length > 0) {
      SetNFTData((prev) => {
        return { ...prev, item_tokenId: getAllCurrency[0].id }
      })
    }

    if (getAllBlockchain?.length > 0) {
      SetNFTData((prev) => {
        return { ...prev, blockchain: getAllBlockchain[0].chainID }
      })

    }
  }, [getAllCurrency, getAllBlockchain])



  const validations = () => {
    if (NFTData?.NFT_name) {
      setErrorMessage((prev) => {
        return { ...prev, NFT_name: "Name is required" }
      })
    }
    else {
      setErrorMessage((prev) => {
        return { ...prev, NFT_name: "" }
      })

    }

    if (NFTData?.NFT_price) {
      setErrorMessage((prev) => {
        return { ...prev, NFT_price: "Price is required" }
      })
    }
    else {
      setErrorMessage((prev) => {
        return { ...prev, NFT_price: "" }
      })

    }
    if (NFTData?.fileupload) {
      setErrorMessage((prev) => {
        return { ...prev, NFT_name: "File is Required" }
      })
    }
    else {
      setErrorMessage((prev) => {
        return { ...prev, NFT_name: "" }
      })

    }

  }


  const inputhandler = (e) => {
    const regex = /^(?!\s)(?![\s\S]*\s$)[a-zA-Z0-9\s()-]+$/
    let { name, value } = e.target;

    switch (name) {
      case "NFT_name":
        if (value.length > 25) {
          value = value.slice(0,45)
          setErrorMessage((prev) => {
            return { ...prev, NFT_name: "Max 25 characters" }
          })
        }
        else if (!value.match(regex)) {
          console.log(value);
          setErrorMessage((prev) => {
            return { ...prev, NFT_name: "Name is not valid" }
          })
        }
        else {
          setErrorMessage((prev) => {
            return { ...prev, NFT_name: "" }
          })
        }
        break;
        case "royality":
          if (value && value < 0.00000001) {
            setErrorMessage((prev) => {
              return { ...prev, royality: "Royality cannot be less than 0.00000001" }
            })
          }
          else {
            if (value && value > 100000000) {
              value = toInteger(value / 10)
            }
            let numa = value?.toString().split('.')
            if (numa[1]?.length > 4) {
              value = ParseFloat(value, 4)
            }
            setErrorMessage((prev) => {
              return { ...prev, royality: "" }
            })
          }
          break;
      case "NFT_price":
        if (value && value < 0.00000001) {
          setErrorMessage((prev) => {
            return { ...prev, NFT_price: "Price cannot be less than 0.00000001" }
          })
        }
        else {
          if (value && value > 100000000) {
            value = toInteger(value / 10)
          }
          let numa = value?.toString().split('.')
          if (numa[1]?.length > 4) {
            value = ParseFloat(value, 4)
          }
          setErrorMessage((prev) => {
            return { ...prev, NFT_price: "" }
          })
        }
        break;
      case "item_desc":
        if (value.length > 499) {
          setErrorMessage((prev) => {
            return { ...prev, item_desc: "Max 500 characters" }
          })
        }
        else {

            setErrorMessage((prev) => {
              return { ...prev, item_desc: "" }
            })

        }
        break;

    }

    SetNFTData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const addMoreProperty = () => {
    setAddPropertiesList((prev) => {
      return [...prev, { name: "", type: "" }];
    });
  };

  useEffect(() => {
    let params = window.location.pathname;
    setParams(params.split("/")[2]);
    if (id) {
      dispatch(GetAllBlockChainAction()).then(
        (blockchainApiData) => {
          dispatch(GetMyAllCollectionsAction()).then(
            () => {
              dispatch(GetAllCurrencyAction()).then(
                () => {
                  dispatch(GetMyNftByIdAction(id))
                    .then((res) => {
                      const data = res.data;
                      console.log(data)
                      const extractedBlockchain =
                        blockchainApiData?.data?.find((item, index) => {
                          return item?.shortName == data?.blockChainName;
                        });
                      setSelectedBlockchain(extractedBlockchain);

                      SetNFTData((prev) => {
                        return {
                          ...prev,
                          fileupload: data.image,
                          NFT_name: data?.name,
                          item_desc: data?.description === "null" || data?.description === null ? null : data?.description,
                          item_extLink: data?.externalLink,
                          NFT_price: data?.buyPrice,
                          item_supply: 1,
                          item_PropertyList: addPropertiesList,
                          item_LevelsList: addLevelsList,
                          item_StatsList: addStatsList,
                          item_contactAddress: data?.contractAddress,
                          item_tokenId: data?.nftTokenId,
                          collection: data?.collectionId,
                          payment_token: data?.currencyId,
                          bidStartTime: startDate,
                          bidEndTime: endDate,
                          blockchain: extractedBlockchain?.chainID,
                          royality: data?.royalty,
                        };
                      });
                      setCollectionId(data?.collectionId);
                      setIsloadingnft(false)
                      SetFiles(data?.image);
                      setImg(data?.image);

                    })
                    .catch((error) => { });
                }
              );
            }
          );
        }
      );
    } else {

      setIsloadingnft(false)
      dispatch(GetMyNftByIdRequest());

    }
  }, [id]);




  const removeProperty = (index) => {
    if (addPropertiesList.length == 0) return;
    else {
      let filteredList = [...addPropertiesList.filter((item, i) => i != index)];
      setAddPropertiesList(filteredList);
    }
  };

  const characterCahngeHandler = (e, index) => {
    const itemToChange = addPropertiesList.find((item, i) => index === i);
    const ind = addPropertiesList.indexOf(itemToChange);
    addPropertiesList[ind].name = e.target.value;
    const data = [...addPropertiesList];
    setAddPropertiesList(data);
  };

  const maleCahngeHandler = (e, index) => {
    const itemToChange = addPropertiesList.find((item, i) => index === i);
    const ind = addPropertiesList.indexOf(itemToChange);
    addPropertiesList[ind].type = e.target.value;
    const data = [...addPropertiesList];

    setAddPropertiesList(data);
  };


  const toggleOnPropertiesModal = () => {
    setShow(true);
  };
  const switchStatus = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const savePropertiesList = () => {

    const filter = addPropertiesList?.filter((item, index) => {
      return item?.name && item?.type;
    });
    setAddPropertiesList([...filter]);
    setShow(false);
    setFinalCreatedProperties([...filter]);
  };

  const onsubmitHandler = (e) => {
    console.log('NFTData', NFTData)
    let valid = 0;
    console.log(errorMessage.NFT_name, errorMessage.NFT_price)
    if (errorMessage.NFT_name || errorMessage.NFT_price) { valid++ }

    if (!files) {
      setErrorMessage((prev) => { return { ...prev, image: "NFT image is required" } })
      valid++;
    }
    if (!NFTData.NFT_name) {
      setErrorMessage((prev) => { return { ...prev, NFT_name: "NFT name is required" } })
      valid++;
    }
    if (!NFTData.item_desc) {
      setErrorMessage((prev) => { return { ...prev, item_desc: "Description is required" } })
      valid++
    }
    if (!NFTData.NFT_price) {
      setErrorMessage((prev) => { return { ...prev, NFT_price: "NFT price is required" } })
      valid++
    }
    if (!NFTData.NFT_price) {
      setErrorMessage((prev) => { return { ...prev, NFT_price: "NFT price is required" } })
      valid++
    }
    if (!NFTData.royality) {
      setErrorMessage((prev) => { return { ...prev, royality: "NFT royality is required" } })
      valid++
    }

    if (valid > 0) {
      showToastMessage("Fill form correctly", "type:'error'")
      return
    }

    setUpdateloader(true)

    setIsLoading(true);

    var bodyFormData = new FormData();
    bodyFormData.append("OwnerAddress", WalletAddress);
    bodyFormData.append("Name", NFTData.NFT_name);
    bodyFormData.append("ExternalLink", NFTData.item_extLink ? NFTData.item_extLink : " ");
    bodyFormData.append("Description", NFTData.item_desc);
    bodyFormData.append("UnlockableContent", UnlockAbleContentt);
    bodyFormData.append("CurrencyId", NFTData?.payment_token);
    bodyFormData.append("Royalty", NFTData.royality ? NFTData.royality : 0);
    bodyFormData.append(
      "UnlockableContentNote",
      NFTData.item_UnlockAbleContent
    );
    bodyFormData.append("ChainId", t_BlockChianid);
    bodyFormData.append("SensitiveContent", SensitiveContentt);
    bodyFormData.append("CollectionId", t_collectionid);
    bodyFormData.append("categoryId", categoryId);

    // usman's changing start
    // bodyFormData.append("BlockChainName", selectedBlockchain?.shortName);
    bodyFormData.append("BlockChainName", "RLC");
    // usman's changing end
    bodyFormData.append(
      "NftProperties",
      JSON.stringify(finalCreatedProperties)
    );
    bodyFormData.append("NftLevels", []);
    bodyFormData.append("NftStats", []);
    if (NFTData.item_contactAddress) {
      bodyFormData.append("ContractAddress", NFTData.item_contactAddress);
      bodyFormData.append("TokenId", NFTData.item_tokenId);
    }
    bodyFormData.append("Image", files);
    bodyFormData.append("Price", NFTData.NFT_price);


    console.table([...bodyFormData])

    if (id) {
      bodyFormData.append("NftId", id);
      bodyFormData.append("freezeData", isSwitchOn);

      if (isSwitchOn === true) {
        let params = window.location.pathname;
        http
          .get(
            httpUrl + `/api/v1/Nft/GetMyNftById?nftId=${params.split("/")[3]}`
          )
          .then((nftData) => {
            console.log("huehue")
            var payload = [
              {
                to: nftData.data.data.ownerAddress,
                royality: nftData.data.data.royalty,
                uri: nftData.data.data.ownerImage
                  ? nftData.data.data.ownerImage
                  : nftData.data.data.ownerAddress,
                tokenId: nftData.data.data.nftTokenId,
              },
            ];

            console.log("LMFAO", payload)



            mint(payload, nftData.data.data.contractAddress)
              .then((response) => {
                setIsLoading(true);
                bodyFormData.append("FeeTransactionHash", response.hash);
                const str = response.hash;
                showToastMessage("NFT Updating in process", "type:'success'")
                var postBody = {
                  nftId: id,
                  transactionHash: str,
                };
                delay(8000).then(() => {
                  http.put(httpUrl + "/api/v1/Nft/EditNft", bodyFormData).then(async (res) => {
                    await http
                      .post(
                        httpUrl +
                        `/api/v1/Nft/FreezeNft?NftId=${id.toString()}&TransactionHash=${str}`,
                        postBody
                      )
                      .then((res) => {
                        setIsLoading(false);
                        setTimeout(() => {
                          dispatch(GetMyAllNftsAction()).then(
                            (response) => {
                              setUpdateloader(false)
                              return history.push(
                                `/usernftdetail/${id}/${response?.data[0].accountId}`
                              );

                            }
                          )
                          dispatch(GetNftMarketAction());
                        }, 2000);
                        showToastMessage("NFT Updated successfully", "success")
                      })
                      .catch((err) => {
                        setUpdateloader(false)
                        // setIsLoading(false);
                      });

                  })
                });

              })
              .catch((err) => {
                setUpdateloader(false)
                showToastMessage("Transaction rejected", "error")
                setIsLoading(false);
              })

          })
          .catch((error) => {
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            console.log(error)
            //  setUpdateloader(false)
            setIsLoading(false);

          });
      }
      else if (isSwitchOn === false) {

        http.put(httpUrl + "/api/v1/Nft/EditNft", bodyFormData).then((res) => {
          setTimeout(() => {
            dispatch(GetMyAllNftsAction()).then((response) => {
              return history.push(
                `/usernftdetail/${id}/${response?.data[0].accountId}`
              );
            });
            dispatch(GetNftMarketAction());
          }, 2000);

          showToastMessage("NFT Updated successfully", "success")
          setIsLoading(false);
          //setUpdateloader(false)

        });
      }
    } else {
      http
        .get(httpUrl + "/api/v1/Nft/GetNftMintingFee")
        .then((res) => {
          const amount = parseInt(
            Web3.utils.toWei(String(res?.data?.data.nftFee))
          ).toString(16);
          var payload;
          if (NFTData.item_contactAddress) {
            payload = [
              {
                from: WalletAddress,
                to: NFTData.item_contactAddress,
                value: amount,
              },
            ];
          } else {
            payload = [
              {
                from: WalletAddress,
                to: getMasterAddress,
                value: amount,
              },
            ];
          }
          console.table([...bodyFormData])

          dispatch(AddNftAction(bodyFormData))
            .then((res) => {

              setIsLoading(false);
              showToastMessage(`${res.message} you are going to be redirected to created NFT`, "success")
              setTimeout(async () => {
                dispatch(GetMyAllNftsAction()).then((response) => {
                  return history.push(
                    `/usernftdetail/${response?.data[0].id}/${response?.data[0].accountId}`
                  );
                }).catch((err) => {
                  console.log("dhuyehgduyehd7uehd")
                  console.log("dhuyehgduyehd7uehd")
                  console.log("dhuyehgduyehd7uehd")
                  console.log(err)
                });
                dispatch(GetNftMarketAction());
              }, 2000);
            })
            .catch((error) => {
              setIsLoading(false);
              //setUpdateloader(false)

              showToastMessage(`${error?.message}`, "error")
            });
        })
        .catch((error) => {
          console.log("8721638217637213")
          console.log("8721638217637213")
          console.log(error)
          //setUpdateloader(false)

          setIsLoading(false);
        });
    }
  };

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
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
  const videosOBJ = useMemo(() => files?.type === "video/mp4" ? URL.createObjectURL(files) : "#", [files]);



  return (
    <div>
      {pageLoader ? (
        <div className="spacer-10">
          <br />
          <br />
          <br />
          <br />
          <div className="col-sm-12 d-flex justify-content-center">
            <BounceLoader color="white" size="80" />
          </div>
        </div>
      ) : (
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
          <div className="gradient-bg-light">
            <section className="jumbotron breadcumb no-bg">
              <div className="mainbreadcumb ">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12  col-sm-12">
                      <div className="small-header">
                        <div className="bg-layer"></div>
                        <span className="drop-span"></span>
                        <h1> {id ? "Update" : "Create"} Your NFT</h1>
                        <ul class="breadcrumb">
                          <li class="breadcrumb-item"><a href="/">Home</a></li>
                          <li class="breadcrumb-item active">{id ? "Update" : "Create"} NFT</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="container inner-page">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-10 col-xs-12 word-break-breakall">
                  <h5>Preview item</h5>
                  <div className="nft__item m-0 preview-box">
                    <div className="author_list_pp " style={{ background: "none" }}>
                    </div>
                    <div className="nft__item_wrap">
                      <span>
                        {id && NFTData?.fileupload == files ? (
                          <>
                            <img src={`${httpUrl}/${files}`} id="get_file_2" className="lazy nft__item_preview" alt="NFT.png" />
                          </>
                        ) : (
                          <>
                            {files ? (
                              <>
                                {files?.type === "video/mp4" ?
                                  (
                                    <div>
                                      {/* <Video /> */}
                                      <video
                                        style={{ width: "90%", height: "90%" }}
                                        controls
                                        autoPlay
                                        currentTime={11.3}
                                        src={videosOBJ}
                                      />
                                    </div>
                                  ) : (
                                    <img
                                      src={URL.createObjectURL(files)}
                                      style={{
                                        width: "45%",
                                        height: "45%",
                                        display: "block",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: "50%",
                                      }}
                                    />
                                  )
                                }
                              </>
                            ) : id ? (
                              <>
                                {console.log("Imag", img)}
                                {img && img?.split(".")[1] === 'mp4' ? (
                                  <video
                                    style={{ width: '100%', height: "200px" }}
                                    src={`${httpUrl}/${img}`}
                                    controls
                                    autoPlay
                                    currentTime={11.3}
                                  />
                                ) : (
                                  <img
                                    src={`${httpUrl}/${img}`}
                                    style={{ width: "45%", height: "45%" }}
                                  />
                                )}
                              </>
                            ) : (
                              <img src={NFTdefault} id="get_file_2" className="lazy nft__item_preview " alt="NFT.png" />
                            )}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="nft__item_info">
                      <h4>
                        {NFTData?.NFT_name
                          ? NFTData?.NFT_name
                          : "Item name"}
                      </h4>
                      <h5>
                        {NFTData.NFT_price ? NFTData.NFT_price + ' RLC' : "Enter Price"}{" "}
                      </h5>
                      {/* <span>#2345</span> */}
                    </div>
                  </div>

                  <Modal show={show} onHide={handleClose} animation={true} centered>
                    <Modal.Header className="modal-header-color">
                      <Modal.Title className="" style={{ color: "purple" }}>
                        Add Properties
                      </Modal.Title>

                      <button
                        aria-label="Hide"
                        onClick={handleClose}
                        className="btn-close"
                      />
                    </Modal.Header>
                    <Modal.Body className="modal-body-color">
                      <p>
                        Properties show up underneath your item, are clickable, and can
                        be filtered in your collection's sidebar.
                      </p>
                      <Row style={{ paddingBottom: "5px" }}>
                        <Col xs={1}></Col>
                        <Col xs={5}>
                          <span
                            className=""
                            style={{ fontWeight: "bold", color: "purple" }}
                          >
                            Type
                          </span>
                        </Col>
                        <Col xs={5}>
                          <span
                            className=""
                            style={{ fontWeight: "bold", color: "purple" }}
                          >
                            Name
                          </span>
                        </Col>
                      </Row>
                      <div
                        style={{
                          maxHeight: "300px",
                          overflowY: "scroll",
                          overflowX: "hidden",
                        }}
                      >
                        {addPropertiesList.map((item, index) => {
                          return (
                            <div
                              style={{
                                border: "1px solid #c7a7a7b9",
                                borderRadius: "4px",
                                // marginTop: "10px",
                              }}
                              key={index}
                            >
                              <Row style={{ height: "40px" }}>
                                <Col xs={1}>
                                  <div
                                    style={{
                                      width: "25px",
                                      height: "25px",
                                      cursor: "pointer",
                                      marginTop: "8px",
                                    }}
                                    onClick={() => {
                                      removeProperty(index);
                                    }}
                                  >
                                    <CrossIcon />
                                  </div>
                                </Col>
                                <Col
                                  xs={5}
                                  style={{
                                    borderRight: "1px solid #c7a7a7b9",
                                    borderLeft: "1px solid #c7a7a7b9",
                                    height: 40,
                                  }}
                                >
                                  <input

                                    placeholder="Character"
                                    type="text"
                                    maxLength={15}
                                    className="form-control black"
                                    value={item.name}
                                    onChange={(e) => {
                                      characterCahngeHandler(e, index);
                                    }}
                                    style={{
                                      border: "none",
                                      outline: "none",
                                    }}
                                  />
                                </Col>
                                <Col xs={5}>
                                  <input
                                    placeholder="Name"
                                    maxLength={15}
                                    onChange={(e) => {
                                      maleCahngeHandler(e, index);
                                    }}
                                    className="form-control black"
                                    value={item.type}
                                    type="text"
                                    style={{
                                      border: "none",
                                      outline: "none",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={addMoreProperty}
                        style={{
                          padding: "10px",
                          border: "2px solid purple",
                          color: "purple",
                          fontWeight: "bold",
                          background: "transparent",
                          borderRadius: "6px",
                          marginTop: "12px",
                          cursor: "pointer",
                        }}
                      >
                        Add more
                      </button>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer-color">
                      <div style={{ textAlign: "center", width: "100%" }}>
                        <button
                          style={{
                            background: "purple",
                            color: "white",
                            border: "none",
                            padding: "10px 16px",
                            borderRadius: "8px",
                          }}
                          onClick={savePropertiesList}
                        >
                          Save
                        </button>
                      </div>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="col-lg-8 mb-5">
                  {/* {id ? setFieldValue(values?.blockchain) : ""} */}
                  <div className="field-set">
                    <h5>Upload file</h5>
                    <div className="d-create-file">
                      <p
                        id="file_name"
                        className={FileError ? "text-danger" : ""}
                      >
                        
                        {/* @ts-ignore */}
                        {files
                          ? //  @ts-ignore
                          files?.name || files
                          : "PNG, JPG, GIF, WEBP or MP4. Max 200mb."}
                      </p>

                      {/* {files.map((x) => (
                    <p key="{index}">{x.name}</p>
                  ))} */}
                      <div className="browse">
                        <input
                          type="button"
                          id="get_file"
                          name="fileupload"
                          className="btn-main whiter"
                          value="Upload File"
                        />
                        <input
                          id="upload_file"
                          type="file"
                          name="fileupload"
                          onChange={(e) => {
                            fileschange(e);
                          }}
                        />       {errorMessage.image && (
                          <div style={{ color: "#6A1AB7" }}>{errorMessage.image}</div>
                        )}
                      </div>
                    </div>
                    <div className="spacer-10"></div>
                    <h5>Title</h5>
                    <input
                      onChange={(e) => {
                        inputhandler(e);
                      }}
                      value={NFTData?.NFT_name}
                      name="NFT_name"
                      className="form-control" autoComplete="off" placeholder="Item Name" />
                    {errorMessage.NFT_name && (
                      <div className="text-red">{errorMessage.NFT_name}</div>
                    )}
                    <div className="spacer-10"></div>

                    <h5>Price</h5>
                    <input
                      type="number"
                      onChange={(e) => {
                        inputhandler(e);
                      }}
                      value={NFTData?.NFT_price}
                      name="NFT_price"
                      className="form-control"
                      id="inputID"
                      placeholder="Enter price for one item RLC)"
                    />
                    {errorMessage.NFT_price && (
                      <div className="text-red">{errorMessage.NFT_price}</div>
                    )}
                    <div className="spacer-10"></div>



                    <h5>Description</h5>
                    <textarea
                      data-autoresize
                      onChange={(e) => {
                        inputhandler(e);
                      }}
                      value={NFTData.item_desc} MyProfile
                      name="item_desc"
                      maxLength={500}
                      id="item_desc"
                      className="form-control"
                      placeholder="e.g. “This is very limited item”'"
                    ></textarea>
                    {errorMessage.item_desc && (
                      <div className="text-red">{errorMessage.item_desc}</div>
                    )}
                    <div className="spacer-10"></div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h5>Royalties</h5>
                        <input onChange={(e) => {
                          inputhandler(e);
                        }} value={NFTData.royality} type='number' className="form-control" autoComplete="off" placeholder="2" name="royality" />
                        {errorMessage.royality && (
                          <div className="text-red">{errorMessage.royality}</div>
                        )}
                        <div className="spacer-10"></div>

                      </div>
                      
                    </div>

                  

                    {collectionLoader ? (
                      <>
                        <div>
                          <PulseLoader color="black" size="11" />
                        </div>
                      </>
                    ) : (
                      <>
                        {getAllCollectionData.length == 0 ? (
                          <>
                            <div className="spacer-10"></div>
                            <div className="propChildd">
                              <div className="child">
                                <span className="spann">
                                  {" "}
                                  <i onClick={() => history.push("/addcollection")} className="fa fa-fw" aria-hidden="true" title="Properties">
                                    
                                  </i>{" "}
                                  <h5 style={{ cursor: 'pointer' }} onClick={() => history.push("/addcollection")}>
                                    Add a collection
                                  </h5>
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <h5>Choose Collection</h5>
                            <ul className="choose-select-list">
                              <Slider {...settings}>
                                {getAllCollection?.map((item, index) => (

                                  <li onClick={() => setHighlight(item.id)}>
                                    <a className={setter ? setter.some((prev) => prev.id === item.id) ? 'choose-item border-collection' : 'choose-item' :  NFTData.collection ? setHighlight(item.id) : 'choose-item'} href="javascript:void(0);">
                                      <div className="img-pnl">
                                        <img src={httpUrl + "/" + item?.bannerImage} />
                                      </div>
                                      <div className="txt-pnl" style={{ backgroundImage: `url(${txtbg})` }}>
                                        <h6>{ }</h6>
                                        <p>{item.name}</p>
                                      </div>
                                    </a>
                                  </li>

                                ))}
                              </Slider>


                            </ul>

                          </>
                        
                        )}

                      </>
                    )}
                    <div className="spacer-10"></div>
                    {
                      id ? <></> :
                        <div className="" id="propeerty">
                          <div className="bottomBorderRed pb-2">
                            <div className="propChild">
                              <div className="child">
                                <span className="spann">
                                  {" "}

                                  <i className="fas fa-bars"></i>{" "}

                                  <h3>Properties</h3>
                                </span>
                                <div className="space20"></div>
                                <span className="color-white">
                                  Textual traits that show up as rectangles
                                </span>
                              </div>
                              <div className="child2">
                                <i
                                  onClick={toggleOnPropertiesModal}
                                  className="fa fa-fw"
                                  aria-hidden="true"
                                  title="Properties"
                                >
                                  
                                </i>
                              </div>
                            </div>

                            <Row>
                              {finalCreatedProperties &&
                                finalCreatedProperties?.map((data, index) => {
                                  return (
                                    <Col
                                      xs={6}
                                      sm={6}
                                      md={4}
                                      lg={4}
                                      className={
                                        "d-flex justify-content-center flex-column align-items-center mt-3 word-break-breakall"
                                      }
                                      key={index}
                                    >
                                      <div
                                        className="w-100"
                                        style={{
                                          backgroundColor:
                                            "rgba(21, 178, 229, 0.06)",
                                          borderRadius: 6,
                                          border: "1px solid #E250E5",
                                          padding: "5px 5px",
                                          textAlign: "center",
                                          wordBreak: "break",
                                          color: "white"
                                        }}
                                      >
                                        <p>{data.name}</p>
                                        <h4>
                                          <strong>{data.type} </strong>
                                        </h4>
                                      </div>
                                    </Col>
                                  );
                                })}
                            </Row>
                          </div>
                          
                        </div>
                    }


                    
                    {WalletAddress === window.location.pathname.split("/")[2] &&
                      <>
                        <h5>Freeze metadata?</h5>
                        {console.log(WalletAddress, params)}
                        <Formm>
                          <Formm.Switch
                            type="switch"
                            id="custom-switch"
                            label="Checking it will permanently freeze the metadata and can be sold on marketplace."
                            checked={isSwitchOn}
                            onChange={() => {
                              switchStatus();
                            }}
                          />
                        </Formm>
                      </>
                    }
                    <div className="spacer-20"></div>
                    <h5>
                      Contract Address (Optional)
                    </h5>
                    <input
                      placeholder="If already minted"
                      type="text"
                      onChange={(e) => {
                        inputhandler(e);
                        if (e.target.value == "") {
                          setShowTokenId(false);
                        } else {
                          setShowTokenId(true);
                        }
                      }}
                      value={NFTData.item_contactAddress}
                      name="item_contactAddress"
                      id="item_contactAddress"
                      className="form-control black"
                      disabled={id}
                    />
                    <div className="spacer-20"></div>


                    {/* <h5>Select Category</h5>
                    <ul className="choose-select-list">
                      <Slider {...settings}>
                        {GetNftCollectionCategories?.map((item, index) => (
                          <>
                            <li onClick={() => setHighlightCategory(item.id)}>
                              <a className={setterCategory ? setterCategory.some((prev) => prev.id === item.id) ? 'choose-item border' : 'choose-item' :  NFTData.collection ? setHighlightCategory(item.id) : 'choose-item'} href="javascript:void(0);">
                                <div className="img-pnl">
                                  <img src={banner1} />
                                </div>
                                <div className="txt-pnl" style={{ backgroundImage: `url(${txtbg})` }}>
                                  <h6>{item.name}</h6>
                                </div>
                              </a>
                            </li>

                          </>

                        ))}
                      </Slider>



                    </ul> */}
                    <div className="spacer-20"></div>

                    {showTokenId ? (
                      <>
                        <h5>Token Id</h5>
                        <input
                          type="number"
                          onChange={(e) => {
                            inputhandler(e);
                          }}
                          value={NFTData.item_tokenId}
                          name="item_tokenId"
                          id="item_tokenId"
                          className="form-control"
                          placeholder="Enter the Token id "
                        />

                        {NFTData.item_contactAddress.length > 0 &&
                          !NFTData.item_tokenId ? (
                          <div className="text-red">Token Id Required</div>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    <div className="spacer-10"></div>
                    <div className="btn-cntnr">
                      {isLoading ? (
                        <button className="reg-btn" disabled>
                          <PulseLoader color="white" size="11" />
                        </button>
                      ) : NFTData.item_contactAddress == "" ||
                        (NFTData.item_contactAddress.length > 0 &&
                          NFTData.item_tokenId) ? (
                        Updateloader ?
                          <button

                            id="submit"
                            className="reg-btn"

                          >
                            <PulseLoader color="white" size="11" />
                          </button>
                          :
                          <>
                            {
                              getAllCollectionData == 0 ?
                                <input
                                  id="submit"
                                  className="reg-btn"
                                  value={`${id ? "Update" : "Create"} Item`}
                                /> :
                                <input type="submit" id="submit" className="reg-btn" value={`${id ? "Update" : "Create"} NFT`} onClick={onsubmitHandler} />
                            }
                          </>
                      ) : (
                        <>
                          <input
                            id="submit"
                            className="reg-btn"
                            value={`${id ? "Update" : "Create"} NFT`}
                          />
                        </>
                      )}
                      <input
                        value={"Cancel"}
                        className="reg-btn"
                        onClick={() => history.goBack()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Footer />
          </div>

        </>
      )}
    </div>
  );
}
export default CreateNFT;

function CrossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
