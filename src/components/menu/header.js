import React, { useEffect, useState } from "react";
import Breakpoint, {
  BreakpointProvider,
  setDefaultBreakpoints,
} from "react-socks";
import logo from "../../assets/images/logo.png";
import createnft from "../../assets/images/createnft.png";
import addcollection from "../../assets/images/addcollection.png";
import walletconnect from "../../assets/images/wallet-icon.png";
import bell from "../../assets/images/bell.svg";
import { Link, useHistory, useLocation } from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../../Redux/Actions/AuthActions/LogoutAction";
import { FaUserCircle } from "react-icons/fa";
import { ValidateSignatureRequest } from "../../Redux/Actions/AuthActions/ValidateSignatureAction";
import AuthConnectAction, {
  AuthConnectRequest,
} from "../../Redux/Actions/AuthActions/AuthConnectAction";
import MyProfileAction, {
  MyProfileRequest,
} from "../../Redux/Actions/Account/MyProfileAction";
import { autoConnect } from "../../metamask";
import localForage from "localforage";
import connectMetaMaskaction, {
  WalletDisconnect,
} from "../../Redux/Actions/WalletActions/WalletAction";
import GetAllBlockChainAction from "../../Redux/Actions/Blockchain/GetAllBlockChainAction";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);
const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? "active" : "non-active",
      };
    }}
  />
);
const Header = function () {
  const [connectWalletCondition, setConnectWalletCondition] = useState();
  let location = useLocation();
  const isConnected = useSelector(
    (state) => state.Login?.authResponse?.data?.token
  );
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const [openMenu3, setOpenMenu3] = React.useState(false);
  const [isWrongChain, setIsWrongChain] = useState(true);
  const [logout, setLogout] = useState(false);
  const [chain, setChain] = useState(false);
  const [showmenu, btn_icon] = useState(false);
  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );
  const GetAllBlockChain = useSelector(
    (state) => state?.GetAllBlockChain?.GetAllBlockChainResponse?.data
  );
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(async () => {
    setTimeout(async () => {
      await dispatch(GetAllBlockChainAction())
        .then(async (res) => {
          const chainid = await parseInt(window.ethereum.chainId);
          const result = res?.data?.some((item, index) => {
            return item.chainID == chainid;
          });
          if (!result && isConnected) {
            history.push("/connectwallet");
          }
          setIsWrongChain(result);
        })
        .catch((error) => {
          console.log(error?.message);
        });
    }, 2000);
  }, []);
  const Logoutt = async () => {
    await dispatch(WalletDisconnect());
    await dispatch(AuthConnectRequest());
    await dispatch(LogoutAction());
    await dispatch(ValidateSignatureRequest());
    setLogout(true)
  };
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
  };
  const handleBtnClick3 = () => {
    setOpenMenu3(!openMenu3);
  };
  const handleBtnClick4 = () => {
    document.getElementById("SideMenu").classList.add("active");
  };
  const handleBtnClick5 = () => {
    document.getElementById("SideMenu").classList.remove("active");
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  const closeMenu1 = () => {
    setOpenMenu1(false);
  };
  const closeMenu2 = () => {
    setOpenMenu2(false);
  };
  const closeMenu3 = () => {
    setOpenMenu3(false);
  };
  const ref = useOnclickOutside(() => {
    closeMenu();
  });
  const ref1 = useOnclickOutside(() => {
    closeMenu1();
  });
  const ref2 = useOnclickOutside(() => {
    closeMenu2();
  });
  const ref3 = useOnclickOutside(() => {
    closeMenu3();
  });
  useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      btn_icon(false);
      if (window.pageYOffset > sticky) {
      } else {
        totop.classList.remove("show");
      }
      if (window.pageYOffset > sticky) {
        closeMenu();
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  useEffect(() => {
    localForage
      .getItem("persist:AuthConnect")
      .then(async (value) => {
        const authResponse = JSON.parse(JSON.parse(value)?.AuthConnectResponse);
        if (
          authResponse &&
          authResponse.data &&
          Object.keys(authResponse.data).length > 0 &&
          authResponse.data.address
        ) {
          await dispatch(MyProfileAction())
            .then((res) => {
              if (res.data) {
                dispatch(connectMetaMaskaction(authResponse.data.address));
              } else if (res.data == null) {
                Logoutt();
              }
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      })
      .catch((err) => {
        console.log("error in localforage");
      });
  }, []);
  useEffect(async () => {
    if (location.pathname !== "/connectwallet") {
      setConnectWalletCondition(true);
    } else {
      setConnectWalletCondition(false);
    }
    window.scrollTo(0, 0);
    setTimeout(() => {
      if (window.ethereum) {
        WrongChainCheck();
      }
    }, 2000);
  }, [location.pathname]);
  const WrongChainCheck = async () => {
    if (window.web3.currentProvider.isMetaMask && window.ethereum.chainId) {
      const chainid = await parseInt(window.ethereum.chainId);
      const checkChainValidation = GetAllBlockChain?.some((item, index) => {
        return item.chainID == chainid;
      });
      if (
        (!checkChainValidation &&
          isConnected &&
          checkChainValidation !== undefined) ||
        (!isWrongChain && isConnected)
      ) {
        console.log((!isWrongChain || !checkChainValidation) && isConnected);
        history.push("/connectwallet");
      }
    } else {
      Logoutt();
    }
  };
  return (
    <header id="myHeader" className="navbar white">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="row w-100-nav">
          <div className="logo px-0">
            <div className="navbar-title navbar-item">
              <NavLink to="/" className="logo">
                {/* <img src={logo} className="img-fluid1 d-block header-logo " alt="#"/> */}
                <img src={logo} className="header-logo" alt="#" />
                {/* <img src={logo} className="img-fluid1 d-none header-logo" alt="#" /> */}
              </NavLink>
            </div>
          </div>
          <BreakpointProvider>
            <Breakpoint l down>
              {showmenu && (
                <div className="menu">
                  <div className="navbar-item">
                    <NavLink to="/createnft">
                      Create New NFT
                    </NavLink>
                  </div>
                  <div className="navbar-item">
                    <NavLink to="/marketplace">
                      MarketPlace
                    </NavLink>
                  </div>
                </div>
              )}
            </Breakpoint>
            <Breakpoint xl>
              <div className="menu">
                {/* <div className="navbar-item search-item">
                  <div className="search-container">
                    <button><i className="fa fa-search"></i></button>
                    <input className="form-control" autoComplete="off" placeholder="Search item, collections, and artists" />
                  </div>
                </div> */}
                <div className="navbar-item">
                  <NavLink to="/">
                    Home
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/explore">
                    Explore
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/allcollections">
                    Collection
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/createnft">
                    Create NFT
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/addcollection">
                    Add Collection
                  </NavLink>
                </div>
                <div className="navbar-item">
                  <NavLink to="/myprofile">
                    My Profile
                  </NavLink>
                </div>
                <div className="navbar-item search-item">
                  <div className="mainside">
                    {(isConnected && !logout && window.web3.currentProvider.networkVersion == '8457') ? (
                      <div ref={ref3}>
                        <div
                          className="dropdown-custom mainside-dropdown-toggle btn clsprofile"
                          onMouseEnter={handleBtnClick3}
                          onMouseLeave={closeMenu3}
                        >
                          <div className="header_list_pp">
                            <span>
                              {MyProfile?.profileImage ? (
                                <img className="lazy" src={httpUrl + "/" + MyProfile?.profileImage} alt="user.png"
                                  style={{ width: 40, objectFit: "cover", height: 40, borderRadius: "100%", }}
                                />
                              ) : (
                                <>
                                  <FaUserCircle size="2x" />
                                </>
                              )}
                            </span>
                          </div>
                          {openMenu3 && (
                            <div className="mainside-item-dropdown">
                              <div className="dropdown" onClick={closeMenu3}>
                                <Link className="SideDrop" to="/myprofile">
                                  Profile
                                </Link>
                                <Link className="SideDrop" to="/collections">
                                  My Collections
                                </Link>
                                <Link className="SideDrop" to="/settings">
                                  Profile Settings
                                </Link>
                                <Link onClick={Logoutt} className="SideDrop" to="#">
                                  Logout
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        {connectWalletCondition && (
                          <NavLink to="/connectwallet" className="btn-main cnt">
                            <img src={walletconnect} /> Connect Wallet
                          </NavLink>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/*
                <div className="navbar-item">
                  <NavLink className="bell circle-link" to="#">
                    <img src={bell} alt={""} className="bell" />
                  </NavLink>
                </div> */}
              </div>
            </Breakpoint>
          </BreakpointProvider>
          <div className="mainside mobile-view">
            {(isConnected && !logout) ? (
              <div className="navbar-item ">
                <div ref={ref3}>
                  <div
                    className="dropdown-custom mainside-dropdown-toggle btn clsprofile"
                    onMouseEnter={handleBtnClick3}
                    onMouseLeave={closeMenu3}
                  >
                    <div className="header_list_pp">
                      <span>
                        {MyProfile?.profileImage ? (
                          <img className="lazy" src={httpUrl + "/" + MyProfile?.profileImage} alt="user.png"
                            style={{ width: 40, objectFit: "cover", height: 40, borderRadius: "100%", }}
                          />
                        ) : (
                          <>
                            <FaUserCircle size="2x" />
                          </>
                        )}
                      </span>
                    </div>
                    {openMenu3 && (
                      <div className="mainside-item-dropdown">
                        <div className="dropdown" onClick={closeMenu3}>
                          <Link className="SideDrop" to="/myprofile">
                            Profile
                          </Link>
                          <Link className="SideDrop" to="/collections">
                            My Collections
                          </Link>
                          <Link className="SideDrop" to="/settings">
                            Edit Profile
                          </Link>
                          <Link onClick={Logoutt} className="SideDrop" to="#">
                            Logout
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {connectWalletCondition && (
                  <NavLink to="/connectwallet" className="btn-main cnt">
                    Connect Wallet
                  </NavLink>
                )}
              </>
            )}
          </div>
        </div>
        <button onClick={handleBtnClick4} class="burger-menu mobile">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {/* Side Menu Starts Here */}
      <div id="SideMenu" className="Sidemenu" onClick={handleBtnClick5}>
        <div className="Sidemenu-inner">
          <button onClick={handleBtnClick5} className="Close-btn">
            <i class="fa fa-close"></i>
          </button>
          <h1>Side Menu</h1>
          <ul className="Side-menu-list">
            <li>
              {" "}
              {connectWalletCondition && (
                <NavLink to="/connectwallet" className="">
                  Connect Wallet
                </NavLink>
              )}
            </li>
            <li>
              {" "}
              <NavLink to="/marketplace">
                MarketPlace
                <span className="lines"></span>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/explore">
                Explore
                <span className="lines"></span>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/allcollections">
                Collections
                <span className="lines"></span>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/CreateNFT">
                Create NFT
                <span className="lines"></span>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/myprofile">
              My Profile
                <span className="lines"></span>
              </NavLink>
            </li>
            {/* <li>
              {" "}
              <NavLink to="/privacypolicy">
                Privacy Policy
                <span className="lines"></span>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink to="/termsof-services">
                Terms Of Services
                <span className="lines"></span>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
      {/* Side Menu Starts Here */}
    </header>
  );
};
export default Header;
