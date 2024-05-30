import React from "react";
import Modal from "react-native-modal";
import {
  Platform,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

const ModalComponent = ({ modalState, onModalDismiss, children }) => (
  <Modal
    isVisible={modalState}
    style={styles.bottomModal}
    onBackButtonPress={onModalDismiss}
  >
    <KeyboardAvoidingView
      style={styles.feedBackStyle}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable onPress={onModalDismiss} style={styles.feedBackStyle}>
        <Pressable onPress={() => {}}>{children}</Pressable>
      </Pressable>
    </KeyboardAvoidingView>
  </Modal>
);

export default ModalComponent;

const styles = StyleSheet.create({
  bottomModal: {
    margin: 0,
  },
  feedBackStyle: {
    flex: 1,
    justifyContent: "flex-end",
    zIndex: -10,
  },
});
