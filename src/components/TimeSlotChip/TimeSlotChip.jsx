import { Text, Pressable, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { calendarStyles as styles } from "../Calendar/Calendar.style";
import Animated, {
  Extrapolation,
  ReduceMotion,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const TimeSlotChip = ({
  slotObj,
  currentSlotObj,
  setSelectedSlotObj,
  scaleTo = 0.97,
}) => {
  const [slot, setSlot] = useState(slotObj);
  const AniPressable = Animated.createAnimatedComponent(Pressable);
  const SpringConfig = {
    mass: 1,
    damping: 10,
    stiffness: 100,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
  };
  useEffect(() => {
    setSlot(slotObj);
  }, [slotObj]);

  const convertToNormalTime = () => {
    var hour = Number({ ...slot }?.timeSlots.slice(0, 2));
    const minutes = { ...slot }?.timeSlots.slice(2, 5);
    var ext = "";
    if (hour > 12) {
      hour = hour - 12;
      ext = "PM";
    } else if (hour < 12) {
      ext = "AM";
    } else if (hour === 12) {
      ext = "PM";
    }
    if (hour === 0 || hour - 12 === 12) {
      ext = "PM";
    }
    return `${hour.toString().length < 2 ? 0 : ""}${hour}${minutes} ${ext}`;
  };
  const pressed = useSharedValue(false);
  const progress = useDerivedValue(() => {
    return pressed.value
      ? withSpring(1, SpringConfig)
      : withSpring(0, SpringConfig);
  });

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, scaleTo],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <AniPressable
      onTouchStart={() => {
        pressed.value = true;
      }}
      onTouchEnd={() => {
        pressed.value = false;
      }}
      onPress={() => {
        if (JSON.stringify(slot) !== JSON.stringify(currentSlotObj)) {
          setSelectedSlotObj(slot);
        } else if (JSON.stringify(slot) === JSON.stringify(currentSlotObj)) {
          setSelectedSlotObj(null);
        }
      }}
      style={[
        styles.timeSlot,
        slot === currentSlotObj
          ? styles.timeSlotSelected
          : styles.timeSlotUnSelected,
        animatedStyle,
      ]}
    >
      <Text
        style={[
          {
            color:
              slot === currentSlotObj
                ? styles.timeSlotSelected.color
                : styles.timeSlotUnSelected.color,
            textAlign: "center",
          },
        ]}
      >
        {convertToNormalTime()}
      </Text>
    </AniPressable>
  );
};

export default TimeSlotChip;
