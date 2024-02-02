import React, { useEffect, useState, useReducer } from "react";
import ColumnZero from "../components/ColumnZero";
import ColumnZeroTwo from "../components/ColumnZeroTwo";
import ColumnZeroThree from "../components/ColumnZeroThree";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import bar from '../../assets/images/bar.png';
import Footer from "../components/footer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import defaultImg from "../../assets/images/default.png";
import UserNfts from "./UserNft/UserNfts";
import OnSaleUserNfts from "./UserNft/OnSaleUserNfts";
import UserFavNft from "./UserNft/UserFavNft";
import { useDispatch, useSelector } from "react-redux";
import http from "../../Redux/Api/http";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import bannerimg from '../../assets/images/profile-banner.png';
import rlf from '../../assets/images/RLF-icon.png';
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
const GlobalStyles = createGlobalStyle``;
const initialState = { isDisable: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 'clicked':
      return { isDisable: true };
    case 'notClicked':
      return { isDisable: false };
  }
}

const UserProfile = function () {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [userData, setUserData] = useState();
  const [itemsCounter, setItemsCounter] = useState();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [text, settext] = useState("")
  const [showMore, setShowMore] = useState(false);
  const history = useHistory();
  const [state, disableDispatch] = useReducer(reducer, initialState)

  useEffect(async () => {
    let params = window.location.pathname;
    setAddress(params.split("/")[2]);
    await http
      .get(
        httpUrl +
        `/api/v1/Account/GetUserAccount?address=${params.split("/")[2]}`
      )
      .then((res) => {
        console.log(res.data);
        setItemsCounter(res.data.data.nftRequestModelList.length);
        setUserData(res.data.data.accountViewModel);
        setLoading(false);
        const text1 = res?.data?.data?.accountViewModel?.bio ? res?.data?.data?.accountViewModel?.bio?.toString() : ''
        settext(text1)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  return (
    <div className="gradient-bg-light">
      {loading ? (
        <PulseLoader color="white" size="11" />
      ) : (
        <>
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
              <div className="banner"
              // style={{ backgroundImage: `url(${bannerimg})` }}
              >
                <img src={bannerimg} />
                <div className="share-list-pnl">
                  <ul className="share-list-list">
                    <li><a href="#"><i class="fa fa-share-alt"></i></a></li>
                    <li><a href="#"><i class="fa fa-cog"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-image-holder">
            <div className="img-pnl">
              <img src={userData?.profileImage ? httpUrl + "/" + userData?.profileImage : defaultImg} alt="" />
              <span className="check-span"><i class="fa fa-check"></i></span>
            </div>
            <div className="text-pnl">
            <p id="wallet">
            {/* <span className="email-span" style={{ wordWrap: 'break-word' }}>{ProfileData?.email} </span><br /> */}
            <img src={rlf} style={{
              display: "inline-block",
              maxWidth: "20px",
              marginRight: "4px",
              marginBottom: "4px"

              // display: inline-block;
              // max-width: 20px;
              // margin-right: 4px;
            }} />
            {userData?.address}{" "}
            <CopyToClipboard
              text={userData?.address}
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
          
              <div className="user-social-contacts">
                {
                  userData?.instagramLink && userData?.instagramLink != "null" ?
                    <a target="_blank" href={userData?.instagramLink}><i className="fa fa-instagram"></i></a>
                    : <></>
                }
                {
                  userData?.twitterLink && userData?.twitterLink != "null" ?
                    <a target="_blank" href={userData?.twitterLink}><i className="fa fa-twitter"></i></a>
                    : <></>
                }
                {
                  userData?.yourSiteLink && userData?.yourSiteLink != "null" ?
                    <a target="_blank" href={userData?.yourSiteLink}><i className="fa fa-link"></i></a>
                    : <></>
                }
              </div>
            </div>
          </div>

          <section className="container p-t-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="items_filter">
                  <ul className=" de_nav">
                    <li id="Mainbtn" className="active">
                      <span onClick={handleBtnClick}>On Sale</span>
                    </li>
                    <li id="Mainbtn1" className="">
                      <span onClick={handleBtnClick1}>NFTs</span>
                    </li>
                    <li id="Mainbtn2" className="">
                      <span onClick={handleBtnClick2}>Liked</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='tab-container full-div'>
              {/* Side Filter */}
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
              </div>
              {/* Side Filter */}
              <div className='tab-inner-container'>
                {openMenu && (
                  <div id="zero1" className="onStep fadeIn">
                    <div className="flex-div">
                      {/* <div>
                        <h1>200 Items</h1>
                      </div> */}
                      {/* <ul className='sort-list'>
                        <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                        <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                      </ul> */}
                    </div>
                    <OnSaleUserNfts />
                  </div>
                )}
                {openMenu1 && (
                  <div id="zero2" className="onStep fadeIn">
                    <div className="flex-div">
                      {/* <div>
                        <h1>200 Items</h1>
                      </div> */}
                      {/* <ul className='sort-list'>
                        <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                        <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                      </ul> */}
                    </div>
                    <UserNfts />
                  </div>
                )}
                {openMenu2 && (
                  <div id="zero3" className="onStep fadeIn">
                    <div className="flex-div">
                      
                      {/* <ul className='sort-list'>
                        <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                        <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                      </ul> */}
                    </div>
                    <UserFavNft />
                  </div>
                )}
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </div>
  );
};
export default UserProfile;
