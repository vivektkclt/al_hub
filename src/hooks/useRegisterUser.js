import { useState } from "react";
import config from "../env";
import Axios from "axios";

export const useRegisterUser = ({ onCompleted, onError }) => {
  const REGISTER_USER_URL = `${config.SIGNIN_API}register-by-mobile`;
  const [loading, setLoading] = useState(false);

  const context = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const registerUser = async ({
    contact,
    email,
    password,
    firstName,
    lastName,
    userName,
    role,
  }) => {
    setLoading(true);
    await Axios({
      method: "post",
      url: REGISTER_USER_URL,
      ...context,
      data: { contact, email, password, firstName, lastName, userName, role },
    }).then(
      (response) => {
        setLoading(false);
        onCompleted(response);
      },
      (reason) => {
        console.log(reason);
        onError(reason.response.data.message);
        setLoading(false);
      }
    );
  };
  return { registerUser, loading };
};
