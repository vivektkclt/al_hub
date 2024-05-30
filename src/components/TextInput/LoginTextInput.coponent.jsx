import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { C } from "../../assets";

const LoginTextInput = ({ keyboardType = "numeric" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Mobile</Text>
      <View style={{ flexDirection: "row", top: -12 }}>
        <View
          style={{
            width: "25%",
            justifyContent: "center",
            alignItems: "center",
            borderRightWidth: 1,
            borderColor: C.colors.border.grey,
          }}
        >
          <Text>+971</Text>
        </View>
        <View style={{ width: "75%", paddingLeft: "5%" }}>
          <TextInput
            keyboardType={keyboardType}
            style={{ width: "92%", height: 30, fontSize: 18 }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "6.5%",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: "18%",
  },
  labelText: {
    width: "20%",
    height: "45%",
    backgroundColor: "white",
    textAlign: "center",
    left: "6%",
    top: -12,
  },
});
export default LoginTextInput;
