import { View, Text, Pressable, Image, Modal } from "react-native";
import React from "react";
import { useState } from "react";
import DateChip from "../DateChip/DateChip";
import { TBCStyles as styles } from "./TBC.styles";
import TBDetailedCalendarComponent from "../TableBookingDetailedCalendar.Componennt/TBDetailedCalendar.Component";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import pngImages from "../../assets/images/png";
import { C } from "../../assets";

const TableBookingCalendarComponent = ({
  set,
  selectedDate,
  slotsAvailableDates,
  LastIndex = 4,
}) => {
  const FirstIndex = 0;
  const [dayArray, setDayArray] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [today, setToday] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  const fnSetDayArray = (data) => {
    setLoading(true);
    setDayArray([]);
    for (let i = FirstIndex; i < LastIndex + 1; i++) {
      setDayArray((prev) => {
        if (prev.length < 1) {
          set(data);
          return [data];
        } else {
          const d = new Date(prev[prev.length - 1]);
          d.setDate(d.getDate() + 1);
          return [...prev, d.toISOString().slice(0, 10)];
        }
      });
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fnSetDayArray(today);
    }, [])
  );

  const selectNextDay = () => {
    setDayArray((prev) => {
      if (selectedDate === prev[LastIndex]) {
        const d = new Date(prev[LastIndex]);
        d.setDate(d.getDate() + 1);
        const e = d.toISOString().slice(0, 10);
        set(e);
        return [...prev.slice(1), e];
      } else {
        set(dayArray[prev.indexOf(selectedDate) + 1]);
        return prev;
      }
    });
  };

  const funcSetSelectedDate = (data) => {
    set(data);
  };

  const selectPrevDay = () => {
    setDayArray((prev) => {
      if (selectedDate === prev[FirstIndex]) {
        const d = new Date(prev[FirstIndex]);
        d.setDate(d.getDate() - 1);
        const e = d.toISOString().slice(0, 10);
        set(e);
        return [e, ...prev.slice(0, 4)];
      } else {
        set(dayArray[prev.indexOf(selectedDate) - 1]);
        return prev;
      }
    });
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };
  const openCalendar = () => {
    setShowCalendar(true);
  };
  const setDateFromCalendar = (data) => {
    if (dayArray.includes(data)) {
      set(data);
      closeCalendar();
      return;
    }
    fnSetDayArray(data);
    closeCalendar();
  };

  if (loading) {
    return <></>;
  }
  return (
    <>
      <Modal
        visible={showCalendar}
        collapsable
        onRequestClose={closeCalendar}
        statusBarTranslucent
        transparent
        children={
          <TBDetailedCalendarComponent
            onDayPress={setDateFromCalendar}
            current={selectedDate}
            today={today}
            onCancel={closeCalendar}
            slotsAvailableDates={slotsAvailableDates}
          />
        }
      />
      <View style={[styles.container]}>
        <Text style={[styles.headingFont]}>Date</Text>
        <View style={[styles.chipContainer]}>
          {dayArray.map((day, i) => {
            return (
              <DateChip
                key={i}
                date={day}
                selectedDate={selectedDate}
                onClick={funcSetSelectedDate}
              />
            );
          })}
        </View>
        <View style={[styles.arrowsContainer]}>
          <Pressable
            disabled={selectedDate === today}
            onPress={selectPrevDay}
            style={[
              styles.arrowBtn,
              {
                backgroundColor:
                  selectedDate === today
                    ? C.colors.primary.primary3
                    : C.colors.primary.color2,
              },
            ]}
          >
            <Image
              source={pngImages.backWordIcon}
              style={[styles.arrow, styles.leftArrow]}
            />
          </Pressable>
          <Pressable onPress={openCalendar} style={[styles.calendarBtn]}>
            <Image source={pngImages.calendarIcon} style={[styles.calendar]} />
          </Pressable>
          <Pressable
            onPress={selectNextDay}
            style={[
              styles.arrowBtn,
              { backgroundColor: C.colors.primary.color2 },
            ]}
          >
            <Image source={pngImages.forwardIcon} style={[styles.arrow]} />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default TableBookingCalendarComponent;
