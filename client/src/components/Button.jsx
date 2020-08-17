import React, { Component } from "react";
import Loader from "react-spinners/ClipLoader";
import "./LandingPage/LandingPage.css";

class Button extends Component {
  sendBackPhoto = (e) => {
    this.props.handleImageSubmission(e.target.files[0]);
  };

  render() {
    if (!this.props.isLoading) {
      return (
        <>
          <label className="submit-button" htmlFor="photo-upload">
            Submit
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={this.sendBackPhoto}
          />
        </>
      );
    } else {
      return (
        <>
          <label className="loading-button">
            <Loader size={30} color={"#ffffff"} />
          </label>
        </>
      );
    }
  }
}

export default Button;
