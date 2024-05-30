import { View, Text, Pressable } from "react-native";
import React from "react";
import { useState } from "react";

const TableSelectComponent = ({ slots, set, close, selectedTables }) => {
  const [selected, setSelected] = useState([...selectedTables]);

  const select = (data) => {
    setSelected((prev) => {
      if (prev.includes(data)) {
        return prev.filter((item) => item != data);
      } else {
        return [...prev, data];
      }
    });
  };
  const cancel = () => {
    close();
  };

  const fnConfrimSelection = () => {
    set(selected);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,.3)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ height: "70%", width: "90%", backgroundColor: "white" }}>
        <View
          style={{
            width: "100%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Available tables
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {slots.map((item, i) => {
            return (
              <Pressable
                key={i}
                onPress={() => select(item)}
                style={{
                  minWidth: 140,
                  padding: 10,
                  borderWidth: 1,
                  maxHeight: 200,
                  backgroundColor: selected.includes(item)
                    ? "#B57769"
                    : "white",
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <View style={{ marginTop: 5, alignItems: "center" }}>
                  <Text
                    style={{
                      color: selected.includes(item) ? "white" : "black",
                    }}
                  >
                    opening time
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selected.includes(item) ? "white" : "black",
                      marginTop: 2,
                    }}
                  >
                    {item?.openingTime}
                  </Text>
                </View>
                <View style={{ marginTop: 5, alignItems: "center" }}>
                  <Text
                    style={{
                      color: selected.includes(item) ? "white" : "black",
                    }}
                  >
                    closing time
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selected.includes(item) ? "white" : "black",
                      marginTop: 2,
                    }}
                  >
                    {item?.closingTime}
                  </Text>
                </View>
                <View style={{ marginTop: 5, alignItems: "center" }}>
                  <Text
                    style={{
                      color: selected.includes(item) ? "white" : "black",
                    }}
                  >
                    number of seats
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selected.includes(item) ? "white" : "black",
                      marginTop: 2,
                    }}
                  >
                    {item?.storeTable?.seatingCapacity}
                  </Text>
                </View>
                <View style={{ marginTop: 5, alignItems: "center" }}>
                  <Text
                    style={{
                      color: selected.includes(item) ? "white" : "black",
                    }}
                  >
                    table number
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: selected.includes(item) ? "white" : "black",
                      marginTop: 2,
                    }}
                  >
                    {item?.storeTable?.tableNumber}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: 100,
        }}
      >
        <View
          style={{
            width: "60%",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Pressable
            onPress={cancel}
            style={{
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 5,
              width: 90,
            }}
          >
            <Text style={{ color: "white" }}>cancel</Text>
          </Pressable>
          <Pressable
            onPress={fnConfrimSelection}
            style={{
              height: 35,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 5,
              width: 90,
            }}
          >
            <Text>done</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TableSelectComponent;
