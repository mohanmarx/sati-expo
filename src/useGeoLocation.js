import axios from "axios";
import { useState } from "react";

export default function useGeoLocation() {
  const [location, setLocation] = useState({ data: {}, error: false });
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    axios
      .get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
      )
      .then((res) => {
        setLocation({ data: res.data, error: false });
      })
      .catch((err) => {
        setLocation({ data: {}, error: true });
      });
  }

  return { getLocation, location };
}
