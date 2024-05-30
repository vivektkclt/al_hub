import { View, Text, Pressable } from "react-native";
import React from "react";
import { DateChipStyles as styles } from "./DateChip.styles";

const DateChip = ({ date, selectedDate, onClick }) => {
  const day = new Date(date);

  return (
    <Pressable
      onPress={() => onClick(date)}
      style={[
        styles.chipContainer,
        date === selectedDate ? styles.selected : styles.notSelected,
      ]}
    >
      <View style={[styles.dateContainer]}>
        <Text
          style={[
            styles.date,
            date === selectedDate
              ? styles.selected.text
              : styles.notSelected.text,
          ]}
        >
          {day.toLocaleString("default", { day: "2-digit" })}
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={[
            styles.month,
            date === selectedDate
              ? styles.selected.text
              : styles.notSelected.text,
          ]}
        >
          {day.toLocaleString("default", { month: "short" })}
        </Text>
        <Text
          style={[
            styles.year,
            date === selectedDate
              ? styles.selected.text
              : styles.notSelected.text,
          ]}
        >
          {day.toLocaleString("default", { year: "2-digit" })}
        </Text>
      </View>
    </Pressable>
  );
};

export default DateChip;
