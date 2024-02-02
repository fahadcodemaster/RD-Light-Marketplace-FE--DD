import React, { useEffect, useState } from "react";
import ColumnZero from "../components/ColumnZero";
import ColumnZeroTwo from "../components/ColumnZeroTwo";
import Footer from "../components/footer";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import bar from '../../assets/images/bar.png';
import { createGlobalStyle } from "styled-components";
import GetMyAllCollectionsAction from "../../Redux/Actions/CollectionAction/GetMyAllCollections";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";
import MyCollections from "./MyCollections";
import defaultImg from "../../assets/images/default.png";
import bannerimg from '../../assets/images/profile-banner.png';

const GlobalStyles = createGlobalStyle`

`;

const Collections = function () {
  const dispatch = useDispatch();

  const history = useHistory();

  const allMyCollections = useSelector(
    (state) => state.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );
  const [isloading, setIsloading] = useState(true);

  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );
  const data = useSelector((state) => state);
  const [allCollectionsState, setAllCollectionsState] = useState([]);
  const [height, Setheight] = useState(270);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  useEffect(() => {
    if (allMyCollections && allMyCollections.length > 0) {
      setAllCollectionsState(allMyCollections?.slice(0, 8));
    }
  }, [allMyCollections]);

  useEffect(async () => {
    await dispatch(GetMyAllCollectionsAction())
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
    let collectionsState = allCollectionsState;
    let start = collectionsState?.length;
    let end = collectionsState?.length + 8;
    setAllCollectionsState([
      ...collectionsState,
      ...allMyCollections.slice(start, end),
    ]);
  };

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img.offsetHeight,
      });
    }
  };

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
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
      <div className="profile-banner">
        <div className="container">
          <div className=" banner"
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
          <img src={MyProfile?.profileImage ? httpUrl + "/" + MyProfile?.profileImage : defaultImg} alt="" />
          {/* <span className="check-span"><i class="fa fa-check"></i></span> */}
        </div>
        <div className="text-pnl">
          <h2>
            {MyProfile?.username ? MyProfile?.username: 'Unnamed'} 
          </h2>
          <h6>Created by: Team RLC</h6>
        </div>
      </div>

      <section className="container p-t-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="items_filter">
              <ul className="d-flex justify-content-center de_nav text-left">
                <li id="Mainbtn" className="active">
                  <span onClick={handleBtnClick}>Items</span>
                </li>
                <li id="Mainbtn1" className="">
                  <span onClick={handleBtnClick1}>Activity</span>
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
                  <div>
                    <h1>200 Items</h1>
                  </div>
                  {/* <ul className='sort-list'>
                    <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                    <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                  </ul> */}
                </div>
                <div className="full-div spacer60"></div>
                <div className="full-div">
                  <MyCollections />
                </div>
              </div>
            )}
            {openMenu1 && (
              <div id="zero2" className="onStep fadeIn">
                <div className="flex-div">
                  <div>
                    <h1>200 Items</h1>
                  </div>
                  {/* <ul className='sort-list'>
                    <li><a href="#">Sort by <i class="fa fa-list"></i></a></li>
                    <li><a href="#">Low To High <i className='fa fa-angle-down'></i></a></li>
                  </ul> */}
                </div>
                <div className="full-div spacer60"></div>
                <div className="full-div">
                  <MyCollections />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Collections;
