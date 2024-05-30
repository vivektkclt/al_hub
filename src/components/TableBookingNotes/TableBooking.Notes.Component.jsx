import { View, Text, TextInput } from "react-native";
import React from "react";
import { useState } from "react";
import EmptyInputWarningComponent from "../EmptyInputWarning/EmptyInputWarning.Component";
import { C } from "../../assets";

const TableBookingNotesComponent = ({ set, error, onFocus }) => {
  const [text, setText] = useState();
  const setData = (data) => {
    setText(data);
    set(data);
  };
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        marginTop: 20,
        borderRadius: 10,
        minHeight: 250,
        width: "95%",
        alignSelf: "center",
        backgroundColor: C.colors.primary.color1,
        elevation: 3,
        shadowColor: "#4169E1",
        shadowRadius: 3,
        shadowOpacity: 0.4,
        borderBottomWidth: 0.2,
        borderColor: C.colors.border.dark,
        shadowOffset: { width: 1, height: 1 },
      }}
    >
      <Text
        style={{ fontWeight: "bold", fontSize: 16, color: C.colors.text.black }}
      >
        Reservation Notes
      </Text>
      <TextInput
        onFocus={onFocus}
        value={text}
        onChangeText={setData}
        multiline
        verticalAlign="top"
        textAlignVertical="top"
        style={{
          borderWidth: 0.3,
          flex: 1,
          borderRadius: 10,
          padding: 10,
          marginTop: 10,
          borderColor: "#B5B5B5",
        }}
      />
      {error && (
        <EmptyInputWarningComponent warning={error} top={220} left={30} />
      )}
    </View>
  );
};

export default TableBookingNotesComponent;
