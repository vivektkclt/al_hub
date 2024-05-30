import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import { BookingDetailsStyles as styles } from "./BookingDetails.styles";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import getStoreById from "../../graphql/queries/getStoreById";
import { withHeader } from "../../hoc/withHeader";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

const HeaderComponent = () => {
  return <CustomHeader hideShadow isBack title={"Back"} />;
};

const BodyComponent = () => {
  const route = useRoute();
  const { props } = route.params;
  const navigation = useNavigation();
  const apiUrl = "https://api.store.al-hub.com/graphql";
  const baseurl = "https://alhub-app-images.s3.ap-south-1.amazonaws.com/";
  const imageUrl =
    "https://alhub-app-images.s3.ap-south-1.amazonaws.com/stores/1235/328362065_6173682152666278_6306326959376210812_n.jpg";
  const [openErrModal, setOpenErrModal] = useState(false);
  const {
    user,
    token: { access_token: token },
  } = useSelector((state) => state.user);

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const {
    data,
    loading: loadingStores,
    error,
  } = useQuery(getStoreById, {
    context,
    fetchPolicy: "cache-and-network",
    variables: {
      storeId: Number(props?.storeId),
    },
  });

  const date = new Date(props.date);
  const final = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "short",
  });
  const d = final.format(date);
  const today = new Date();
  const todayDay = new Intl.DateTimeFormat("en-us", {
    weekday: "long",
  });
  const weekday = todayDay.format(today).toLowerCase();

  const mutation = ` mutation {
    BookASlot( slotBookingInput: {
      clinicSlotId: ${props.clinicSlotId},
      phoneNumber: ${props.phoneNumber},
      fullName: "${props.fullName}",
      bookingFor: "${props.bookingFor}",
      bookingDate: "${props.date}",
      reasonForVisit:"${props.reasonForVisit}",
      notes: "${props.notes}",
      email: "${user.email}"
  } ) {
        id
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
  const onSubmit = async () => {
    axios
      .post(
        apiUrl,
        { query: mutation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        response.status === 200 ? end(response.data) : setOpenErrModal(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const end = (data) => {
    navigation.navigate("BookingStatus", {
      props: { storeId: props?.storeId, data: data },
    });
  };
  console.log(props);
  const convertToNormalTime = () => {
    var hour = Number({ ...props }?.time.slice(0, 2));
    const minutes = { ...props }?.time.slice(2, 5);
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
  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.aliIteCen]}
        style={[styles.pad16, styles.bacColTra]}
      >
        <View
          style={[
            styles.containter,
            styles.lefBor10oth1,
            {
              height: 137,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <View style={{ margin: 15 }}>
            <Image
              style={{
                width: 124,
                height: 90,
                borderRadius: 10,
                objectFit: "cover",
              }}
              source={{
                uri: data?.Store?.StoreImages[0]?.key
                  ? baseurl + `${data?.Store?.StoreImages[0]?.key}`
                  : imageUrl,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "space-between",

              height: 90,
            }}
          >
            <View>
              <Text style={[styles.comFonSty, styles.titleFonSty]}>
                {data?.Store?.name}
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.ImageIcon}
                  source={require("../../assets/images/calendarIcon.png")}
                />
                <Text
                  style={[
                    { paddingHorizontal: 5 },
                    styles.comFonSty,
                    styles.norTexSty,
                  ]}
                >
                  {d}
                </Text>
              </View>
              <View style={{ flexDirection: "row", color: "#B2B2B2" }}>
                <Image
                  style={styles.ImageIcon}
                  source={require("../../assets/images/clock.png")}
                />
                <Text
                  style={[
                    { paddingHorizontal: 5 },
                    styles.comFonSty,
                    styles.norTexSty,
                  ]}
                >
                  {convertToNormalTime()}{" "}
                </Text>
              </View>
            </View>
            <View>
              <Text style={[styles.comFonSty, styles.norTexSty]}>
                closing time :{" "}
                {data?.Store?.workingHours[`${weekday}`]?.closingTime ||
                  "not available"}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.containter, styles.lefBor10oth1]}>
          <View style={{ padding: 20 }}>
            <View style={{ marginTop: 4 }}>
              <Text style={[styles.comFonSty, styles.titleFonSty]}>
                reason for booking
              </Text>
            </View>
            <ScrollView
              style={{ marginTop: 8, overflow: "scroll", marginBottom: 8 }}
            >
              <Text style={[styles.comFonSty, styles.norTexSty]}>
                {props?.reasonForVisit}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View
          style={[
            styles.containter,
            styles.lefBor10oth1,
            { overflow: "hidden" },
          ]}
        >
          <View style={{ padding: 20 }}>
            <View style={{ marginTop: 4 }}>
              <Text style={[styles.comFonSty, styles.titleFonSty]}>notes</Text>
            </View>
            <ScrollView
              style={{ marginTop: 8, overflow: "scroll", marginBottom: 8 }}
            >
              <Text style={[styles.comFonSty, styles.norTexSty]}>
                {props?.notes}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View style={[styles.containter, { backgroundColor: "#F3F3F3" }]}>
          <View style={{ padding: 10 }}>
            <TextInput
              placeholder={props.phoneNumber || "Phone number"}
              placeholderTextColor={props.phoneNumber ? "black" : "#808080"}
              style={{ fontSize: 16, borderBottomWidth: 1 }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            flexGrow: 1,

            justifyContent: "flex-end",
          }}
        >
          <Pressable
            onPress={onSubmit}
            style={{
              height: 55,
              backgroundColor: "black",
              width: "100%",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>{`confirm `}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default BookingDetails = withHeader({ BodyComponent, HeaderComponent });
