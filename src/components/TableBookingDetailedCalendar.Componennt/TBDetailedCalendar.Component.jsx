import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import strings from "../../assets/values/strings";
import { C } from "../../assets";

const TBDetailedCalendarComponent = ({
  onDayPress,
  current,
  today,
  onCancel,
  slotsAvailableDates,
}) => {
  const [selected, setSelected] = useState(current);
  const [datesForMarking, setDatesForMarking] = useState({});
  useEffect(() => {
    let newDaysObject = {};
    slotsAvailableDates.forEach((day) => {
      console.log(day, "day");
      newDaysObject[day] = {
        marked: true,
        dotColor: "transparent",
        customContainerStyle: {
          backgroundColor: C.colors.primary.color2,
          width: 33,
          height: 33,
        },
        customTextStyle: { color: C.colors.text.color1 },
      };
    });
    setDatesForMarking(newDaysObject);
  }, [slotsAvailableDates]);

  const selectDate = (data) => {
    setSelected((prev) => {
      if (data?.dateString < today || data?.dateString === prev) return prev;
      return data?.dateString;
    });
  };
  const onPressDone = () => {
    onDayPress(selected);
  };
  const theme = {
    arrowColor: C.colors.primary.color2, // Color of the arrows
    arrowBackgroundColor: C.colors.primary.color2,
    customContainerStyle: {
      borderRadius: 5,
      width: 33,
      height: 33,
    },
  };
  console.log(...slotsAvailableDates, "slots inside calendar");
  return (
    <View
      style={{
        flex: 1,
        padding: 11,
        backgroundColor: C.colors.bg.shadow2,
        justifyContent: "center",
      }}
    >
      <Calendar
        style={{ height: 365, borderRadius: 10, width: "100%" }}
        current={current || today}
        onDayPress={selectDate}
        markingType="period"
        markedDates={{
          ...datesForMarking,
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            customContainerStyle: {
              backgroundColor: C.colors.primary.color4,
              width: 33,
              height: 33,
            },
          },
        }}
        theme={theme}
      />
      <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
        <View
          style={{
            width: 300,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Pressable
            onPress={onCancel}
            style={{
              width: 90,
              backgroundColor: C.colors.primary.color2,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                color: C.colors.text.color1,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {strings.CANCEL}
            </Text>
          </Pressable>
          <Pressable
            onPress={onPressDone}
            style={{
              width: 90,
              backgroundColor: C.colors.primary.color1,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: C.colors.text.black,
              }}
            >
              {strings.DONE}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TBDetailedCalendarComponent;
