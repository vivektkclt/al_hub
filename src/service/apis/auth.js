import Axios from "axios";
import config from "../../env";
import { showMessage } from "react-native-flash-message";

async function signIn({ body }) {
  try {
    return await Axios.post(`${config.SIGNIN_API}login/google`, body);
  } catch (err) {
    showMessage({
      type: "danger",
      message: err?.response?.data?.message
        ? err?.response?.data?.message
        : err?.message,
    });
  }
}
async function signInWithCredentials({ body }) {
  try {
    return await Axios.post(`${config.SIGNIN_API}login`, body);
  } catch (err) {
    showMessage({
      type: "danger",
      message: err?.response?.data?.message
        ? err?.response?.data?.message
        : err?.message,
    });
  }
}

async function guestSignIn({ body }) {
  try {
    return await Axios.post(`${config.SIGNIN_API}login/guest`, body);
  } catch (err) {
    showMessage({
      type: "danger",
      message: err?.response?.data?.message
        ? err?.response?.data?.message
        : err?.message,
    });
  }
}

async function appleSignIn({ body }) {
  try {
    return await Axios.post(
      `${config.APPLE_LOGIN}/api/v1/auth/login/apple`,
      body
    );
  } catch (err) {
    showMessage({
      type: "danger",
      message: err?.response?.data?.message
        ? err?.response?.data?.message
        : err?.message,
    });
  }
}

async function refrshToken({ access_token, refresh_token }) {
  try {
    return await Axios.post(
      `${config.SIGNIN_API}refresh`,
      {
        refreshToken: refresh_token,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    ).catch((err) => {
      return {
        status: 401,
        message: err?.message,
      };
    });
  } catch (err) {}
}

async function updateProfile({ token, body }) {
  try {
    return await Axios.post(`${config.SIGNIN_API}update-profile`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {}
}

async function updateProfilePicture({ token, media }) {
  try {
    const { fileName, fileType, base64 } = media[0];
    const body = {
      image: {
        fileName,
        fileType,
        data: `data:image/jpg;base64,${base64}`,
      },
    };
    return await Axios.post(`${config.SIGNIN_API}update-image`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {}
}

async function getHomePicture({ place_id }) {
  try {
    const reference = await Axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=photo&key=AIzaSyDEiUAV5F31laqlntyJKANZ0jcZYEFoPKM`
    );
    return reference?.data?.result?.photos[0]?.photo_reference;
  } catch (err) {}
}

export const auth = {
  signIn,
  refrshToken,
  appleSignIn,
  guestSignIn,
  updateProfile,
  getHomePicture,
  updateProfilePicture,
  signInWithCredentials,
};
