import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";

// function to get location

function getCurrentPosition(params = null) {
  let options = params
    ? params
    : { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 };
  return new Promise((res, rej) => {
    Geolocation.getCurrentPosition(res, rej, options);
  });
}
export default async function (params = null) {
  return new Promise(async (resolve, reject) => {
    try {
      let permission = await askPermission();
      if (permission === "granted") {
        const location = getCurrentPosition();
        resolve(location);
      } else {
        reject("Location permission not granted");
      }
    } catch (e) {
      reject(e);
    }
  });
}

// ask location permission

async function askPermission() {
  let permission;
  if (Platform.OS === "ios") {
    permission = Geolocation.requestAuthorization("whenInUse");
  } else {
    permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }
  return permission;
}

// convert deg to rad
function degreesToRadians(degrees) {
  if (typeof degrees !== "number" || isNaN(degrees)) {
    throw new Error("degrees must be a number");
  }
  return (degrees * Math.PI) / 180;
}

// calculate distance beetween two coordinates using Haversine's formulae

export function compareDistance(coord1, coord2) {
  coord1.latitude =
    typeof coord1.latitude === "string"
      ? parseFloat(coord1.latitude)
      : coord1.latitude;
  coord1.longitude =
    typeof coord1.longitude === "string"
      ? parseFloat(coord1.longitude)
      : coord1.longitude;
  coord2.latitude =
    typeof coord2.latitude === "string"
      ? parseFloat(coord2.latitude)
      : coord2.latitude;
  coord2.longitude =
    typeof coord2.longitude === "string"
      ? parseFloat(coord2.longitude)
      : coord2.longitude;
  if (
    typeof coord1.latitude !== "number" ||
    typeof coord1.longitude !== "number" ||
    typeof coord2.latitude !== "number" ||
    typeof coord2.longitude !== "number"
  ) {
    throw new Error("coordinates should be a number ");
  }
  // radius varies
  const radius = 6378;

  const latDiffRad = degreesToRadians(coord2.latitude - coord1.latitude);
  const lonDiffRad = degreesToRadians(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(latDiffRad / 2) * Math.sin(latDiffRad / 2) +
    Math.cos(degreesToRadians(coord1.latitude)) *
      Math.cos(degreesToRadians(coord2.latitude)) *
      Math.sin(lonDiffRad / 2) *
      Math.sin(lonDiffRad / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return radius * c;
}

// key.......
const GEOCODE_API_KEY = "AIzaSyAUGtbDAgDdr72vhmkNyz487pWeE2sjc9g";
const GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json?";

// for data (url parameters )object see https://developers.google.com/maps/documentation/geocoding/

export async function geocode(data) {
  const params = new URLSearchParams({
    ...data,
    key: GEOCODE_API_KEY,
  }).toString();
  return fetch(GEOCODE_API_URL + params).then((res) => res.json());
}
