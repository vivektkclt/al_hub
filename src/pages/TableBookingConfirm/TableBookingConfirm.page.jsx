import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  TextInput,
  ScrollView,
  Keyboard,
  Modal,
} from "react-native";
import React from "react";
import { withHeader } from "../../hoc/withHeader";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import { useState } from "react";
import { useRef } from "react";
import TableBookingNotesComponent from "../../components/TableBookingNotes/TableBooking.Notes.Component";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import bookATable from "../../graphql/mutations/bookTable";
import TableBookingSpecialNotes from "../../components/TableBookingSpecialNotes/TableBooking.SpecialNotes.Component";
import PhoneNumberInput from "../../components/PhoneNumberInput/PhoneNumberInput";
import { useEffect } from "react";
import MobileOTPVerificationComponent from "../../components/Modals/MobileOTPVerification.Component";
import { C } from "../../assets";
import Popup from "../../components/BookingCancelPopup/Popup";

const HeaderComponent = () => {
  return <CustomHeader isBack hideShadow />;
};
const BodyComponent = () => {
  const route = useRoute();
  const { props } = route.params;
  const [err, setErr] = useState({});
  const [enableKAV, setEnableKAV] = useState(false);
  const specialRequests = useRef("");
  const specialOccasions = useRef("");
  const notes = useRef("");
  const [showPopup, setShowPopup] = useState(false);
  const navigation = useNavigation();

  const {
    user: { email, firstName, lastName, contact },
    token: { access_token: token },
  } = useSelector((state) => state.user);

  const storeTableSlotId = [...props?.table?.map((item) => Number(item.id))];
  const numberOfGuests = Number(props?.noOfGuests);
  const fromTime = new Date(props?.time?.fromTime).toTimeString().slice(0, 8);
  const toTime = new Date(props?.time?.toTime).toTimeString().slice(0, 8);
  const bookingDate = String(props?.date);
  const [phone, setPhone] = useState(contact);
  const [showOTPVerifyModal, setShowOTPVerityModal] = useState(false);
  const fullName = firstName + " " + lastName;
  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const validatePhoneNumber = (input) => {
    return input.replace("+", "");
  };
  const [BookATable] = useMutation(bookATable, {
    context,
    fetchPolicy: "network-only",
    variables: {
      tableBookingInput: {
        storeTableSlotId,
        fullName,
        numberOfGuests,
        phoneNumber: Number(validatePhoneNumber(phone)),
        bookingDate,
        fromTime,
        toTime,
        email,
        specialRequest: specialRequests.current,
        specialOccasion: specialOccasions.current,
        notes: notes.current,
      },
    },
    onCompleted: () => {
      navigation.navigate("TableBookingStatus", { storeId: props?.storeId });
    },
    onError: (err) => {
      if (err?.message === "Booking already exist") {
        fnShowPopup();
      }
      console.log(err?.message);
    },
  });

  const validateInputs = () => {
    let errors = {};
    if (!phone) errors.phone = " * this field is required";
    setErr(errors);
    return Object.keys(errors).length === 0;
  };
  const onSubmit = () => {
    if (!validateInputs()) return;
    BookATable();
  };

  const setSpecialRequests = (data) => {
    specialRequests.current = data;
    err?.specialRequests &&
      setErr((prev) => {
        const { specialRequests, ...rest } = prev;
        return rest;
      });
  };
  const setSpecialOccasions = (data) => {
    specialOccasions.current = data;
    err?.specialOccasions &&
      setErr((prev) => {
        const { specialOccasions, ...rest } = prev;
        return rest;
      });
  };
  const setNotes = (data) => {
    notes.current = data;
    err?.notes &&
      setErr((prev) => {
        const { notes, ...rest } = prev;
        return rest;
      });
  };

  const fnEnableKAV = () => setEnableKAV(true);

  const fnDisableKAV = () => setEnableKAV(false);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      fnDisableKAV();
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);
  const showModal = () => {
    setShowOTPVerityModal(true);
  };
  const hideModal = () => {
    setShowOTPVerityModal(false);
  };
  const fnShowPopup = () => {
    setShowPopup(true);
  };
  const fnHidePopup = () => {
    setShowPopup(false);
  };
  const onChangePhone = (text) => {
    console.log(text, "phone number");
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
        contentContainerStyle={{
          backgroundColor: C.colors.primary.color1,
          flexGrow: 1,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          enabled={enableKAV}
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
        >
          <TableBookingSpecialNotes
            set={setSpecialRequests}
            error={err?.specialRequests}
            title={"Dietary Restrictions"}
            onFocus={fnDisableKAV}
          />
          <TableBookingSpecialNotes
            set={setSpecialOccasions}
            error={err?.specialOccasions}
            title={"Special Occasion"}
            onFocus={fnDisableKAV}
          />
          {/*  <TableBookingOffersComponent /> */}
          <View
            style={[
              {
                width: "95%",
                alignSelf: "center",
                alignItems: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 15,
                marginTop: 20,
                borderRadius: C.measures.BORDER_RADIUS,
                backgroundColor: C.colors.primary.color1,
                elevation: 3,
                shadowOpacity: 0.4,
                borderBottomWidth: 0.2,
                borderColor: C.colors.border.dark,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: C.colors.bg.shadow1,
              },
            ]}
          >
            <Text
              style={[
                {
                  fontSize: 15,
                  fontWeight: "bold",
                  color: C.colors.text.black,
                },
              ]}
            >
              Phone Number
            </Text>
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
                    borderColor: C.colors.border.grey,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                {phone}
              </Text>
            </Pressable>
            <Text
              style={[
                {
                  position: "absolute",
                  bottom: -7,
                  left: 30,
                  backgroundColor: C.colors.primary.color1,
                  color: "red",
                  fontSize: 12,
                },
              ]}
            >
              {err.phone}
            </Text>
          </View>
          <TableBookingNotesComponent
            onFocus={fnEnableKAV}
            set={setNotes}
            error={err?.notes}
          />
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "flex-end",
              paddingHorizontal: 10,
              minHeight: 80,
              flexGrow: 1,
              marginBottom: 10,
            }}
          >
            <Pressable
              onPress={onSubmit}
              style={{
                width: "100%",
                borderWidth: 1,
                height: 40,
                justifyContent: "center",
                borderRadius: 5,
                backgroundColor: C.colors.primary.color2,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: C.colors.primary.color1,
                  textTransform: "capitalize",
                }}
              >
                {C.strings.CONFIRM}
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {showPopup && (
        <Popup
          props={{ status: "error", message: "booking already exists" }}
          setShowPopup={fnHidePopup}
        />
      )}
    </>
  );
};

export default TableBookingConfirmPage = withHeader({
  HeaderComponent,
  BodyComponent,
});
