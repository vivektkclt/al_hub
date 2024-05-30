import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import React from "react";
import { useState } from "react";
import EmptyInputWarningComponent from "../EmptyInputWarning/EmptyInputWarning.Component";
import { TBSpecialNotesStyles as styles } from "./TableBooking.SpecialNotes.Styles";

const TableBookingSpecialNotes = ({ set, error, title, onFocus }) => {
  const maxLength = 50;
  const [text, setText] = useState("");
  const setData = (data) => {
    setText((prev) => {
      if (prev.length > maxLength) {
        return prev;
      } else {
        set(data);
        return data;
      }
    });
  };
  return (
    <View style={[styles.container]}>
      <Text style={[styles.heading]}>{title}</Text>
      <View style={{ flexDirection: "row", marginTop: 10, flexWrap: "wrap" }}>
        <TextInput
          onFocus={onFocus}
          value={text}
          onChangeText={setData}
          multiline
          verticalAlign="top"
          textAlignVertical="top"
          style={[styles.inputField]}
        />
      </View>
      {error && (
        <EmptyInputWarningComponent warning={error} top={80} left={20} />
      )}
    </View>
  );
};

export default TableBookingSpecialNotes;
