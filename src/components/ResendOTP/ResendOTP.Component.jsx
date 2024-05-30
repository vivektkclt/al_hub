import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import { ResendOTPStyles as styles } from "./ResendOTP.styles";
import { C } from "../../assets";

const ResendOTPComponent = ({
  onClick,
  token,
  showMessage = false,
  message,
}) => {
  const [expiryTime, setExpiryTime] = useState(0);

  useEffect(() => {
    setExpiryTime(60);
    const updateCountdown = () => {
      setExpiryTime((prev) => {
        if (prev === 0) return 0;
        return prev - 1;
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <View style={[styles.container]}>
      {showMessage && <Text style={[styles.message]}>{message}</Text>}
      <Pressable disabled={expiryTime > 0} onPress={onClick}>
        <Text
          style={[
            styles.sendOTPText,
            {
              color:
                expiryTime > 0
                  ? C.colors.text.secondary
                  : C.colors.text.secondary4,
            },
          ]}
        >
          {C.strings.RESEND_OTP}
        </Text>
      </Pressable>
      {expiryTime !== 0 && (
        <Text
          style={[
            styles.sendOTPText,
            {
              color:
                expiryTime > 0
                  ? C.colors.text.secondary
                  : C.colors.text.secondary4,
            },
          ]}
        >
          ( 00:
          {expiryTime.toString().length < 2 ? "0" + expiryTime : expiryTime})
        </Text>
      )}
    </View>
  );
};

export default ResendOTPComponent;
