import React, { useState } from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from "react-router-dom";
import "./stylesheets/Shipping.css";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import CheckoutSteps from "./CheckoutSteps";
import Button from "react-bootstrap/esm/Button";

import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../../redux-toolkit/slices/user.slice";
import PageTitle from "../../layout/PageTitle";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.userSlice);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (!address || !city || !state || !country || !pinCode || !phoneNo) {
      toast.error("All fields are required.");
      return;
    }

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/user/order/confirm");
  };

  return (
    <>
      <PageTitle title={"Ecommerce - Shipping"} />
      <Header />

      <main>
        <CheckoutSteps activeStep={0} />

        <div className="shippingContainer">
          <div className="form">
            <h2 className="shippingHeading">Shipping Details</h2>

            <form
              className="shippingForm"
              encType="multipart/form-data"
              onSubmit={shippingSubmit}
            >
              <div className="input-group">
                <span className="icon-wrapper">
                  <HomeIcon />
                </span>
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="input-group">
                <span className="icon-wrapper">
                  <LocationCityIcon />
                </span>
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="input-group">
                <span className="icon-wrapper">
                  <PinDropIcon />
                </span>
                <input
                  type="number"
                  placeholder="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>

              <div className="input-group">
                <span className="icon-wrapper">
                  <PhoneIcon />
                </span>
                <input
                  type="number"
                  placeholder="Phone Number"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="10"
                />
              </div>

              <div className="input-group">
                <span className="icon-wrapper">
                  <PublicIcon />
                </span>

                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {country && (
                <div className="input-group">
                  <span className="icon-wrapper">
                    <TransferWithinAStationIcon />
                  </span>

                  <select
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <Button onClick={shippingSubmit} variant="dark">
                Continue
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Shipping;
