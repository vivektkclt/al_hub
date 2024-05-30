import { Pressable, View, Text } from "react-native";
import React from "react";
import { historyStyle as style } from "../../pages/History/history.style";

const HistoryHeader = ({ props, onClick }) => {
  return (
    <View style={style.tabbar}>
      <Pressable
        style={props == 0 ? style.activetab : style.passivetab}
        onPress={() => onClick(0)}
      >
        <Text style={props == 0 ? style.activetab.text : style.passivetab.text}>
          Upcoming
        </Text>
      </Pressable>
      <Pressable
        style={props == 1 ? style.activetab : style.passivetab}
        onPress={() => onClick(1)}
      >
        <Text
          style={[props == 1 ? style.activetab.text : style.passivetab.text]}
        >
          Previous booking
        </Text>
      </Pressable>
    </View>
  );
};

export default HistoryHeader;
