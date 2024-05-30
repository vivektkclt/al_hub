import axios from "axios";
import { useState } from "react";
import config from "../env";

export const useVerifyOTP = ({ onOtpVerified, onError }) => {
  const sendOTP_URL = `${config.SIGNIN_API}send-otp`;
  const verifyOTP_URL = `${config.SIGNIN_API}verify-otp`;
  const [loading, setLoading] = useState(false);
  const [authToken, setToken] = useState("");

  const clearToken = () => {
    setToken("");
  };

  const context = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const sendOTP = async ({ phoneNumber }) => {
    setLoading(true);
    await axios({
      method: "post",
      url: sendOTP_URL,
      ...context,
      data: { contact: phoneNumber },
    })
      .then((response) => {
        setToken(response?.data?.generatedToken);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const verifyOTP = async ({ token, otp }) => {
    setLoading(true);
    await axios({
      method: "post",
      url: verifyOTP_URL,
      ...context,
      data: { otp, token },
    })
      .then((response) => {
        if (response?.data?.message === "OTP is valid") {
          onOtpVerified();
        } else {
          onError();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return { sendOTP, verifyOTP, loading, authToken, clearToken };
};
