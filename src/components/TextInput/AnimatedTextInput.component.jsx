import { C } from "../../assets";
import React, { useEffect, useRef } from "react";
import { Text, Animated, TextInput, Pressable, StyleSheet } from "react-native";

const AnimatedTextInput = ({
  value,
  styleObj,
  isEditable,
  placeholder,
  onChangeText,
  keyboardType,
  returnKeyType,
}) => {
  const inputRef = useRef(null);
  const moveText = useRef(new Animated.Value(0)).current;

  const onFocusHandler = () => {
    moveTextTop();
  };

  const onBlurHandler = () => {
    if (value === "") {
      moveTextBottom();
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  useEffect(() => {
    if (value !== "") {
      onFocusHandler();
    }
  });

  return (
    <Pressable disabled={!isEditable} style={styleObj} onPress={onFocusHandler}>
      <Animated.View style={[styles.animatedContainer, animStyle]}>
        <Text
          style={[
            styles.textStyle,
            {
              // marginTop: styleObj?.height / 8,
            },
          ]}
        >
          {placeholder}
        </Text>
      </Animated.View>
      <TextInput
        blurOnSubmit
        value={value}
        ref={inputRef}
        editable={isEditable}
        onBlur={onBlurHandler}
        autoCapitalize={"none"}
        onFocus={onFocusHandler}
        allowFontScaling={false}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        style={[styles.textInputStyle, styleObj]}
      />
    </Pressable>
  );
};

export default AnimatedTextInput;

const styles = StyleSheet.create({
  animatedContainer: {
    top: 5,
    left: 20,
    zIndex: 10000,
    borderRadius: 90,
    position: "absolute",
  },
  textStyle: {
    zIndex: -1,
    fontSize: 14,
    borderRadius: 60,
    alignSelf: "center",
    backgroundColor: C.colors.primary.color1,
    color: C.colors.text.black,
  },
  textInputStyle: {
    zIndex: 0,
    fontSize: 15,
    width: "100%",
    borderWidth: 1,
    paddingLeft: 22,
    color: C.colors.border.dark,
  },
});
