import { View, Text, Pressable, TextInput, Platform } from "react-native";
import React from "react";
import { HidePassword, ShowPassword } from "../../assets/icon/Icon";
import StoreInfoButtonComponent from "../StoreInfoButton/StoreInfoButton.Component";
import { forwardRef } from "react";
import { useState } from "react";
import { inputFieldStyles as styles } from "./InputField.Styles";
import { commonStyles } from "../../styles";
import { C } from "../../assets";

const InputBox = forwardRef(
  (
    {
      title,
      onChangeText,
      keyboardType,
      maxLength,
      inputProps,
      inputStyles,
      placeholder,
      isPrivate = false,
      onPressIn,
      onSubmitEditing,
      autoFocus = false,
      error,
      returnKeyType,
      onFocus,
      onBlur,
      showInfoBtn = false,
      infobtnContent = "",
      blurOnSubmit = false,
      initialValue = "",
      editable = true,
      textColor = C.colors.text.black,
      containerStyles,
      titleStyle,
      placeholderTextColor = C.colors.text.black,
      showTitleIcon = false,
      TitleIcon,
      titleIconStyles,
      eyeColor = C.colors.primary.color2,
      selectionColor = C.colors.text.black,
      enableShadow = false,
      multiline = false,
      numberOfLines = 1,
      textAlign = "left",
      textAlignVertical = "auto",
      textContentType = "none",
      titleContainer,
      autoComplete = "off",
    },
    ref
  ) => {
    const [value, setValue] = useState(initialValue);
    const OS = Platform.OS;
    const fnOnChangeText = (data) => {
      setValue(data);
      onChangeText(data);
    };
    const [hideText, setHideText] = useState(isPrivate);

    const toggle = () => {
      setHideText((prev) => !prev);
    };

    const fnHideText = () => {
      if (!isPrivate || hideText) return;
      setHideText(true);
    };

    return (
      <View
        style={[
          styles.container,
          { ...containerStyles },
          enableShadow ? styles.shadow : null,
        ]}
      >
        {title && (
          <View style={[styles.deftitleContainer, { ...titleContainer }]}>
            <View style={commonStyles.align.row}>
              {showTitleIcon && (
                <View style={{ ...titleIconStyles }}>{TitleIcon}</View>
              )}
              <Text style={[styles.defTitle, { ...titleStyle }]}>{title}</Text>
            </View>
            {showInfoBtn && (
              <View style={[styles.infoBtn]}>
                <StoreInfoButtonComponent
                  btnHeight={15}
                  btnWidth={20}
                  imageHeight={10}
                  imageWidth={10}
                  text={infobtnContent}
                />
              </View>
            )}
          </View>
        )}
        <View>
          {error && <Text style={[styles.errText]}>{error}</Text>}
          <TextInput
            editable={editable}
            autoFocus={autoFocus}
            ref={ref || null}
            value={value}
            onChange={fnHideText}
            onChangeText={fnOnChangeText}
            keyboardType={keyboardType}
            inputMode=""
            onPressIn={onPressIn}
            maxLength={maxLength}
            placeholder={placeholder}
            secureTextEntry={hideText}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            onFocus={onFocus}
            onBlur={onBlur}
            blurOnSubmit={blurOnSubmit}
            placeholderTextColor={placeholderTextColor}
            {...inputProps}
            selectionColor={selectionColor}
            style={[
              {
                color: editable ? textColor : C.colors.text.faded,
              },
              { ...inputStyles },
              styles.defInput,
            ]}
            numberOfLines={numberOfLines}
            multiline={multiline}
            textAlign={textAlign}
            textAlignVertical={textAlignVertical}
            textContentType={OS === "ios" ? textContentType : undefined}
            autoComplete={OS === "android" ? autoComplete : undefined}
          />
          {isPrivate && (
            <View style={[styles.secureBtnContainer]}>
              <Pressable onPress={toggle} style={[styles.secureBtn]}>
                {hideText ? (
                  <ShowPassword strokeColor={eyeColor} />
                ) : (
                  <HidePassword strokeColor={eyeColor} />
                )}
              </Pressable>
            </View>
          )}
        </View>
      </View>
    );
  }
);

export default InputBox;
