import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  Image,
  Modal,
} from "react-native";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import { bookingConfirmStyle as styles } from "./BookingConfirm.stye";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextInput } from "react-native";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import { withHeader } from "../../hoc/withHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CountryPicker } from "react-native-country-codes-picker";
import axios from "axios";
import MobileOTPVerificationComponent from "../../components/Modals/MobileOTPVerification.Component";

import { C } from "../../assets";
import bookASlot from "../../graphql/mutations/bookASlot";

const HeaderComponent = () => (
  <CustomHeader isBack backgroundColor={C.colors.primary.color1} />
);

const BodyComponent = () => {
  const route = useRoute();
  const slot = route.params?.slot?.id;
  const [date, setDate] = useState("");
  const fullDate = new Date(route.params?.slot?.date);
  const [thirduser, setthirduser] = useState("myself");
  const [reason, setreason] = useState("");
  const [notes, setnotes] = useState("");
  const [time, setTime] = useState("");
  const [close, setClose] = useState("");
  const [err, setErr] = useState({});
  const apiUrl = "https://api.store.al-hub.com/graphql";
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const [showOTPVerifyModal, setShowOTPVerityModal] = useState(false);

  const {
    user: { email: userEmail, firstName, lastName, contact },
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const [phone, setPhone] = useState(contact);

  const fullName = firstName + " " + lastName;
  const weekDayObj = {
    5: "friday",
    6: "saturday",
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
  };
  const validatePhoneNumber = (input) => {
    return Number(input.replace("+", ""));
  };
  const validate = () => {
    let errors = {};

    if (!phone) errors.phone = " * this field is required";
    if (!reason) errors.reason = " * this field is required";
    if (!notes) errors.notes = " * this field is required";
    if (thirduser !== "myself" && !thirduser)
      errors.thirduser = " * this field is required";
    setErr(errors);
    console.log(Object.keys(errors).length === 0);
    return Object.keys(errors).length === 0;
  };

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const mutation = ` mutation {
    BookASlot( slotBookingInput: {
      bookingDate: "${fullDate}",
      bookingFor: "${thirduser.replace(/\s+/g, " ")}",
      clinicSlotId:  ${slot},
      email: "${userEmail}",
      fullName: "${fullName}",
      phoneNumber: ${validatePhoneNumber(phone)},
      notes: "${notes.replace(/\s+/g, " ")}",
      reasonForVisit: "${reason.replace(/\s+/g, " ")}",
  } ) {
        id
        bookingFor
        userId
        phoneNumber
        fullName
        notes
        reasonForVisit
        status
        clinicSlots {
          timeSlots
          date
        }
    }
  }`;

  /*const [BookASlot, { loading }] = useMutation(bookASlot, {
    context,
    fetchPolicy: "network-only",
    variables: {
      slotBookingInput: {
        bookingDate: fullDate,
        bookingFor: thirduser.replace(/\s+/g, " "),
        clinicSlotId: slot,
        email: userEmail,
        fullName: fullName,
        phoneNumber: validatePhoneNumber(phone),
        notes: notes.replace(/\s+/g, " "),
        reasonForVisit: reason.replace(/\s+/g, " "),
      },
    },
    onCompleted: (response) => {
      console.log(response);
    },
    onError: (err) => {
      console.error(err);
    },
  });
  console.log(
    typeof fullDate,
    typeof thirduser.replace(/\s+/g, " "),
    typeof slot,
    typeof userEmail,
    typeof fullName,
    typeof parseFloat(validatePhoneNumber(phone)),
    typeof notes.replace(/\s+/g, " "),
    typeof reason.replace(/\s+/g, " ")
  );*/
  const onSubmit = async () => {
    if (!validate()) return;
    axios
      .post(apiUrl, { query: mutation }, context)
      .then((response) => {
        response.status === 200
          ? end(response.data?.data?.BookASlot)
          : setOpenErrModal(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const end = (data) => {
    navigation.navigate("BookingStatus", {
      props: { storeId: route.params?.slot?.storeId, data: data },
    });
  };

  useEffect(() => {
    const dateObj = new Date(route.params?.slot?.date);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const dayInWeek = weekDayObj[dateObj.getDay()];
    const closingTime = hours[dayInWeek]?.closingTime;
    if (closingTime) {
      setClose(closingTime);
    }
    const formattedDate = dateObj
      .toLocaleDateString("en-US", options)
      ?.slice(0, 6);

    setDate(formattedDate);
    setTime(route.params?.slot?.timeSlots?.slice(0, 5));
  }, []);
  const { hours } = route.params;

  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMjMiLCJlbWFpbCI6ImNvZGUucmFrZXNoa3Jpc2huYW5AZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDM1Njk3ODEsImV4cCI6MTcwNDQzMzc4MX0.swdQR9tE_BTYlFA4Q-0MdC7XgR1GyhMFs3PfKdYEqR8"
  const showModal = () => {
    setShowOTPVerityModal(true);
  };
  const hideModal = () => {
    setShowOTPVerityModal(false);
  };
  const onChangePhone = (text) => {
    setPhone(text);
  };
  return (
    <>
      <Modal
        children={
          <MobileOTPVerificationComponent
            onVerified={(data) => {
              onChangePhone(data);
              hideModal();
            }}
            onClose={hideModal}
          />
        }
        visible={showOTPVerifyModal}
        onRequestClose={hideModal}
        collapsable
        transparent
        statusBarTranslucent
        animationType="slide"
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          alignItems: "center",

          backgroundColor: C.colors.primary.color1,
        }}
      >
        <KeyboardAvoidingView
          contentContainerStyle={[styles.keyboardAvoidingViewContent]}
          style={[styles.keyboardAvoidingView]}
        >
          <View style={[styles.containerContainer]}>
            <View style={[styles.container]}>
              <View style={styles.componentContainer}>
                <Text style={styles.Heading}>
                  {C.strings.REASON_FOR_BOOKING}
                </Text>
                <View
                  style={[
                    styles.MultiLineText,
                    err.reason
                      ? styles.multiLineTextErr
                      : styles.multiLineTextNoramal,
                  ]}
                >
                  <TextInput
                    onChange={() => setErr((prev) => ({ ...prev, reason: "" }))}
                    value={reason}
                    onChangeText={setreason}
                    placeholder="type here..."
                    multiline={true}
                    style={{
                      flex: 1,
                      textAlignVertical: "top",
                      color: C.colors.text.black,
                    }}
                  />
                  <Text style={[styles.errTextStyle]}>{err.reason}</Text>
                </View>
              </View>
              <View style={[styles.componentContainer]}>
                <Text style={styles.Heading}>{C.strings.PHONE_NUMBER}</Text>
                <Pressable
                  //  pointerEvents={contact ? "none" : "auto"}
                  onPress={showModal}
                  style={{ marginTop: 10, width: "70%" }}
                >
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        width: "100%",
                        paddingBottom: 5,
                      },
                      styles.singleLineTextNor,
                    ]}
                  >
                    {phone}
                  </Text>
                </Pressable>
                <Text style={[styles.errTextStyle]}>{err.phone}</Text>
              </View>
              <View style={styles.componentContainer}>
                <Text style={styles.Heading}>
                  Are you booking for yourself ?{" "}
                </Text>
                <View style={[styles.radioButtonCard]}>
                  <View style={[styles.radioBtnContainer]}>
                    <View
                      style={{
                        flexDirection: "row",
                        rowGap: 10,
                      }}
                    >
                      <Text>Yes </Text>
                      <TouchableOpacity
                        style={[styles.radio]}
                        onPress={() => setthirduser("myself")}
                      >
                        <View
                          style={[
                            {
                              backgroundColor:
                                thirduser == "myself"
                                  ? C.colors.primary.color2
                                  : "transparent",
                            },
                            styles.radioFillCom,
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      <Text>No </Text>
                      <TouchableOpacity
                        style={[styles.radio]}
                        onPress={() => setthirduser("")}
                      >
                        <View
                          style={[
                            {
                              backgroundColor:
                                thirduser != "myself"
                                  ? C.colors.primary.color2
                                  : "transparent",
                            },
                            styles.radioFillCom,
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {thirduser != "myself" && (
                  <View
                    style={[
                      styles.textInput,
                      err.thirduser
                        ? styles.singleLineTextErr
                        : styles.singleLineTextNor,
                    ]}
                  >
                    <TextInput
                      onChange={() =>
                        setErr((prev) => ({ ...prev, thirduser: "" }))
                      }
                      style={{
                        flex: 1,
                        fontSize: 16,
                      }}
                      value={thirduser}
                      placeholder="name of the person you are booking for"
                      keyboardType="default"
                      onChangeText={setthirduser}
                    />
                    <Text style={[styles.errTextStyle]}>{err.thirduser}</Text>
                  </View>
                )}
              </View>
              <View style={styles.componentContainer}>
                <Text style={styles.Heading}>{C.strings.NOTES}</Text>
                <View
                  style={[
                    styles.MultiLineText,
                    err.notes
                      ? styles.multiLineTextErr
                      : styles.multiLineTextNoramal,
                  ]}
                >
                  <TextInput
                    onChange={() => setErr((prev) => ({ ...prev, notes: "" }))}
                    style={{ flex: 1, textAlignVertical: "top" }}
                    value={notes}
                    placeholder="type here..."
                    onChangeText={setnotes}
                    multiline={true}
                  />
                  <Text style={[styles.errTextStyle]}>{err.notes}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={onSubmit}
            >
              <Text
                style={{
                  color: C.colors.text.color1,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {C.strings.CONFIRM}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default BookingConfirm = withHeader({ HeaderComponent, BodyComponent });
