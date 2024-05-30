import React from "react";
import IconCard from "../StoreIconCard/IconCard.component";
import { useNavigation } from "@react-navigation/native";

const StoreBookingcomponent = ({ data }) => {
  const navigation = useNavigation();

  if (!data?.data[0]?.isBookingNeeded) {
    return <IconCard disabled={true} height={45} text={"Book now"} />;
  }
  return (
    <>
      {data?.data[0]?.bookingType === "slot_booking" ? (
        <IconCard
          height={45}
          text={"Book a slot"}
          onIconHandler={() => {
            navigation.navigate("BookSuccess", {
              name: data?.name,
              hours: data?.hours,
              id: data?.id,
            });
          }}
        />
      ) : data?.data[0]?.bookingType === "table_booking" ? (
        <IconCard
          height={45}
          text={"Book a table"}
          onIconHandler={() => {
            navigation.navigate("TableBookingPage", {
              name: data?.name,
              hours: data?.hours,
              id: data?.id,
            });
          }}
        />
      ) : (
        <IconCard height={45} text={"Book"} />
      )}
    </>
  );
};

export default StoreBookingcomponent;
