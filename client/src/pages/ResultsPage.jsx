import React from "react";
import { Marker } from "react-leaflet";
import RestaurantMarker from "components/map/RestaurantMarker";
import Logo from "components/layout/Logo";
import Map from "components/map/Map";
import Footer from "components/layout/Footer";

const ResultsPage = (props) => {
  const resultsData = JSON.parse(localStorage.getItem("resultsData"));
  const userLocation = [
    localStorage.getItem("latitude"),
    localStorage.getItem("longitude"),
  ];

  // creating list of markers for map
  const restaurantMarkers = resultsData.restaurants.map((aRestaurant) => (
    <Marker
      key={aRestaurant.id}
      position={[
        aRestaurant.coordinates.latitude,
        aRestaurant.coordinates.longitude,
      ]}
    >
      <RestaurantMarker
        restaurantName={aRestaurant.name}
        categories={aRestaurant.categories}
        url={aRestaurant.url}
        imageURL={aRestaurant.image_url}
        street={aRestaurant.address.street}
        city={aRestaurant.address.city}
      />
    </Marker>
  ));

  return (
    <>
      <div className="results-page-wrapper">
        <Logo />
        <div className="results-section">
          <div className="results-mood-wrapper">
            You appear to be{" "}
            <span className="bold">{resultsData.mood.toLowerCase()}</span>
            {/* If mood is happy or surprised, end with exclamation point. Or else, end with a period. */}
            {resultsData.mood.localeCompare("HAPPY") === 0 ||
            resultsData.mood.localeCompare("SURPRISED") === 0
              ? "!"
              : "."}
          </div>
          <div className="results-top-choice-wrapper">
            Your top restaurant suggestion is {resultsData.restaurants[0].name}.
          </div>
          <Map center={userLocation} markerList={restaurantMarkers} />
        </div>
        <Footer isMobile={props.isMobile} />
      </div>
    </>
  );
};

export default ResultsPage;
