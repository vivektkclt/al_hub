import React, { useState, useEffect } from "react";
import { Modal, View, Text, Button, Pressable } from "react-native";

import { C } from "../../assets";
import { alertStyles as styles } from "./alertStyles";
import { commonStyles } from "../../styles";

const AlertModal = ({
  isVisible,
  title = "Cancel",
  message,
  onCancel,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "OK",
}) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View style={[styles.container]}>
        <View style={[styles.wrapper]}>
          <View style={commonStyles.align.flex1}>
            <View style={[styles.titleContainer]}>
              <Text style={[styles.title]}>{title}</Text>
            </View>
            <View style={[styles.messageContainer]}>
              <Text style={[styles.message]}>{message}</Text>
            </View>
          </View>
          <View style={[styles.btnContainer]}>
            <Pressable
              onPress={onCancel}
              style={[styles.btnCommon, styles.cancelBtn]}
            >
              <Text style={[styles.textCommon, styles.cancelBtn.text]}>
                {cancelText}
              </Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              style={[styles.btnCommon, styles.confirmBnt]}
            >
              <Text style={[styles.textCommon, styles.confirmBnt.text]}>
                {confirmText}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const useAlert = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [onCancelCallback, setOnCancelCallback] = useState(() => {});
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => {});
  const [cancelText, setCancelText] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const showAlert = ({
    title,
    msg,
    onCancel = () => {},
    onConfirm = () => {},
    cancelButtonText = "Cancel",
    confirmButtonText = "OK",
  }) => {
    setMessage(msg);
    setOnCancelCallback(() => onCancel); // Wrap callbacks in a function to avoid immediate execution
    setOnConfirmCallback(() => onConfirm);
    setCancelText(cancelButtonText);
    setConfirmText(confirmButtonText);
    setIsVisible(true);
    setTitle(title);
  };

  const hideAlert = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // Clean up when the component using this hook unmounts
    return hideAlert;
  }, []);

  return {
    showAlert,
    hideAlert,
    AlertModal: (
      <AlertModal
        isVisible={isVisible}
        title={title}
        message={message}
        onCancel={() => {
          onCancelCallback(); // Execute the stored onCancel function
          hideAlert();
        }}
        onConfirm={() => {
          onConfirmCallback(); // Execute the stored onConfirm function
          hideAlert();
        }}
        cancelText={cancelText}
        confirmText={confirmText}
      />
    ),
  };
};

export default useAlert;
