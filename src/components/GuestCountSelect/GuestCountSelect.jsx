import { View, Text, TextInput, Pressable, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { GuestCountStyleSheet as styles } from "./GuestCount.Styles";
import EmptyInptyWarning from "../EmptyInputWarning/EmptyInputWarning.Component";
import pngImages from "../../assets/images/png";
import { C } from "../../assets";
const GuestCountSelectComponent = ({ onFocus, set, error, max }) => {
  const textInputRef = useRef(null);
  const decrimentButtonRef = useRef(null);
  const incrementButtonRef = useRef(null);
  const [text, setText] = useState("0");
  const [showWarning, setShowWarning] = useState(false);
  const validateNumber = (input) => {
    const regex = /^[0-9]+$/;
    return regex.test(input);
  };

  const changeText = (data) => {
    if (!data) {
      set(0);
      setText("0");
      setShowWarning(false);
    }
    if (Number(data) > max) {
      console.log(Number(data), "daa");
      setShowWarning(false);
      set(max);
      setText(String(max));
      return;
    }
    if (!validateNumber(data)) return;
    setShowWarning(false);
    set(Number(data));
    setText(Number(data).toString());
  };

  const increment = () => {
    setText((prev) => {
      if (prev >= max) {
        setShowWarning(true);
        return String(max);
      }
      const p = Number(prev);
      set(p + 1);
      return String(p + 1);
    });
  };

  const decrement = () => {
    setText((prev) => {
      if (prev <= "0") {
        setText("0");
        return prev;
      }
      const p = Number(prev);
      set(p - 1);
      setShowWarning(false);
      return String(p - 1);
    });
  };

  const _onLayout = (e) => {
    console.log(e.nativeEvent.layout);
  };

  return (
    <View style={[styles.container]}>
      <View>
        <Text style={[styles.heading]}>Guests</Text>
      </View>
      <View style={[styles.counterContainer]}>
        <Pressable
          ref={decrimentButtonRef}
          onPress={decrement}
          style={[styles.btn]}
        >
          <Image
            source={pngImages.backWordIcon}
            style={[styles.arrow, styles.leftArrow]}
          />
        </Pressable>
        <TextInput
          onFocus={onFocus}
          ref={textInputRef}
          inputMode="numeric"
          keyboardType="numeric"
          style={[styles.textInput]}
          onChangeText={changeText}
          value={text}
        />
        <Pressable
          ref={incrementButtonRef}
          onPress={increment}
          style={[styles.btn]}
          onLayout={_onLayout}
        >
          <Image source={pngImages.forwardIcon} style={[styles.arrow]} />
          {showWarning && (
            <View
              pointerEvents="none"
              style={[styles.maxCountWarningContainer]}
            >
              <View style={[styles.maxCountWrapper]} />

              <View style={[styles.maxCountWarningBox]}>
                <View style={[styles.textContainer]}>
                  <Text style={[styles.i]}>i</Text>
                </View>
                <Text style={[styles.warning]}>
                  {C.strings.MAX_SLOTS_SELECTED}
                </Text>
              </View>
            </View>
          )}
        </Pressable>
      </View>
      {error && <EmptyInptyWarning warning={error} top={42} left={0} />}
    </View>
  );
};

export default GuestCountSelectComponent;
