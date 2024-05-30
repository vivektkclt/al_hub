import { C } from "../../assets";
import React, { forwardRef } from "react";
import { SearchIcon, VoiceIcon } from "../../assets/images";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import pngImages from "../../assets/images/png";

const iconDimensions = {
  width: 10,
  height: 10,
};

const SeacrhContainer = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    onSubmit,
    placeholder,
    containerStyle,
    hideIcon,
    isClose = true,
  } = props;
  return (
    <View style={[containerStyle, styles.rowView]}>
      <TouchableOpacity disabled style={styles.btn}>
        <SearchIcon {...iconDimensions} />
      </TouchableOpacity>
      <TextInput
        ref={ref}
        blurOnSubmit
        value={value}
        onBlur={onSubmit}
        autoCorrect={false}
        returnKeyType={"done"}
        autoCapitalize={"none"}
        onChangeText={onChange}
        allowFontScaling={false}
        placeholder={placeholder}
        style={styles.inputStyle}
        onSubmitEditing={onSubmit}
        placeholderTextColor={C.colors.text.dark}
      />
      {hideIcon ? null : (
        <TouchableOpacity onPress={() => onChange("")} style={styles.btn}>
          <Image
            style={{ height: 12, width: 12 }}
            source={pngImages.closeBtn}
          />
          {/* <VoiceIcon {...iconDimensions} /> */}
        </TouchableOpacity>
      )}
    </View>
  );
});

export default SeacrhContainer;

const styles = StyleSheet.create({
  inputStyle: {
    flex: 8,
    fontSize: 14,
    height: "100%",
    paddingLeft: 5,
    color: C.colors.text.dark,
  },
  btn: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  rowView: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: C.measures.BORDER_RADIUS,
    backgroundColor: C.colors.primary.color1,
  },
});
