import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Pressable,
} from "react-native";
// export ANDROID_HOME=~/Library/Android/sdk
import { useNavigation, useRoute } from "@react-navigation/native";
import { calendarStyles as styles } from "./Calendar.style";
import { Calendar } from "react-native-calendars";
import EmptySlotsWarning from "../EmptySlots/EmptySlotsWarning";
import TimeSlotChip from "../TimeSlotChip/TimeSlotChip";
import { C } from "../../assets";
import pngImages from "../../assets/images/png";

const CustomCalendar = ({ name, slots, hours }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSlotObj, setSelectedSlotObj] = useState(null);
  const [selected, setSelected] = useState(
    selectedDate.toISOString().slice(0, 10)
  );
  const [selectedDateSlots, setSelectedDateSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [slotAvailableDates, setSlotAvailableDates] = useState({});
  const navigation = useNavigation();
  const slottedDates = slots.map((slot) => slot.date.slice(0, 10));
  const dates = [...new Set(slottedDates)].filter(
    (item) =>
      JSON.stringify(new Date(item).toISOString().slice(0, 10)) >=
      JSON.stringify(new Date().toISOString().slice(0, 10))
  );

  useEffect(() => {
    let newDaysObject = {};
    dates.forEach((day) => {
      newDaysObject[day] = {
        marked: true,
        markingType: "period",
        dotColor: "transparent",
        customContainerStyle: {
          backgroundColor: C.colors.primary.color2,
          borderRadius: 22,
          width: 33,
          height: 33,
        },
        customTextStyle: { color: C.colors.text.color1 },
      };
    });
    setSlotAvailableDates(newDaysObject);
  }, [slots]);

  const getWeekDays = (startDate) => {
    const days = [];
    for (let i = 0; i < 2; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dayObject = {
        dayOfWeek: currentDate
          .toLocaleString("en-US", { weekday: "short" })
          .substring(0, 3),
        monthAbbrev: currentDate.toLocaleString("en-US", { month: "short" }),
        date: currentDate.getDate(),
      };
      days.push(dayObject);
    }
    return days;
  };

  const handleNextWeek = async () => {
    if (selectedIndex == 0) {
      setIndex(1);
      return;
    }
    const newStartDate = new Date(selectedDate);
    newStartDate.setDate(selectedDate.getDate() + 2);
    setIndex(0);
    setSelectedDate(newStartDate);
    const arr = await slots?.filter((x, i) => {
      const dateInSlot = x?.date.toString().slice(0, 10);
      const dateValue = `${newStartDate?.getFullYear()}-${(
        newStartDate?.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${newStartDate
        ?.getDate()
        .toString()
        .padStart(2, "0")}`;

      if (dateValue == dateInSlot) {
        return true;
      } else {
        return false;
      }
    });
    setSelectedDateSlots(() => []);
    setSelectedDateSlots((prev) => [...prev, ...arr]);
    setSelectedSlotObj(null);
  };

  const handlePreviousWeek = () => {
    if (selectedIndex === 1) {
      setIndex(0);
      return;
    }
    const newStartDate = new Date(selectedDate);
    newStartDate.setDate(selectedDate.getDate() - 1);
    setIndex(0);
    setSelectedDate(newStartDate);

    const arr = slots?.filter((x, i) => {
      const dateInSlot = x?.date.toString().slice(0, 10);
      const dateValue = `${newStartDate?.getFullYear()}-${(
        newStartDate?.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${newStartDate
        ?.getDate()
        .toString()
        .padStart(2, "0")}`;

      if (dateValue == dateInSlot) {
        return true;
      } else {
        return false;
      }
    });
    setSelectedDateSlots(() => []);
    setSelectedDateSlots((prev) => [...prev, ...arr]);
    setSelectedSlotObj(null);
  };

  const showCalendar = () => {
    setCalendarView(true);
  };

  const hideCalendar = () => {
    setCalendarView(false);
    setSelectedToOld();
  };

  const setIndex = (i, updateSlots = true) => {
    const step = i;
    setSelectedIndex(i);
    const newSelectedDate = new Date(selectedDate);
    newSelectedDate.setDate(selectedDate.getDate() + step);
    if (!updateSlots) {
      return;
    }
    const arr = slots?.filter((x, i) => {
      const dateInSlot = x?.date.toString().slice(0, 10);
      const dateValue = `${newSelectedDate?.getFullYear()}-${(
        newSelectedDate?.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${newSelectedDate
        ?.getDate()
        .toString()
        .padStart(2, "0")}`;

      if (dateValue == dateInSlot) {
        return true;
      } else {
        return false;
      }
    });
    setSelectedDateSlots(() => []);
    setSelectedDateSlots((prev) => [...prev, ...arr]);
    setSelectedSlotObj(null);
  };

  const setSelectedToOld = () => {
    setSelected(selectedDate.toISOString().slice(0, 10));
  };
  const theme = {
    arrowColor: C.colors.primary.color2, // Color of the arrows
    todayTextColor: "blue", // Color of the selected date text
    dayTextColor: C.colors.text.faded, // Color of the day text
    textSectionTitleColor: C.colors.text.black, // Color of the month title text
    arrowBackgroundColor: C.colors.primary.color2,
  };

  const selectSlots = (d) => {
    const arr = slots?.filter((x, i) => {
      const date = x?.date.toString().slice(0, 10);

      if (date == d.dateString) {
        return true;
      } else {
        return false;
      }
    });
    setSelectedDateSlots(() => []);
    setSelectedDateSlots((prev) => [...prev, ...arr]);
    const newStartDate = new Date(d.dateString);
    setIndex(0, false);
    setSelectedDate(newStartDate);
  };
  function showSlots(newSelectedDate) {
    const arr = slots?.filter((x, i) => {
      const dateInSlot = x?.date.toString().slice(0, 10);
      const dateValue = `${newSelectedDate?.getFullYear()}-${(
        newSelectedDate?.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${newSelectedDate
        ?.getDate()
        .toString()
        .padStart(2, "0")}`;
      if (dateValue == dateInSlot) {
        return true;
      } else {
        return false;
      }
    });
    return arr;
  }
  useEffect(() => {
    const newSelectedDate = new Date();
    const arr = showSlots(newSelectedDate);
    setSelectedDateSlots(() => []);
    setSelectedDateSlots((prev) => [...prev, ...arr]);
    setIndex(0, false);
    setSelectedDate(newSelectedDate);
  }, [slots]);

  return (
    <>
      <Modal
        collapsable
        animationType="slide"
        transparent={true}
        visible={calendarView}
        onRequestClose={hideCalendar}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Calendar
              style={styles.calendar}
              markingType="period"
              markedDates={{
                ...slotAvailableDates,
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  customContainerStyle: {
                    backgroundColor: C.colors.primary.secondary,
                    borderRadius: 33,
                    width: 33,
                    height: 33,
                  },
                },
              }}
              onDayPress={(day) => {
                setSelectedDay(day);
                setSelected(day.dateString);
              }}
              theme={theme}
            />
          </View>
          <View style={[styles.calendarBtnContainer]}>
            <TouchableOpacity
              onPress={hideCalendar}
              style={[styles.calendarBtn, styles.calendarCancelBtn]}
            >
              <Text style={[styles.calendarCancelBtnText, styles.btnText]}>
                {C.strings.CANCEL}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectedDay && selectSlots(selectedDay);
                setCalendarView(false);
              }}
              disabled={
                (selectedDay &&
                  JSON.stringify(selectedDay.dateString) <
                    JSON.stringify(new Date().toISOString().slice(0, 10))) ||
                false
              }
              style={[
                styles.calendarBtn,
                {
                  backgroundColor:
                    selectedDay &&
                    JSON.stringify(selectedDay.dateString) <
                      JSON.stringify(new Date().toISOString().slice(0, 10))
                      ? C.colors.primary.primary3
                      : C.colors.primary.color1,
                },
              ]}
            >
              <Text style={[styles.calendarConfirmBtnText, styles.btnText]}>
                {C.strings.DONE}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={[styles.container]}>
        <View style={[styles.DatePicker]}>
          <View style={[styles.datePickerTitleContainer]}>
            <Text style={[styles.datePickerTitleText]}>
              {C.strings.SLOT_BOOKING_TITLE}
            </Text>
            <Text style={[styles.datePickerTitleText]}>
              {C.strings.SELECT_DATE}
            </Text>
          </View>
          <View style={[styles.dateChipsContainer]}>
            <TouchableOpacity
              disabled={
                selectedIndex === 0 &&
                JSON.stringify(selectedDate.toISOString()) <=
                  JSON.stringify(new Date().toISOString())
              }
              onPress={handlePreviousWeek}
              style={[
                styles.navigationButton,
                {
                  backgroundColor:
                    selectedIndex === 0 &&
                    JSON.stringify(selectedDate.toISOString()) <=
                      JSON.stringify(new Date().toISOString())
                      ? C.colors.primary.primary3
                      : C.colors.primary.color2,
                },
              ]}
            >
              <Image
                style={[styles.navigationIcon, { marginRight: 5 }]}
                source={pngImages.backWordIcon}
                alt="Back"
              />
            </TouchableOpacity>

            {[0, 0].map((i, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setIndex(index);
                  }}
                  style={[
                    styles.datePickerWrapper,
                    index === selectedIndex && styles.selectedDayBackground,
                  ]}
                >
                  <View style={[styles.dayHeaderContainer]}>
                    <Text
                      style={[
                        styles.day,
                        index === selectedIndex
                          ? styles.selectedDayText
                          : styles.unSelectedDayText,
                      ]}
                    >
                      {getWeekDays(selectedDate)[index].dayOfWeek}
                    </Text>
                  </View>
                  <View style={styles.headerContainer}>
                    <View style={[styles.dayHeaderContainer]}>
                      <View>
                        <Text
                          style={[
                            styles.month,
                            index === selectedIndex
                              ? styles.selectedDayText
                              : styles.unSelectedDayText,
                          ]}
                        >
                          {getWeekDays(selectedDate)[index].monthAbbrev}
                        </Text>
                        <Text
                          style={[
                            styles.date,
                            index === selectedIndex
                              ? styles.selectedDayText
                              : styles.unSelectedDayText,
                          ]}
                        >
                          {getWeekDays(selectedDate)[index].date}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              onPress={handleNextWeek}
              style={[
                styles.navigationButton,
                { backgroundColor: C.colors.primary.color2 },
              ]}
            >
              <Image
                style={[styles.navigationIcon]}
                source={pngImages.forwardIcon}
                alt="Back"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => showCalendar()}
              style={[
                styles.navigationButton,
                { backgroundColor: C.colors.primary.color2 },
              ]}
            >
              <Image
                style={[styles.calendarIcon]}
                source={pngImages.calendarIcon}
                alt="Next"
              />
            </TouchableOpacity>
          </View>
        </View>
        {selectedDateSlots.length > 0 ? (
          <View style={[styles.slotSelectorContainer]}>
            <View style={{ width: "100%" }}>
              <Text style={[styles.datePickerTitleText]}>
                {C.strings.SELECT_TIME_SLOT}
              </Text>
              <View style={styles.timeSlotsContainer}>
                <Text
                  style={{ fontWeight: "bold", color: C.colors.text.black }}
                >
                  {C.strings.TIME}
                </Text>
                <View style={styles.timeSlotWrapper}>
                  {selectedDateSlots?.map((x, i) => {
                    return (
                      <TimeSlotChip
                        key={i}
                        currentSlotObj={selectedSlotObj}
                        slotObj={x}
                        setSelectedSlotObj={(obj) => setSelectedSlotObj(obj)}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        ) : (
          <EmptySlotsWarning
            text={C.strings.NO_SLOTS_WARNING}
            imgHeight={100}
            imgWidth={100}
            containerHeight={150}
          />
        )}
        <View style={[styles.continueBtnContainer]}>
          <TouchableOpacity
            disabled={!selectedSlotObj}
            onPress={() =>
              navigation.navigate("BookingConfirm", {
                name: name,
                hours: hours,
                slot: selectedSlotObj ? selectedSlotObj : null,
              })
            }
            style={[
              styles.continueBtn,
              {
                backgroundColor: selectedSlotObj
                  ? C.colors.primary.color2
                  : C.colors.primary.primary3,
              },
            ]}
          >
            <Text style={[styles.continueBtnText]}>{C.strings.CONTINUE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CustomCalendar;
