import React, { Component } from "react";
import axios from "axios";
import Logo from "../Logo";
import LocationRequestButton from "../buttons/LocationRequestButton";
import SubmitButton from "../buttons/SubmitButton";
import PastaBackground from "../../assets/pasta-basil-landing-background.jpg";
import MobilePancakeBackground from "../../assets/pasta-basil-landing-background.jpg";
// import MobilePancakeBackground from "../../assets/pancakes.jpg";

import "./LandingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingResults: false,
      encodedImage: "",
      resultsData: "",
      image: "",
    };
    this.handleLocation = this.handleLocation.bind(this);
    this.handleImageSubmission = this.handleImageSubmission.bind(this);
  }

  handleLocation = (locationData) => {
    this.props.setLocationData(locationData);
  };

  handleImageSubmission = (imageSubmission) => {
    this.setState({ loadingResults: true });

    const image = imageSubmission;

    this.getBase64(image, (result) => {
      this.setState({
        encodedImage: result,
      });

      // Preparing data to be sent to backend.
      const data = {
        longitude: this.props.locationData.longitude,
        latitude: this.props.locationData.latitude,
        encodedImage: this.state.encodedImage,
      };

      // Sending data to backend to be processed.
      axios
        .post("/api/upload", data)
        .then((response) => {
          // Formats returned data and send it back to parent
          const returnJSON = JSON.parse(JSON.stringify(response));
          const status = returnJSON.data.status;

          const returnToParentData = {
            mood: returnJSON.data.mood,
            restaurantName: returnJSON.data.restaurantName,
            restaurantLocation: returnJSON.data.restaurantLocation,
          };

          this.setState({
            resultsData: returnToParentData,
            loadingResults: false,
          });

          this.props.onDataRetrieval(returnToParentData);
        })
        .catch((error) => {
          var alertMessage = error.response.statusText;
          console.log(alertMessage);
        });
    });
  };

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error in converting file to base64: ", error);
    };
  }

  render() {
    if (this.props.isMobile) {
      return (
        <>
          <div
            className="landing-wrapper-mobile"
            style={{
              backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.529),
              rgba(0, 0, 0, 0.529)
            ), url("${MobilePancakeBackground}")`,
            }}
          >
            <Logo isNavbarLogo="true" isMobile={this.props.isMobile} />
            <div className="description-wrapper-mobile">
              <div className="description-mobile">
                This web application takes your mood from your photo, then
                suggests a restaurant based on that mood!
              </div>
              <div className="directions-wrapper-mobile">
                <ol>
                  <li>
                    <LocationRequestButton
                      isMobile={this.props.isMobile}
                      handleLocation={this.handleLocation}
                      isDisabled={this.props.locationData.isShared}
                    />
                  </li>
                  <li>
                    Press the submit button below to either take a photo of
                    yourself (and whoever you're with!) or choose a selfie from
                    your gallery.
                  </li>
                  <li>
                    After choosing a photo, wait a few seconds, and Food Mood
                    will recommend a nearby restaurant for you!
                  </li>
                </ol>
              </div>
            </div>
            <div className="button-wrapper-mobile">
              <SubmitButton
                isMobile={this.props.isMobile}
                handleImageSubmission={this.handleImageSubmission}
                isEnabled={this.props.locationData.isShared}
                isLoading={this.state.loadingResults}
              />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            className="landing-wrapper"
            style={{
              backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.471),
                rgba(0, 0, 0, 0.471)
              ), url("${PastaBackground}")`,
            }}
          >
            <Logo isNavbarLogo="true" />
            <div className="description-wrapper">
              <div className="description">
                This web application takes your mood from your photo, then
                suggests a restaurant based on that mood!
              </div>
              <div className="directions-wrapper">
                <ol>
                  <li>
                    <LocationRequestButton
                      handleLocation={this.handleLocation}
                      isDisabled={this.props.locationData.isShared} // if location is shared, disable this button
                    />
                  </li>
                  <li>
                    Press the submit button below to either take a photo of
                    yourself (and whoever you're with!) or choose a selfie from
                    your gallery.
                  </li>
                  <li>
                    After choosing a photo, wait a few seconds, and Food Mood
                    will recommend a nearby restaurant for you!
                  </li>
                </ol>
              </div>
            </div>
            <div className="button-wrapper">
              <SubmitButton
                handleImageSubmission={this.handleImageSubmission}
                isEnabled={this.props.locationData.isShared} // if location is shared, enable this button
                isLoading={this.state.loadingResults}
              />
            </div>
          </div>
        </>
      );
    }
  }
}

export default LandingPage;
