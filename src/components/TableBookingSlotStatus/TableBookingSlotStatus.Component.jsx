import { View, Text, Modal, Pressable } from "react-native";
import React from "react";
import { useState } from "react";
import TableSelectComponent from "../TableBookingTableSelectComponent/TableSelectComponent";
import { C } from "../../assets";

const TableBookingSlotStatusComponent = ({
  slots,
  totalSeats,
  selectedTables,
  set,
}) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const setSelectedTables = (data) => {
    set(data);
    hideModal();
  };
  return (
    <>
      {/*   <Modal
        children={
          <TableSelectComponent
            slots={slots}
            selectedTables={selectedTables}
            close={hideModal}
            set={setSelectedTables}
          />
        }
        transparent
        statusBarTranslucent
        visible={visible}
        onRequestClose={hideModal}
      /> */}
      <View
        style={{
          width: "100%",
          height: 60,
          padding: 10,
          borderWidth: 0.4,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: C.colors.text.black,
          }}
        >
          Seats Available :
        </Text>
        <Text
          style={{
            marginLeft: 5,
            fontSize: 18,
            fontWeight: "bold",
            color: totalSeats === 0 ? C.colors.text.black : "#B57769",
          }}
        >
          {totalSeats}
        </Text>
        {/*  <View style={{ flexGrow: 1, alignItems: "flex-end" }}>
          <Pressable
            style={{
              width: 100,
              height: 25,
              borderWidth: 1,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#B57769",
            }}
            onPress={showModal}
          >
            <Text style={{ color: "white", lineHeight: 16 }}>select table</Text>
          </Pressable>
        </View> */}
      </View>
    </>
  );
};

export default TableBookingSlotStatusComponent;
