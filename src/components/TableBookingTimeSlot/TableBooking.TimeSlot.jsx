import { View, Text, Pressable, Platform, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { TBTimeSlotsStyles as styles } from "./TBTimeSlot.styles";
import EmptyInputWarningComponent from "../EmptyInputWarning/EmptyInputWarning.Component";
import Tooltip from "react-native-walkthrough-tooltip";
import pngImages from "../../assets/images/png";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TimePickerComponent from "../TimePicker/TimePicker.Component";

const TableBookingTimeSlotComponent = ({ setFrom, setTo, error, times }) => {
  const [menuTip, setMenuTip] = useState(false);
  const { top } = useSafeAreaInsets();

  const convertTime = (time) => {
    const t = time?.split(":");
    const format = Number(t[0]) >= 12 ? "PM" : "AM";
    let hours = Number(t[0]) % 12 || 12;
    return `${hours}:${t[1]} ${format}`;
  };
  const showTimes = [
    ...new Set(
      times?.map((item) => {
        const { openingTime, closingTime } = item;
        return JSON.stringify({ openingTime, closingTime });
      })
    ),
  ];

  return (
    <View style={[styles.topContainer]}>
      <View style={[styles.container]}>
        <View style={[styles.bottomContainer]}>
          <Text style={[styles.heading]}>{"Select time slot"}</Text>
          {showTimes?.length > 0 && (
            <Tooltip
              isVisible={menuTip}
              placement="top"
              onClose={() => {
                setMenuTip(false);
              }}
              topAdjustment={Platform.OS === "android" ? -top : 0}
              content={
                <View style={[styles.toolTipContainer]}>
                  <Text style={[styles.ToolTipTitle]}>booking hours</Text>
                  <View style={[styles.timeSlotContainer]}>
                    {showTimes?.map((item, idx) => {
                      const data = JSON.parse(item);
                      return (
                        <View key={idx} style={[styles.timeSlotWrapper]}>
                          <Text style={[styles.sessionText]}>
                            {`session: ${Number(idx) + 1}`}
                          </Text>
                          <Text style={[styles.normalText]}>
                            {`opening time: ${convertTime(data?.openingTime)}`}
                          </Text>
                          <Text style={[styles.normalText]}>
                            {`closing time: ${convertTime(data?.closingTime)}`}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              }
            >
              <View style={[styles.timeSlotTitle]}>
                <Text style={[styles.iText]}>opening hours</Text>
                <Pressable
                  style={styles.infoBtn}
                  onPress={() => setMenuTip(true)}
                >
                  <Image style={styles.toolIcon} source={pngImages.infoIcon} />
                </Pressable>
              </View>
            </Tooltip>
          )}
        </View>
        <TimePickerComponent title={"From"} set={setFrom} />
        <TimePickerComponent title={"To"} set={setTo} />
      </View>
      {error && (
        <EmptyInputWarningComponent warning={error} top={193} left={0} />
      )}
    </View>
  );
};

export default TableBookingTimeSlotComponent;
