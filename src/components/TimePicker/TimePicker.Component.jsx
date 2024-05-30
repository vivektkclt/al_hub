import { View, Text, Platform, Pressable } from "react-native";
import React from "react";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { C } from "../../assets";

const TimePickerComponent = ({ title, set }) => {
  const os = Platform.OS;
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());

  const Enable = () => {
    setShow(true);
  };

  const Disable = () => {
    setShow(false);
  };

  const fnSetTime = (date) => {
    console.log(date, "aaaaaaaaaa");
    if (date === undefined) {
      Disable();
      return;
    }
    if (date !== undefined) {
      Disable();
      setTime(new Date(date));
      set(new Date(date));

      return;
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          height: 60,
          alignItems: "center",
          backgroundColor: C.colors.primary.color1,
          padding: 10,
          borderRadius: 10,
          marginTop: 15,
          borderWidth: 0,
          borderColor: C.colors.border.grey,
          borderWidth: 0.6,
        }}
      >
        <Text style={{ color: C.colors.text.faded, fontWeight: "bold" }}>
          {title}
        </Text>
        <Pressable
          style={{
            padding: 5,
            borderRadius: 10,
            width: 80,
            alignItems: "center",
            elevation: 1,
            backgroundColor: C.colors.primary.color1,
            borderWidth: 0.5,
            borderColor: C.colors.border.grey,
            height: 30,
          }}
          onPress={Enable}
        >
          <Text style={{ color: C.colors.text.faded, fontSize: 13 }}>
            {time.toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Pressable>
      </View>
      {show ? (
        <RNDateTimePicker
          onChange={(event, date) => fnSetTime(date)}
          value={time}
          mode="time"
          display={os === "android" ? "clock" : "inline"}
        />
      ) : null}
    </>
  );
};

export default TimePickerComponent;
