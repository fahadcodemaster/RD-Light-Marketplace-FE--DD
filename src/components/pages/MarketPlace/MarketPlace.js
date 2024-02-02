import React, { useEffect } from "react";
import Select from "react-select";
import MarketPlaceProducts from "./MarketPlaceProducts";
import { useSelector, useDispatch } from "react-redux";
import GetNftMarketAction from "../../../Redux/Actions/NftActions/GetNftMarketAction";
import { useState } from "react";
import Footer from "../../components/footer";
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

const options = [
  { value: "All categories", label: "All categories" },
  { value: "Art", label: "Art" },
  { value: "Music", label: "Music" },
  { value: "Domain Names", label: "Domain Names" },
];
const options1 = [
  { value: "Buy Now", label: "Buy Now" },
  { value: "On Auction", label: "On Auction" },
  { value: "Has Offers", label: "Has Offers" },
];
const options2 = [
  { value: "All Items", label: "All Items" },
  { value: "Single Items", label: "Single Items" },
  { value: "Bundles", label: "Bundles" },
];

function MarketPlace() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.Login);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(GetNftMarketAction());
  }, [User]);
  return (
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

      <section className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12">
            <div className="items_filter">
              <form
                className="row form-dark"
                id="form_quick_search"
                name="form_quick_search"
              >
                <div className="col">
                  <input
                    className="form-control"
                    id="name_1"
                    name="name_1"
                    placeholder="search item here..."
                    type="text"
                  />{" "}
                  <button id="btn-submit">
                    <i className="fa fa-search bg-color-secondary"></i>
                  </button>
                  <div className="clearfix"></div>
                </div>
              </form>
              <div className="dropdownSelect one">
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
              </div>
            </div>
          </div>
        </div>
        <MarketPlaceProducts />

      </section>

    </div>
  );
}

export default MarketPlace;
