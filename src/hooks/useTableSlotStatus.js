import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { useSelector } from "react-redux";
import { getAllTableByStoreId } from "../graphql/queries/getAllTableByStoreId";

const useTableSlotStatus = ({ selectedDate, id }) => {
  const today = new Date().toISOString().slice(0, 10);
  const [allSlots, setAllSlots] = useState([]);
  const [slots, setSlots] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);
  const [slotsAvailableDates, setSlotsAvailableDates] = useState([]);
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const { loading, data } = useQuery(getAllTableByStoreId, {
    fetchPolicy: "cache-and-network",
    context,
    variables: {
      storeId: id,
    },
    onCompleted: () => {
      setAllSlots(data?.TableSlotByStore);
      console.log(data?.TableSlotByStore, "all tables");
    },
  });
  console.log(id, "all tables", slots, "slots in day");
  useEffect(() => {
    const fetch = () => {
      setSlotsAvailableDates([
        ...new Set(
          data?.TableSlotByStore?.filter((data) => {
            return data?.date >= today && data.slotStatus === "available";
          }).map((item) => item?.date)
        ),
      ]);
    };
    fetch();
  }, [data]);
  console.log(slotsAvailableDates);
  useEffect(() => {
    const fetch = () => {
      setSlots(
        data?.TableSlotByStore?.filter(
          (data) =>
            data?.date === selectedDate && data.slotStatus === "available"
        )
      );
    };
    fetch();
  }, [selectedDate, data]);
  useEffect(() => {
    setTotalSeats(0);
    if (slots && slots.length > 0) {
      slots.map((slot) => {
        setTotalSeats((prev) => {
          return prev + slot?.storeTable?.seatingCapacity;
        });
      });
    }
  }, [slots]);

  return { slots, totalSeats, slotsAvailableDates, loading, allSlots };
};

export default useTableSlotStatus;
