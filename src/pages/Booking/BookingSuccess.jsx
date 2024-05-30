import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useLazyQuery } from "@apollo/client";
import { bookingStyles as styles } from "./Booking.style";
import CalendarComponent from "../../components/Calendar/Calendar";
import { useEffect } from "react";
import getSlotsByStoreId from "../../graphql/queries/getSlotsByStore";
import { useState } from "react";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import { withHeader } from "../../hoc/withHeader";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import EmptyComponent from "../../components/NoDataContainer/EmptyComponent.component";
import { C } from "../../assets";

const HeaderComponent = () => (
  <CustomHeader
    isBack
    backgroundColor={C.colors.primary.color1}
    title={"Back"}
  />
);

const BodyComponent = () => {
  const route = useRoute();
  const [slots, setSlots] = useState([]);
  const { name, hours, id } = route.params;

  const [isFiltering, setIsFiltering] = useState(false);
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const [onGetSlotsByStoreId, { loading }] = useLazyQuery(getSlotsByStoreId, {
    fetchPolicy: "network-only",
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    variables: {
      storeId: id,
    },
    onError: (e) => {
      console.log(e.message);
    },
    onCompleted: (data) => {
      console.log(data, "slots by store");
      const arr = data?.SlotsByStoreId.filter((x, i) => {
        if (x.slotStatus == "available") {
          if (
            JSON.stringify(x.date.slice(0, 10)) ===
            JSON.stringify(new Date().toISOString().slice(0, 10))
          ) {
            return (
              JSON.stringify(x.timeSlots) >
              JSON.stringify(new Date().toTimeString().slice(0, 8))
            );
          } else if (
            JSON.stringify(x.date.slice(0, 10)) >
            JSON.stringify(new Date().toISOString().slice(0, 10))
          ) {
            return true;
          }
        } else {
          return false;
        }
      });
      setSlots(() => []);
      setSlots((prev) => [...prev, ...arr]);
      setIsFiltering(false);
    },
  });
  useEffect(() => {
    onGetSlotsByStoreId();
  }, []);
  if (isFiltering || loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: C.colors.primary.color1,
        }}
      >
        <ActivityIndicator size={"large"} color={C.colors.primary.color2} />
      </View>
    );
  }
  if (slots.length < 1) {
    return (
      <>
        <EmptyComponent
          viewStyle={{ top: "-10%" }}
          title={"Sorry"}
          desc={C.strings.NO_SLOTS_WARNING}
        />
      </>
    );
  }
  return (
    <>
      <CalendarComponent name={name} slots={slots} hours={hours} />
    </>
  );
};

export default BookingSuccess = withHeader({ HeaderComponent, BodyComponent });
