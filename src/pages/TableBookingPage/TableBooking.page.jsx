import {
  View,
  Text,
  Pressable,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React from "react";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import { withHeader } from "../../hoc/withHeader";
import { useRef } from "react";
import { useState } from "react";
import TableBookingCalendarComponent from "../../components/TableBookingCalander/TableBooking.Calendar.Component";
import { useNavigation, useRoute } from "@react-navigation/native";
import TableBookingTimeSlotComponent from "../../components/TableBookingTimeSlot/TableBooking.TimeSlot";
import GuestCountSelectComponent from "../../components/GuestCountSelect/GuestCountSelect";
import { tableBookingStyles as styles } from "./tableBooking.styles";
import EmptyComponent from "../../components/NoDataContainer/EmptyComponent.component";
import useTableSlotStatus from "../../hooks/useTableSlotStatus";
import { useEffect } from "react";
import strings from "../../assets/values/strings";
import EmptySlotsWarning from "../../components/EmptySlots/EmptySlotsWarning";
import { C } from "../../assets";
const HeaderComponent = () => {
  return <CustomHeader isBack hideShadow />;
};
const times = ["1"];
const BodyComponent = () => {
  const route = useRoute();
  const props = route?.params;
  const [selectedDate, setSelectedDate] = useState();
  const [err, setErr] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const guestCount = useRef(0);
  const [fromTime, setFroTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const navigation = useNavigation();

  const { slots, totalSeats, slotsAvailableDates, loading, allSlots } =
    useTableSlotStatus({
      id: props?.id,
      selectedDate: selectedDate,
    });

  const fnSetGuestCount = (data) => {
    guestCount.current = data;
    // setGuestCount(data);
    if (data !== 0) {
      setErr((prev) => {
        const { guestCount, ...rest } = prev;
        return rest;
      });
    }
  };

  /*  const validateTimeslotsWithTableTimeslots = () => {
    const ft = new Date(fromTime).toTimeString().slice(0, 8);
    const tt = new Date(toTime).toTimeString().slice(0, 8);
    const d = moment(ft, "HH:mm:ss");
    const o = moment("18:00:00", "HH:mm:ss");
    const c = moment("05:00:00", "HH:mm:ss");

    return (
      (slots[0]?.openingTime <= ft || ft <= slots[0]?.closingTime) &&
      (slots[0]?.closingTime >= tt || slots[0]?.openingTime <= tt)
    );
  };
 */
  /* const checkDiff = (nfd, ntd) => {
    const f = new Date(nfd);
    const t = new Date(ntd);
    const diffMilliseconds = Math.abs(f.valueOf() - t.valueOf());
    const diffMins = diffMilliseconds / 60000;
    console.log(diffMins > 120);
    return diffMins > 180;
  }; */
  useEffect(() => {
    const findSlots = () => {
      setAvailableSlots(
        validateSlotTables(
          slots?.filter((slot) => {
            return validateTimeGap(slot);
          })
        )
      );
    };
    findSlots();
  }, [fromTime, toTime, selectedDate]);

  const validateTimeGap = (slot) => {
    setAvailableSlots([]);
    const stringify = (date) => {
      return JSON.stringify(date);
    };

    let fd = new Date(fromTime);
    let td = new Date(toTime);
    const ft = fd.toTimeString().slice(0, 8);
    const tt = td.toTimeString().slice(0, 8);
    const fts = ft.split(":");
    const tts = tt.split(":");
    console.log(tt, ft, "to time and from time");
    let nfd =
      new Date(selectedDate).toISOString().slice(0, 10) ===
        new Date().toISOString().slice(0, 10) &&
      ft < new Date().toTimeString().slice(0, 8)
        ? new Date(
            new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)
          )
        : new Date(selectedDate);
    let ntd =
      (new Date(selectedDate).toISOString().slice(0, 10) ===
        new Date().toISOString().slice(0, 10) &&
        tt < new Date().toTimeString().slice(0, 8)) ||
      tt < ft
        ? new Date(
            new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)
          )
        : new Date(selectedDate);

    nfd.setHours(fts[0]);
    nfd.setMinutes(fts[1]);
    nfd.setSeconds(fts[2]);
    ntd.setHours(tts[0]);
    ntd.setMinutes(tts[1]);
    ntd.setSeconds(tts[2]);

    const splittedCT = slot?.closingTime.split(":");
    const splittedOT = slot?.openingTime.split(":");

    let sot = new Date(selectedDate);
    let sct =
      slot?.openingTime < slot?.closingTime
        ? new Date(selectedDate)
        : new Date(new Date().setDate(new Date(selectedDate).getDate() + 1));

    sot.setHours(splittedOT[0]);
    sot.setMinutes(splittedOT[1]);
    sot.setSeconds(splittedOT[2]);
    sct.setHours(splittedCT[0]);
    sct.setMinutes(splittedCT[1]);
    sct.setSeconds(splittedCT[2]);

    setErr((prev) => {
      const { timeSlot, ...rest } = prev;
      return rest;
    });
    console.log(
      "fromtime :",
      nfd,
      "\n",
      "store opening time :",
      sot,
      "\n",
      "to time :",
      ntd,
      "\n",
      "store closing time :",
      sct,
      "\n",
      "slot available status :",
      stringify(nfd) >= stringify(sot) &&
        stringify(nfd) < stringify(sct) &&
        stringify(ntd) > stringify(sot) &&
        stringify(ntd) <= stringify(sct)
    );
    return (
      stringify(nfd) >= stringify(sot) &&
      stringify(nfd) < stringify(sct) &&
      stringify(ntd) > stringify(sot) &&
      stringify(ntd) <= stringify(sct)
    );
  };
  const validateInputs = () => {
    let errors = {};
    if (!guestCount.current) errors.guestCount = strings.REQUIRED_WARNING;
    console.log(availableSlots, "available");
    if (!availableSlots || availableSlots?.length < 1)
      errors.timeSlot = strings.NO_SLOTS_AVAILABLE;

    setErr(errors);
    return Object.keys(errors).length === 0;
  };

  const fnSetSelectedDate = (data) => {
    setSelectedDate((prev) => {
      if (prev === data) return prev;
      return data;
    });
  };

  const fnSetFromTime = (data) => {
    setFroTime(data);
  };
  const fnSetToTime = (data) => {
    setToTime(data);
  };

  const validateSlotTables = (data) => {
    if (!data) return [];
    const d = { ...guestCount };
    const tables = data;
    const smallestOfLarger = Math.min.apply(
      Math,
      [...tables]
        .filter((x) => {
          return x?.storeTable?.seatingCapacity >= d.current;
        })
        .map((item) => item?.storeTable?.seatingCapacity)
    );
    const indexOfLargest = tables.findIndex(
      (item) => item?.storeTable?.seatingCapacity === smallestOfLarger
    );
    if (indexOfLargest !== -1) {
      let remain = [...tables];
      remain.splice(indexOfLargest, 1);
      /*  validateTimeslotsWithTableTimeslots([tables[indexOfLargest]]); */
      return [tables[indexOfLargest]];
    } else {
      let table = [...tables];
      let selectedItems = [];
      while (d.current > 0) {
        if (table.length === 0) {
          //   setAvailableSlots([]);
          return;
          /*   table.push(
            ...slots.filter((item) => {
              return !selectedItems.includes(item);
            })
          ); */
        }
        const smValue = Math.min.apply(
          Math,
          [...table]
            .filter((x) => x?.storeTable?.seatingCapacity >= d.current)
            .map((item) => item?.storeTable?.seatingCapacity)
        );
        const indexOfElement = table.findIndex(
          (item) => item?.storeTable?.seatingCapacity === smValue
        );
        if (indexOfElement !== -1) {
          selectedItems.push(table[indexOfElement]);
          table.splice(indexOfElement, 1);
          d.current -= smValue;
          /*  validateTimeslotsWithTableTimeslots(selectedItems); */
          return selectedItems;
        } else {
          const largestOfSmaller = Math.max.apply(
            Math,
            [...table]
              .filter((x) => x?.storeTable?.seatingCapacity <= d.current)
              .map((item) => item?.storeTable?.seatingCapacity)
          );
          const index = table.findIndex(
            (item) => item?.storeTable?.seatingCapacity === largestOfSmaller
          );

          selectedItems.push(table[index]);
          table.splice(index, 1);
          d.current -= largestOfSmaller;
        }
      }
      /*  validateTimeslotsWithTableTimeslots(selectedItems); */
      return selectedItems;
    }
  };

  const onSubmit = () => {
    if (!validateInputs()) return;
    navigate();
  };

  if (!times) {
    return (
      <EmptyComponent
        viewStyle={{ top: "-10%" }}
        title={"Sorry"}
        desc={"no tables are available for booking at this moment "}
      />
    );
  }

  const navigate = () => {
    navigation.navigate("TableBookingConfirmPage", {
      props: {
        noOfGuests: guestCount.current,
        date: selectedDate,
        time: { fromTime: fromTime, toTime: toTime },
        table: availableSlots,
        storeId: props?.id,
      },
    });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: C.colors.primary.color1,
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if (allSlots.length < 1) {
    return (
      <EmptyComponent
        viewStyle={{ top: "-10%" }}
        title={"Sorry"}
        desc={"no tables are available for booking at this moment "}
      />
    );
  }
  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.container]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <GuestCountSelectComponent
          set={fnSetGuestCount}
          error={err?.guestCount}
          text={guestCount.current}
          max={totalSeats}
        />
        <TableBookingCalendarComponent
          selectedDate={selectedDate}
          set={fnSetSelectedDate}
          slotsAvailableDates={slotsAvailableDates}
        />
        {slots?.length > 0 ? (
          <TableBookingTimeSlotComponent
            setFrom={fnSetFromTime}
            setTo={fnSetToTime}
            error={err?.timeSlot}
            times={slots}
          />
        ) : (
          <EmptySlotsWarning
            text={C.strings.NO_TABLES_WARNING}
            imgHeight={100}
            imgWidth={100}
            containerHeight={150}
          />
        )}

        <View style={[styles.btnContainer]}>
          <View style={[styles.btnBox]}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.btn, styles.cancelBtn]}
            >
              <Text style={{ color: C.colors.text.black }}>
                {C.strings.CANCEL}
              </Text>
            </Pressable>
            <Pressable
              disabled={!(slots?.length > 0)}
              onPress={onSubmit}
              style={[
                styles.btn,
                {
                  backgroundColor: !(slots?.length > 0)
                    ? C.colors.primary.primary3
                    : C.colors.primary.color2,
                },
              ]}
            >
              <Text
                style={{
                  color: C.colors.text.color1,
                  textTransform: "capitalize",
                }}
              >
                {C.strings.CONTINUE}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const TableBookingPage = withHeader({
  HeaderComponent,
  BodyComponent,
});
export default TableBookingPage;
